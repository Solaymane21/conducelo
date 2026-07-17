import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

  /** Emits true/false whenever the authentication state changes */
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  /** Emits the decoded JWT payload (user info) whenever it changes */
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Authenticate with the backend and receive a JWT token.
   * The response is expected to contain a `token` field.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('/api/auth/login', { username, password }).pipe(
      tap((response) => {
        this.saveToken(response.token);
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(this.getCurrentUser());
      })
    );
  }

  /**
   * Register a new user account.
   */
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/auth/register', { username, email, password });
  }

  /**
   * Clear the stored token and reset authentication state.
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Persist the JWT in localStorage.
   */
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Retrieve the stored JWT, or null if none exists.
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Returns true if a token exists and has not expired.
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        return false;
      }
      // exp is in seconds, Date.now() in milliseconds
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  /**
   * Decode the JWT payload and return it as a plain object.
   * Returns null if no token is stored or the token is malformed.
   */
  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return this.decodeToken(token);
    } catch {
      return null;
    }
  }

  /**
   * Decode the Base64Url-encoded payload section of a JWT.
   */
  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT structure');
    }

    const payload = parts[1];
    // Base64Url -> Base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
