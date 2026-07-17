# 🚗 CONDUCELO — Contexto del Proyecto

> **Documento vivo de referencia.** Actualizar en cada fase completada.
> Última actualización: 2026-07-17

---

## 🎯 Visión del Proyecto

**Conducelo** es una plataforma de alquiler de coches P2P (peer-to-peer) al estilo Turo/Getaround/Wallapop.
Los **usuarios** son los protagonistas: publican sus coches para alquilar y reservan los coches de otros usuarios.

- **No es un concesionario.** No hay un inventario central.
- **No es un panel de admin.** El admin existe solo para supervisar y moderar, no para gestionar coches.
- Los usuarios tienen un **perfil público** con sus coches publicados, valoraciones recibidas y estadísticas.

### ¿Qué problema resuelve?
Permite a cualquier persona alquilar su coche cuando no lo usa y a otros encontrar coches disponibles cerca de ellos, de forma segura, con calendario, pagos y valoraciones.

---

## 👤 Autor

- **Nombre:** Solaymane
- **Objetivo:** Portfolio profesional para buscar trabajo en Suiza.
- **Stack anterior:** Java puro, Laravel (PHP). Primera vez con Spring Boot.
- **Enfoque:** Aprender bien cada parte, sin prisas. Código limpio y profesional.

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| **Frontend** | Angular + PrimeNG + Tailwind CSS | SPA con PrimeNG UI y Tailwind para estilos, routing, guards, interceptors |
| **Backend** | Spring Boot 3 + Java 17+ | API REST, arquitectura en capas |
| **Base de Datos** | PostgreSQL 16 | Relacional, desplegada en Docker |
| **ORM** | Spring Data JPA (Hibernate) | Entities, Repositories, Specifications |
| **Seguridad** | Spring Security + JWT | Registro, login, roles, filtro JWT |
| **Tiempo Real** | WebSocket (STOMP) | Notificaciones y chat |
| **Pagos** | Stripe (simulado) | Checkout session, webhooks |
| **Almacenamiento** | Subida de imágenes (local/S3) | Múltiples fotos por coche |
| **Documentación API** | Swagger / OpenAPI 3 | Auto-generada desde anotaciones |
| **Testing** | JUnit 5 + Mockito | Unitarios y de integración |
| **CI/CD** | GitHub Actions | Build, test, Docker push |
| **Contenedores** | Docker + Docker Compose | Todos los servicios orquestados |

---

## 👥 Roles de Usuario

| Rol | Descripción | Permisos clave |
|-----|-------------|----------------|
| `USER` | Usuario registrado (protagonista) | Publicar coches, reservar coches de otros, dejar reviews, chat |
| `ADMIN` | Administrador/moderador | Moderar anuncios, banear usuarios, ver estadísticas globales |

> **Nota:** No hay rol "Propietario" vs "Cliente" separado. Todo `USER` puede publicar y reservar. Es el modelo Wallapop.

---

## ✅ Funcionalidades Objetivo

### MVP (Fase 1-4)
- [x] Proyecto base con Docker Compose (Angular + Spring Boot + PostgreSQL)
- [x] Autenticación y autorización (JWT + Spring Security)
- [x] Registro e inicio de sesión
- [x] CRUD de coches con validaciones
- [ ] Perfil de usuario público
- [ ] Búsqueda con filtros (marca, precio, fechas, ubicación)
- [ ] Sistema de reservas con calendario de disponibilidad
- [ ] Subida de múltiples fotos por coche

### Avanzado (Fase 5-7)
- [ ] Sistema de valoraciones / reviews después del alquiler
- [ ] Pasarela de pago simulada con Stripe
- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] Chat entre propietario y cliente

### Profesional (Fase 8-10)
- [ ] Documentación Swagger / OpenAPI
- [ ] Tests unitarios y de integración
- [ ] CI/CD con GitHub Actions
- [ ] Deploy en cloud (Railway / Render / AWS)

