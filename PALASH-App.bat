@echo off
title PALASH VANI - Offline Multilingual EdTech App
color 0A
cls

echo ==============================================================================
echo       PALASH VANI - Autonomous Offline Multilingual EdTech Application
echo ==============================================================================
echo   Problem Statement: Tribal Language Education Bridge (NEP 2020 / NIPUN Bharat)
echo   Architecture: 100%% Offline Edge Intelligence (Zero Internet / 0 KB/s)
echo   Target Scripts: Ol Chiki (Santhali), Warang Chiti / Devanagari (Ho, Mundari)
echo   Engine: Web Audio DSP + Local n-gram / Morphological NLP + Speech Synthesizer
echo ==============================================================================
echo.

:: 1. Check Node.js installation
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not found in your system PATH!
    echo Please install Node.js (v18 or higher) from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: 2. Check if production build exists, build if missing
if not exist "dist\index.html" (
    echo [*] Production build missing. Building production assets...
    call npm.cmd run build
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] Build failed. Please inspect errors above.
        pause
        exit /b 1
    )
)

:: 3. Launch Standalone Node.js Application Mode
echo [*] Starting Local Node Server and Launching Desktop App Window...
echo [*] App Window: Native Desktop Mode (Borderless, Zero URL Bar, Zero Localhost Text)
echo.
node server.js --open-app

pause
