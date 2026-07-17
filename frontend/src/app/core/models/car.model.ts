/**
 * interfaces representing car requests and responses.
 */

export interface CarRequest {
  brand: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  location: string;
  description?: string;
}

export interface CarResponse {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  location: string;
  description?: string;
  isActive: boolean;
  ownerUsername: string;
  ownerEmail: string;
}