---

## 📅 Roadmap por Fases

> Ritmo: sin prisas, aprendiendo cada parte bien.
> Cada fase incluye backend + frontend + lo que se aprende.

---

### 🔷 FASE 1 — Cimientos y Seguridad
**Objetivo:** Tener registro, login y protección de rutas funcionando end-to-end.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Reestructurar paquetes del backend | Backend | Crear estructura: `model`, `repository`, `service`, `controller`, `dto`, `security`, `exception`, `config` |
| Entidad `User` y `Role` | Backend | User con email, password (BCrypt), nombre, foto, fecha registro. Relación ManyToMany con Role |
| Registro (`/api/auth/register`) | Backend | Endpoint que crea usuario, encripta contraseña, asigna rol USER |
| Login (`/api/auth/login`) | Backend | Valida credenciales, genera JWT con roles |
| Filtro JWT | Backend | Intercepta peticiones, valida token, carga SecurityContext |
| Configuración Spring Security | Backend | SecurityFilterChain: rutas públicas vs protegidas |
| Páginas de Login/Registro | Frontend | Formularios reactivos con validación |
| Interceptor HTTP para JWT | Frontend | Añade token a cada petición automáticamente |
| Guard de rutas | Frontend | Proteger rutas que requieren autenticación |

**🎓 Lo que aprenderás:** Spring Security, JWT, BCrypt, SecurityFilterChain, interceptores Angular.

---

### 🔷 FASE 2 — Modelo de Datos y CRUD de Coches
**Objetivo:** Un usuario puede publicar, editar y eliminar sus coches.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Rediseñar entidad `Car` | Backend | Añadir relación `@ManyToOne` con User (propietario), ubicación, descripción, precio/día, estado (disponible/reservado/inactivo) |
| DTOs de Car | Backend | `CarRequestDTO`, `CarResponseDTO` — nunca exponer la entidad directa |
| Service de Car | Backend | Capa de servicio con lógica: solo el propietario puede editar/eliminar su coche |
| CRUD endpoints protegidos | Backend | POST/PUT/DELETE requieren autenticación. GET es público |
| Manejo global de excepciones | Backend | `@ControllerAdvice` con respuestas JSON limpias para 404, 403, 400, etc. |
| Listado público de coches | Frontend | Grid/cards con los coches disponibles |
| Formulario de publicación | Frontend | Crear/editar coche desde el panel del usuario |
| Página de detalle del coche | Frontend | Vista completa con fotos, descripción, precio, propietario |

**🎓 Lo que aprenderás:** DTOs, capa Service, @ControllerAdvice, relaciones JPA, validaciones con `@Valid`.

---

### 🔷 FASE 3 — Subida de Imágenes y Perfil de Usuario
**Objetivo:** Los coches tienen fotos reales y cada usuario tiene un perfil público.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Subida de múltiples imágenes | Backend | Endpoint `multipart/form-data`, almacenamiento local (o S3 futuro) |
| Entidad `CarImage` | Backend | Tabla separada con relación `@OneToMany` al coche |
| Servir imágenes estáticas | Backend | Configurar Spring para servir archivos desde carpeta de uploads |
| Perfil público del usuario | Backend | Endpoint `/api/users/{id}/profile` con coches publicados y stats |
| Editar perfil propio | Backend | Cambiar nombre, foto de perfil, descripción |
| Componente de upload de fotos | Frontend | Drag & drop o selector múltiple con preview |
| Página de perfil público | Frontend | Mostrar info del usuario, sus coches, fecha de registro |

**🎓 Lo que aprenderás:** MultipartFile, almacenamiento de archivos, servir recursos estáticos, relaciones OneToMany.

---

