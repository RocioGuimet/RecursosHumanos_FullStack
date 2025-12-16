# 🏢 Sistema de Gestión de Empleados - Backend

API REST para la gestión centralizada de empleados. Permite a los departamentos de RRHH crear, visualizar, actualizar y eliminar la información de los empleados de manera sencilla y segura.

Construida con **Spring Boot** y **MySQL**. Lista para consumir desde Postman, un frontend o cualquier cliente HTTP.

## 🚀 Tecnologías utilizadas

- **Framework**: Spring Boot
- **Base de datos**: MySQL (se crea automáticamente si no existe)
- **Validación**: Hibernate Validator con mensajes claros
- **Arquitectura**: API RESTful, separación en capas (Controller-Service-Repository)
- **Manejo de errores**: Centralizado con `@ControllerAdvice`, respuestas JSON estandarizadas

## 🛠️ Características

* **API RESTful completa**: Implementación de principios REST con endpoints claros
* **Validación robusta**: Anotaciones en la entidad para asegurar integridad de datos
* **Persistencia eficiente**: Spring Data JPA para operaciones CRUD optimizadas
* **Manejo de excepciones**: Errores HTTP estandarizados con mensajes JSON
* **Configuración automática**: La base de datos se crea automáticamente si no existe

## 📦 Instalación y Ejecución Local

### **Prerrequisitos**
- [Java 17 o superior](https://adoptium.net/)
- [MySQL](https://dev.mysql.com/downloads/) instalado y ejecutándose.

### **1. Clonar y ejecutar el Repositorio**
```bash
git clone https://github.com/RocioGuimet/RecursosHumanos_Backend.git
cd RecursosHumanos_Backend
./mvnw spring-boot:run
```
Si la base de datos recursos_humanos_db no existe en tu MySQL, se creará automáticamente gracias a la configuración createDatabaseIfNotExist=true.

### **2. Ejecutar**

La aplicación inicia en http://localhost:8080. Usa estos endpoints:
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/rh-app/empleados` | Lista todos los empleados |
| GET | `/rh-app/empleados/{id}` | Obtiene un empleado por ID |
| POST | `/rh-app/empleados` | Crea un nuevo empleado |
| PUT | `/rh-app/empleados/{id}` | Actualiza un empleado existente |
| DELETE | `/rh-app/empleados/{id}` | Elimina un empleado |

### **3. Configuración (opcional)**

Si necesitas cambiar credenciales de MySQL, edita:

```bash
# src/main/resources/application.properties
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

### **4. Consumo rápido con Postman**

Método: POST, URL: http://localhost:8080/rh-app/empleados

Body (raw):

```bash
{
  "nombre": "Anakin Skywalker",
  "departamento": "Limpieza", 
  "sueldo": 10000
}
```

## 📡 Frontend asociado

Esta API está diseñada para funcionar con el Frontend React disponible en:
```
https://github.com/RocioGuimet/RecursosHumanos_Frontend
```

## 📁 Estructura del Proyecto
```
RecursosHumanos_Backend/
├── src/main/java/archivo.rh/
│   ├── RhApplication.java                    # Clase principal de Spring Boot
│   ├── controller/
│   │   └── EmpleadoController.java           # Controladores REST (@RestController)
│   ├── service/
│   │   └── EmpleadoService.java              # Lógica de negocio
│   ├── repository/
│   │   └── EmpleadoRepository.java           # Acceso a datos (JPA Repository)
│   ├── model/
│   │   └── Empleado.java                     # Entidad JPA con validaciones (@Entity)
│   └── excepcion/
│       ├── GlobalExceptionHandler.java       # Control global de errores (@ControllerAdvice)
│       └── RecursoNoEncontradoExcepcion.java # Excepción personalizada
├── src/main/resources/
│   ├── application.properties                # Configuración
│   └── application.properties.example        # Plantilla de configuración de ejemplo
├── pom.xml                                   # Dependencias Maven
├── mvnw, mvnw.cmd                            # Wrapper de Maven
└── README.md                                 # Readme
```

