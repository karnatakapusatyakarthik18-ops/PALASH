@echo off
title PALASH VANI - Local Backend API Server (XAMPP MySQL)
color 0B
cls

:: Ensure current working directory is the project directory
cd /d "%~dp0"

echo ==============================================================================
echo       PALASH VANI - Local Backend API Server (Port 5000)
echo ==============================================================================
echo   Local API:     http://127.0.0.1:5000
echo   Health Check:  http://127.0.0.1:5000/api/health
echo   Database:      XAMPP MySQL / MariaDB (Database: palash)
echo ==============================================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js was not found in your system PATH!
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [*] Starting Node.js Express API Server...
echo [*] Keep this window open in the background during presentation.
echo.
node server/server.js
pause
