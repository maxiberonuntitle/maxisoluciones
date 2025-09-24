@echo off
echo ========================================
echo    Maxi Soluciones Digitales
echo    Limpiando e instalando dependencias...
echo ========================================
echo.

REM Verificar si Node.js esta instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si npm esta disponible
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm no esta disponible
    pause
    exit /b 1
)

REM Eliminar node_modules y package-lock.json si existen
if exist "node_modules" (
    echo Eliminando node_modules...
    rmdir /s /q node_modules
)

if exist "package-lock.json" (
    echo Eliminando package-lock.json...
    del package-lock.json
)

REM Limpiar cache de npm
echo Limpiando cache de npm...
npm cache clean --force

REM Instalar dependencias
echo Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Instalacion completada exitosamente
echo ========================================
echo.

pause
