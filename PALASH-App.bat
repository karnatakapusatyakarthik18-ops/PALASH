@echo off
title PALASH VANI - Offline Standalone Desktop Application
color 0A
cls

echo ==============================================================================
echo       PALASH VANI - Autonomous Offline Multilingual EdTech Application
echo ==============================================================================
echo   Problem Statement: Tribal Language Education Bridge (NEP 2020 / NIPUN Bharat)
echo   Architecture: 100%% Offline Edge Intelligence (Zero Internet / 0 KB/s)
echo   Target Scripts: Ol Chiki (Santhali), Warang Chiti / Devanagari (Ho, Mundari)
echo   Runtime: Native Desktop Application Window (Zero localhost / Zero URL bar)
echo ==============================================================================
echo.

:: 1. If standalone packaged executable exists, launch directly (No Node.js needed!)
if exist "%~dp0release\win-unpacked\PALASH Vani.exe" (
    echo [*] Launching standalone native desktop executable...
    start "" "%~dp0release\win-unpacked\PALASH Vani.exe"
    exit /b 0
)

:: 2. Check Node.js installation
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Neither the packaged executable nor Node.js was found in PATH!
    echo Please install Node.js (v18 or higher) from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: 3. Check if production build exists, build if missing
if not exist "%~dp0dist\index.html" (
    echo [*] Production build missing. Building production assets...
    call npm.cmd run build
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] Build failed. Please inspect errors above.
        pause
        exit /b 1
    )
)

:: 4. Launch Desktop App directly via Electron
echo [*] Launching Native Standalone Desktop Window...
echo [*] Mode: File Protocol (file:///dist/index.html) - Zero Localhost / 100%% Offline
echo.
call npx.cmd electron .

pause