### 🔷 FASE 4 — Búsqueda, Filtros y Reservas
**Objetivo:** Los usuarios pueden buscar coches y hacer reservas con calendario.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Búsqueda con filtros | Backend | JPA Specifications o Querydsl: marca, precio min/max, ubicación, fechas disponibles |
| Paginación server-side | Backend | `Pageable` con Spring Data, respuestas paginadas |
| Entidad `Reservation` | Backend | Relación con Car y User (inquilino), fecha inicio/fin, estado (pendiente/confirmada/cancelada/completada), precio total |
| Lógica de disponibilidad | Backend | Verificar que no haya solapamiento de fechas al reservar |
| Endpoints de reservas | Backend | Crear, cancelar, confirmar (propietario), listar mis reservas |
| Barra de búsqueda + filtros | Frontend | Componente con filtros dinámicos |
| Calendario de disponibilidad | Frontend | Mostrar fechas ocupadas/libres en el detalle del coche |
| Flujo de reserva | Frontend | Seleccionar fechas → ver precio total → confirmar |
| Mis reservas | Frontend | Panel con reservas hechas y recibidas |

**🎓 Lo que aprenderás:** Specifications, Pageable, lógica de negocio compleja con fechas, estados de una reserva.

---

### 🔷 FASE 5 — Valoraciones y Reviews
**Objetivo:** Después de completar un alquiler, ambas partes pueden valorar la experiencia.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Entidad `Review` | Backend | Puntuación (1-5), comentario, relación con Reservation, autor y destinatario |
| Lógica de reviews | Backend | Solo se puede valorar después de completar una reserva, una review por reserva |
| Media de valoraciones | Backend | Calcular y mostrar rating medio del usuario y del coche |
| Componente de estrellas | Frontend | Rating visual con estrellas clicables |
| Sección de reviews | Frontend | En el perfil del usuario y en el detalle del coche |

**🎓 Lo que aprenderás:** Validaciones de negocio complejas, agregaciones con JPA, componentes reutilizables Angular.

---

### 🔷 FASE 6 — Pagos con Stripe (Simulado)
**Objetivo:** Simular un flujo de pago real con Stripe Checkout.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Integración Stripe | Backend | Crear Checkout Session al confirmar reserva |
| Webhooks de Stripe | Backend | Escuchar eventos de pago completado/fallido |
| Entidad `Payment` | Backend | Registro del pago asociado a la reserva |
| Flujo de pago | Frontend | Redirigir a Stripe Checkout, manejar éxito/error |

**🎓 Lo que aprenderás:** Integración con APIs externas, webhooks, manejo de estados asíncronos.

---

### 🔷 FASE 7 — Tiempo Real (WebSocket + Chat)
**Objetivo:** Notificaciones push y chat entre propietario y cliente.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Configurar WebSocket (STOMP) | Backend | Broker de mensajes con Spring WebSocket |
| Notificaciones en tiempo real | Backend | Nueva reserva, reserva confirmada/cancelada, nuevo mensaje |
| Entidad `ChatMessage` | Backend | Mensajes entre dos usuarios vinculados a una reserva |
| Panel de notificaciones | Frontend | Icono con badge, dropdown de notificaciones |
| Chat en tiempo real | Frontend | Interfaz de chat tipo WhatsApp vinculada a la reserva |

**🎓 Lo que aprenderás:** WebSocket, STOMP, SockJS, comunicación bidireccional en tiempo real.

---

### 🔷 FASE 8 — Documentación API (Swagger)
**Objetivo:** API auto-documentada y navegable.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Añadir SpringDoc OpenAPI | Backend | Dependencia + configuración |
| Anotar endpoints | Backend | `@Operation`, `@ApiResponse`, `@Schema` |
| Documentar DTOs | Backend | Descripciones y ejemplos en cada campo |
| Swagger UI accesible | Backend | Disponible en `/swagger-ui.html` |

**🎓 Lo que aprenderás:** OpenAPI 3, documentación profesional de APIs.

---

### 🔷 FASE 9 — Testing
**Objetivo:** Cobertura de tests para las partes críticas.

