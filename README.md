# Conducelo

Plataforma P2P de alquiler de coches (estilo Turo/Getaround/Wallapop) desarrollada con Angular, Spring Boot, PostgreSQL y Docker.

## Características principales del proyecto
- Registro e inicio de sesión de usuarios con autenticación JWT y roles.
- Publicación de vehículos para alquilar con galería de fotos.
- Buscador interactivo de coches con filtros de disponibilidad y ubicación.
- Sistema de reservas con calendario.
- Chat y notificaciones en tiempo real (WebSockets).
- Pasarela de pago simulada (Stripe).
- Documentación completa de API (Swagger) y Cobertura de Testing.

## Requisitos previos
- Docker y Docker Compose instalados.

## Levantar el entorno de desarrollo
En la raíz del proyecto, ejecuta:
```bash
docker compose up --build -d
```

- **Frontend (Angular + PrimeNG + Tailwind):** http://localhost:4200
- **Backend (Spring Boot + Java 21):** http://localhost:8080
- **Adminer (Database GUI):** http://localhost:8082

Para más detalles sobre la planificación y arquitectura, consulta el archivo [PROJECT.md](./PROJECT.md).
