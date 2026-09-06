@echo off
setlocal enabledelayedexpansion
title PALASH Vani v2.0 - MTB-MLE Primary Education Suite
color 0A

:: Ensure local directory
cd /d "%~dp0"

:: Check custom node binary paths if needed
if exist "C:\Users\karna\.bin\node" (
    set "PATH=C:\Users\karna\.bin\node;%PATH%"
)
if exist "C:\Program Files\nodejs" (
    set "PATH=C:\Program Files\nodejs;%PATH%"
)

:: Dynamically detect IPv4 address for tablets / local network
set "MY_IP=localhost"
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    if "!MY_IP!"=="localhost" (
        set "RAW_IP=%%a"
        set "MY_IP=!RAW_IP: =!"
    )
)

:: Command line arguments routing
if /i "%~1"=="test" goto run_tests
if /i "%~1"=="build" goto run_build
if /i "%~1"=="shortcut" goto make_shortcut
if /i "%~1"=="netlify" goto deploy_netlify
if /i "%~1"=="run" goto start_server

:menu
cls
echo ======================================================================
echo       PALASH Vani (पलाश वाणी) - v2.0 Smart Launcher
echo       AI-Assisted MTB-MLE Primary Education Suite
echo ======================================================================
echo.
echo   [1] 🚀 त्वरित प्रारंभ (Launch Live App on Port 3000)
echo   [2] 🧪 सत्यापन परीक्षण (Run NLP & Voice Verification Tests)
echo   [3] 📦 प्रोडक्शन बिल्ड बनाएं (Build Production Bundle & Zip)
echo   [4] 🖥️  डेस्कटॉप शॉर्टकट बनाएं (Create Desktop Shortcut)
echo   [5] 🌐 Netlify पर तुरंत लाइव डिप्लॉय करें (Deploy to Netlify in 10s)
echo   [6] ❌ बाहर निकलें (Exit)
echo.
echo ======================================================================
echo   Network IP detected: !MY_IP!
echo ======================================================================
echo.
set "CHOICE="
set /p "CHOICE=विकल्प चुनें [1-6] (डिफ़ॉल्ट [1] के लिए Enter दबाएँ): "

if "!CHOICE!"=="" goto start_server
if "!CHOICE!"=="1" goto start_server
if "!CHOICE!"=="2" goto run_tests
if "!CHOICE!"=="3" goto run_build
if "!CHOICE!"=="4" goto make_shortcut
if "!CHOICE!"=="5" goto deploy_netlify
if "!CHOICE!"=="6" exit /b 0
goto menu

:start_server
cls
echo ======================================================================
echo       PALASH Vani (पलाश वाणी) - Starting Application
echo ======================================================================
echo.
echo   [+] स्थानीय पता (Local Access):    http://localhost:3000
echo   [+] टैबलेट पता (Tablet / Mobile):  http://!MY_IP!:3000
echo   [+] मोड (Execution Mode):          100%% ऑफ़लाइन (Zero Internet Required)
echo.
echo   [!] ब्राउज़र स्वतः 2 सेकंड में खुलेगा...
echo   [!] सर्वर रोकने के लिए इस विंडो में Ctrl+C दबाएँ।
echo ======================================================================
echo.

:: Launch default browser after 1.6 seconds in background
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Milliseconds 1600; Start-Process 'http://localhost:3000'"

:: Start Vite dev server on port 3000 bound to 0.0.0.0 for tablets
call npx.cmd vite --port 3000 --host
goto end

:run_tests
cls
echo ======================================================================
echo       PALASH Vani - Automated NLP & Voice Verification Test Suite
echo ======================================================================
echo.
call npm.cmd test
echo.
echo ======================================================================
pause
goto menu

:run_build
cls
echo ======================================================================
echo       PALASH Vani - Building Production Bundle & Dist Zip
echo ======================================================================
echo.
call npm.cmd run build
echo.
echo Packaging dist folder into palash-vani-v2.0.0-dist.zip ...
powershell -NoProfile -Command "Compress-Archive -Path dist/* -DestinationPath palash-vani-v2.0.0-dist.zip -Force"
echo [✓] Build and zip packaging complete!
echo.
pause
goto menu

:make_shortcut
cls
echo ======================================================================
echo       PALASH Vani - Creating Desktop Shortcut
echo ======================================================================
echo.
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $p = [Environment]::GetFolderPath('Desktop') + '\PALASH Vani.lnk'; $s = $ws.CreateShortcut($p); $s.TargetPath = '%~dp0start.bat'; $s.WorkingDirectory = '%~dp0'; $s.Description = 'PALASH Vani MTB-MLE Primary Education Suite'; $s.Save()"
echo [✓] Desktop shortcut created successfully on your Desktop:
echo     "PALASH Vani.lnk"
echo.
pause
goto menu

:deploy_netlify
cls
echo ======================================================================
echo       PALASH Vani - Instant Netlify Live Deployment
echo ======================================================================
echo.
echo   [1] Compiling latest production build (npm run build)...
call npm.cmd run build
echo.
echo   [2] Opening Netlify Drop in your web browser:
echo       https://app.netlify.com/drop
start "" "https://app.netlify.com/drop"
echo.
echo   [3] Opening the 'dist' build folder on your computer...
start explorer.exe "%~dp0dist"
echo.
echo ======================================================================
echo   [ACTION REQUIRED]:
echo   Simply drag the open 'dist' folder into the Netlify Drop webpage!
echo   Your live HTTPS link (e.g. https://palash-vani.netlify.app)
echo   will be generated in under 10 seconds!
echo ======================================================================
echo.
pause
goto menu

:end
exit /b 0