| Tarea | Capa | Detalle |
|-------|------|---------|
| Tests unitarios de servicios | Backend | JUnit 5 + Mockito |
| Tests de integración de API | Backend | `@SpringBootTest` + MockMvc |
| Tests del repositorio | Backend | `@DataJpaTest` con H2 en memoria |
| Tests de componentes | Frontend | Jasmine + Karma |

**🎓 Lo que aprenderás:** Testing profesional en Java, mocking, tests de integración.

---

### 🔷 FASE 10 — CI/CD y Deploy
**Objetivo:** Pipeline automático y aplicación desplegada en la nube.

| Tarea | Capa | Detalle |
|-------|------|---------|
| GitHub Actions | DevOps | Build + test en cada push/PR |
| Docker multi-stage optimizado | DevOps | Imágenes ligeras de producción |
| Deploy en cloud | DevOps | Railway, Render, o AWS (EC2 + RDS) |
| Dominio personalizado | DevOps | HTTPS con certificado |

**🎓 Lo que aprenderás:** CI/CD, Docker en producción, despliegue cloud.

---

## 📁 Estructura de Carpetas Backend (Objetivo)

```
src/main/java/com/example/demo/
├── DemoApplication.java
├── config/              # Configuraciones (CORS, WebSocket, Swagger)
├── security/            # JWT, filtros, SecurityConfig
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── SecurityConfig.java
├── model/               # Entidades JPA (@Entity)
│   ├── User.java
│   ├── Role.java
│   ├── Car.java
│   ├── CarImage.java
│   ├── Reservation.java
│   ├── Review.java
│   ├── Payment.java
│   └── ChatMessage.java
├── repository/          # Interfaces JPA Repository
├── service/             # Lógica de negocio (@Service)
│   ├── AuthService.java
│   ├── UserService.java
│   ├── CarService.java
│   ├── ReservationService.java
│   ├── ReviewService.java
│   └── PaymentService.java
├── controller/          # Endpoints REST (@RestController)
│   ├── AuthController.java
│   ├── UserController.java
│   ├── CarController.java
│   ├── ReservationController.java
│   └── ReviewController.java
├── dto/                 # Data Transfer Objects
│   ├── request/
│   └── response/
├── exception/           # Manejo global de errores
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
└── util/                # Utilidades
```

---

## 📌 Decisiones Técnicas

| Decisión | Elección | Razón |
|----------|---------|-------|
| Entidades vs DTOs | Siempre DTOs en los endpoints | Evitar exponer la DB, controlar lo que se envía/recibe |
| Password hashing | BCrypt (via Spring Security) | Estándar de la industria |
| Autenticación | JWT stateless | Escalable, sin sesiones en servidor |
| Validación | `@Valid` + Bean Validation | Validación declarativa estándar |
| Excepciones | `@ControllerAdvice` global | Respuestas de error consistentes en JSON |
| Base de datos | PostgreSQL | Relacional, robusta, la más usada en empresas europeas |
| Idioma del código | Inglés (English) | Todo el desarrollo (código, BD, comentarios, variables) debe estar en inglés para el mercado suizo |
| Internacionalización (i18n) | @ngx-translate (Angular) | Soporte multi-idioma para Inglés (en), Español (es), Alemán (de) y Francés (fr) |

---

## 🔄 Estado Actual

- **Fase completada:** FASE 1 — Cimientos y Seguridad, FASE 2 — Modelo de Datos y CRUD de Coches.
- **Siguiente paso:** FASE 3 — Subida de Imágenes y Perfil de Usuario.
- **Código actual:** Autenticación JWT y operaciones CRUD completas sobre vehículos siguiendo la arquitectura de capas con JPA/PostgreSQL.

---

> 💡 **Nota para las sesiones de trabajo:** Cada vez que empecemos una nueva sesión, referir a este documento para retomar el contexto. Actualizarlo al completar cada fase.
