@echo off
title PALASH Vani v2.0 - MTB-MLE Primary Education Suite
color 0A

echo ============================================================
echo      PALASH Vani (पलाश वाणी) - v2.0 Updated Launcher
echo      AI-Assisted MTB-MLE Primary Education Suite
echo ============================================================
echo.

if exist "C:\Users\karna\.bin\node" (
    set "PATH=C:\Users\karna\.bin\node;%PATH%"
)
cd /d "%~dp0"

echo [1/3] Refreshing production bundle with voice engine...
call npm run build

echo [2/3] Opening application in your default browser...
start "" "http://localhost:3000"

echo [3/3] Serving PALASH Vani v2.0 on http://localhost:3000 ...
echo.
echo ============================================================
echo   Application is LIVE at: http://localhost:3000
echo   Network IP for Tablets: http://10.69.168.27:3000
echo   Press Ctrl+C to stop the server anytime.
echo ============================================================
echo.

npx vite --port 3000 --host
pause
