@echo off
title Create PALASH Vani Desktop Shortcut
color 0A
cls
cd /d "%~dp0"
echo [*] Creating Desktop Shortcut for PALASH Vani...
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\create-desktop-shortcut.ps1"
echo.
echo [*] Done! You can now launch PALASH Vani directly from your Desktop.
timeout /t 3 >nul
