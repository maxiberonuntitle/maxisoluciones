@echo off
echo ========================================
echo    Maxi Soluciones Digitales
echo    Construyendo aplicacion para produccion...
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

REM Verificar si node_modules existe, si no, instalar dependencias
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: No se pudieron instalar las dependencias
        pause
        exit /b 1
    )
    echo Dependencias instaladas correctamente
    echo.
)

REM Construir la aplicacion
echo Construyendo aplicacion...
npm run build

if %errorlevel% neq 0 (
    echo ERROR: La construccion fallo
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Construccion completada exitosamente
echo    Los archivos estan en la carpeta 'dist'
echo ========================================
echo.

REM Preguntar si quiere abrir la carpeta dist
set /p choice="¿Quieres abrir la carpeta dist? (s/n): "
if /i "%choice%"=="s" (
    explorer dist
)

pause
