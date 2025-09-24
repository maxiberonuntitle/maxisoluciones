@echo off
title Maxi Soluciones Digitales - Servidor Simple

echo ========================================
echo    Maxi Soluciones Digitales
echo    Iniciando servidor (modo simple)...
echo ========================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

REM Verificar package.json
if not exist "package.json" (
    echo ERROR: No se encontro package.json
    echo Asegurate de estar en el directorio correcto
    pause
    exit /b 1
)

REM Instalar dependencias si es necesario
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
)

REM Iniciar servidor
echo Iniciando servidor de desarrollo...
echo.
echo La aplicacion estara en: http://localhost:5173
echo.
echo IMPORTANTE: Manten esta ventana abierta
echo Para detener el servidor presiona Ctrl+C
echo.

npm run dev

echo.
echo Servidor detenido.
pause
