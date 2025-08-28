# Backend API - ATOM Challenge
API Rest para la gestión de tareas y autenticación de usuarios, desarrollada con Node.js, TypeScript y Firebase.

## 🏗️ Estructura de Carpetas

```
src/
 ├── config/                     # Configuraciones Generales
 ├── domain/                   # Capa de Dominio (Entidades y Repositorios)
 ├── application/           # Capa de Aplicación (Casos de Uso)
 ├── infrastructure/     # Capa de Infraestructura
  │            ├── database/           # Repositorios de base de datos
  │            ├── security/              # Middlewares de seguridad
└── container/             # Configura la inyección de dependencias.
└── interfaces/            # Capa de Interfaces (Controladores y Routers)
  │             └── http/                     # Controladores y routers HTTP
  │             └── app/                      # Rutas de API
  │             └── server/                 # Configuración del servidor
└── shared/                     # Interfaces y tipos para las respuestas de la API
└── index                           # Archivo inicial
```

## 🚀 Endpoints Disponibles

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse

### Usuarios
- `POST /user` - Crear usuario
- `POST /user/validate` - Validar si usuario existe

### Tareas
- `POST /task` - Crear tarea
- `GET /task/:idUser` - Obtener tareas del usuario
- `PUT /task` - Actualizar tarea
- `DELETE /task/:id` - Eliminar tarea

## 🛠️ Tecnologías

- **Node.js + TypeScript**
- **Express**
- **Firebase**
- **tsyringe** - (Inyección de dependencias)
- **JWT** - Autenticación
- **Jest** - Framework de testing

## 📋 Prerrequisitos

- **Node.js** 22.x o superior
- **npm** 9.x o superior
- **Firebase CLI** instalado globalmente
- **Cuenta de Firebase** con proyecto configurado

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd atom-challenge-backend/functions
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tus credenciales
nano .env
```

### 4. Configurar Firebase

#### Obtener credenciales de Firebase:

1. **Ir a [Firebase Console](https://console.firebase.google.com/)**
2. **Seleccionar tu proyecto**
3. **Ir a Configuración del proyecto** (⚙️ icono de engranaje)
4. **Ir a la pestaña "Cuentas de servicio"**
5. **Hacer clic en "Generar nueva clave privada"**
6. **Descargar el archivo JSON**

#### Configurar variables en .env:
```bash
# Del archivo JSON descargado, copiar:
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=tu-email@tu-proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu-clave-privada-aqui\n-----END PRIVATE KEY-----"

# Generar una clave JWT segura
JWT_SECRET=tu-clave-jwt-super-secreta-aqui
```

### 5. Configurar Firebase CLI
```bash
# Iniciar sesión en Firebase
firebase login

# Inicializar el proyecto (si no está inicializado)
firebase init functions

# Seleccionar tu proyecto existente
```

## 🚀 Comandos de Desarrollo

### Desarrollo local
```bash
# Ejecutar en modo desarrollo con hot reload
npm run dev

# Construir el proyecto
npm run build

# Ejecutar en modo producción
npm start
```

### Firebase Functions
```bash
# Ejecutar emulador local
npm run serve

# Desplegar a Firebase
npm run deploy

# Ver logs de Firebase
npm run logs
```

## 🧪 Testing

### Ejecutar todos los tests
```bash
npm test
```

### Tests específicos
```bash
# Solo tests unitarios
npm run test:unit

# Solo tests de integración
npm run test:integration

# Tests en modo watch
npm run test:watch
```

### Cobertura de código
```bash
# Generar reporte de cobertura
npm run test:coverage

# Ver reporte en el navegador
open coverage/lcov-report/index.html
```

## 🔒 Seguridad

- Middleware de autenticación JWT
- Validación de entrada con express-validator
- CORS configurado
- Manejo de errores centralizado
- Variables de entorno para credenciales

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
