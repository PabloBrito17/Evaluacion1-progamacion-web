# API REST - Sistema de Gestión de Incidencias Técnicas

## Evaluación I - Programación Web
**Universidad Centroamericana (UCA)**  
**Ciclo 02-2026**

---

## 📋 Equipo de Desarrollo

| Nombre | Carné |
|--------|-------|
| Amy Ariadna Barrza Villacorta | 00012725 |
| Pablo Antonio Brito Elías | 00179025 |
| Diego Gabriel Bonilla Comandari | 00147325 |
| Aarón Enmanuel Fuentes Murillo | 00075925 |

---

## 📌 ¿En Qué Consiste Esta Evaluación?

El proyecto consiste en desarrollar una **API REST** con **Express.js** y **Node.js** que simula un sistema de gestión de incidencias técnicas para la empresa **TechSupport S.A.**

Se implementan **8 puntos funcionales:**
- Estructura inicial del proyecto
- Registrar, listar, buscar y modificar incidencias
- Eliminar incidencias
- Generar estadísticas
- Clasificar automáticamente por prioridad

Todo sin base de datos (datos en memoria) para mantenerlo simple y enfocado en la lógica de programación.

---

## 📂 Estructura del Proyecto

```
proyecto/
├── app.js
├── package.json
├── routes/
│   └── incidencias.js
├── controllers/
│   └── incidenciasController.js
└── utils/
    └── helpers.js
```

---

## 🚀 Endpoints Implementados (8 Puntos)

### PUNTO 1: Estructura Inicial ✅
- Configuración de Express
- Estructura MVC
- Puerto: 3000

### PUNTO 2: Registrar Incidencia ✅
```
POST /incidencias
Body: {empleado, area, descripcion, prioridad}
Response: 201 Created
```

### PUNTO 3: Listar Incidencias ✅
```
GET /incidencias
Response: 200 OK + Array completo
```

### PUNTO 4: Buscar por ID ✅
```
GET /incidencias/:id
Response: 200 OK + Objeto | 404 Not Found
```

### PUNTO 5: Cambiar Estado ✅
```
PUT /incidencias/:id/estado
Body: {estado}
Response: 200 OK | 404 Not Found
```

### PUNTO 6: Eliminar Incidencia ✅
```
DELETE /incidencias/:id
Response: 200 OK | 404 Not Found
```

### PUNTO 7: Estadísticas ✅
```
GET /estadisticas
Response: 200 OK + {totalIncidencias, pendientes, enProceso, resueltas, canceladas}
```

### PUNTO 8: Clasificación Automática ✅
```
GET /incidencias/:id/clasificacion
Response: 200 OK + {id, clasificacion}
```

---

## 💾 Modelo de Datos

```javascript
{
  "id": 1,
  "empleado": "Juan Perez",
  "area": "Contabilidad",
  "descripcion": "No puedo imprimir documentos",
  "prioridad": "Alta",
  "estado": "Pendiente"
}
```

**Estados válidos:** Pendiente, En Proceso, Resuelta, Cancelada  
**Prioridades válidas:** Alta, Media, Baja

---

## 🔧 Instalación y Ejecución

### Instalación de dependencias
```bash
npm install
```

### Iniciar el servidor
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 🧪 Pruebas en Postman

Se recomienda probar todos los endpoints en orden:

1. POST /incidencias (Registrar 2-3 incidencias)
2. GET /incidencias (Ver todas)
3. GET /incidencias/1 (Buscar una específica)
4. PUT /incidencias/1/estado (Cambiar estado)
5. GET /estadisticas (Ver conteos)
6. GET /incidencias/1/clasificacion (Ver clasificación)
7. DELETE /incidencias/2 (Eliminar)

---

## 📋 Requisitos Previos

- Node.js v14 o superior
- npm (Node Package Manager)
- Postman (para pruebas de endpoints)

---

## 🔍 Validaciones Implementadas

- Campos obligatorios en registro
- Validación de espacios vacíos
- Prioridades válidas: Alta, Media, Baja
- Estados válidos: Pendiente, En Proceso, Resuelta, Cancelada
- Manejo de ID no encontrado (404)

---
