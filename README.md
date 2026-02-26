# ODM Envíos - Calculadora de Tarifas

## 📦 Descripción
Aplicación web para calcular costos de envío desde CDMX a diferentes destinos, utilizando tarifas preferenciales para empresas.

## 🚀 Tecnologías
- **Frontend:** Angular 17
- **Backend:** Node.js + Express
- **Base de datos:** MySQL

## 📋 Requisitos previos
- Node.js 18+
- MySQL 8+
- Angular CLI

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/odm-envios-calculadora.git
cd odm-envios-calculadora
```

###  2. Configurar la base de datos
Acceder a MySQL
- mysql -u root -p
Ejecutar el script para crear la base de datos
- source database/schema.sql
Salir de MySQL
- exit

### 3. Configurar el backend
Entrar a la carpeta del backend
- cd backend
Instalar dependencias
- npm install
Crear archivo de configuración
- cp .env.example .env
Editar el archivo .env con tus datos:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_de_mysql
DB_NAME=odm_envios
PORT=3000
Iniciar el servidor
- npm run dev

### 4. El backend estará disponible en: http://localhost:3000

### 5. Configurar el frontend
Abrir NUEVA terminal (mantén el backend corriendo)
- cd ODM-ENVIOS
Instalar dependencias
- npm install
Iniciar la aplicación
- ng serve

### 6. El frontend estará disponible en: http://localhost:4200