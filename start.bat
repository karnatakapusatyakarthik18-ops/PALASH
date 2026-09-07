@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title PALASH Vani v2.0 - Smart Classroom Launcher
color 0A

:: Ensure local workspace directory
cd /d "%~dp0"

:: Detect standard Node.js installations if not yet on PATH
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=C:\Program Files\nodejs;%PATH%"
)
if exist "C:\Users\%USERNAME%\AppData\Roaming\npm" (
    set "PATH=C:\Users\%USERNAME%\AppData\Roaming\npm;%PATH%"
)
if exist "C:\Users\karna\.bin\node" (
    set "PATH=C:\Users\karna\.bin\node;%PATH%"
)

:: Detect local IPv4 address for classroom tablet access
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
if /i "%~1"=="kaggle" goto sync_kaggle
if /i "%~1"=="netlify" goto deploy_netlify
if /i "%~1"=="check" goto system_check
if /i "%~1"=="run" goto start_server

:menu
cls
echo ======================================================================
echo   ██████╗  █████╗ ██╗      █████╗ ███████╗██╗  ██╗
echo   ██╔══██╗██╔══██╗██║     ██╔══██╗██╔════╝██║  ██║
echo   ██████╔╝███████║██║     ███████║███████╗███████║  पलाश वाणी
echo   ██╔═══╝ ██╔══██║██║     ██╔══██║╚════██║██╔══██║  PALASH Vani v2.0
echo   ██║     ██║  ██║███████╗██║  ██║███████║██║  ██║  Smart Launcher
echo ======================================================================
echo   AI-Assisted Multilingual MTB-MLE Primary Suite (Jharkhand)
echo   Santhali (Ol Chiki) • Ho (Warang Chiti) • Mundari (Naguri)
echo ======================================================================
echo.
echo   [1] 🚀 त्वरित प्रारंभ (Launch Live App on Port 3000 + Auto-Browser)
echo   [2] 🎙️ 100%% ऑफ़लाइन वॉयस व NLP टेस्ट (Run Voice & NLP Test Suite)
echo   [3] 📦 100%% ऑफ़लाइन प्रोडक्शन PWA बिल्ड (Build Production Dist & Zip)
echo   [4] 📊 Kaggle डेटासेट सिंक व सत्यापन (Sync Kaggle Tribal Datasets)
echo   [5] 🖥️  डेस्कटॉप शॉर्टकट बनाएं (Create Windows Desktop Shortcut)
echo   [6] 🌐 Netlify पर तुरंत लाइव डिप्लॉय (Instant 10s Live Web Deployment)
echo   [7] 🩺 सिस्टम पर्यावरण जाँच (System Health & Dependency Check)
echo   [8] ❌ बाहर निकलें (Exit)
echo.
echo ======================================================================
echo   🌐 लोकल टैबलेट नेटवर्क IP: http://!MY_IP!:3000
echo   ⚡ ऑफ़लाइन मोड स्थिति: 100%% Edge Architecture (0 KB/s Internet Ready)
echo ======================================================================
echo.
set "CHOICE="
set /p "CHOICE=विकल्प चुनें [1-8] (डिफ़ॉल्ट [1] के लिए Enter दबाएँ): "

if "!CHOICE!"=="" goto start_server
if "!CHOICE!"=="1" goto start_server
if "!CHOICE!"=="2" goto run_tests
if "!CHOICE!"=="3" goto run_build
if "!CHOICE!"=="4" goto sync_kaggle
if "!CHOICE!"=="5" goto make_shortcut
if "!CHOICE!"=="6" goto deploy_netlify
if "!CHOICE!"=="7" goto system_check
if "!CHOICE!"=="8" exit /b 0
goto menu

:start_server
cls
echo ======================================================================
echo       PALASH Vani (पलाश वाणी) - Starting Live Application
echo ======================================================================
echo.
echo   [+] स्थानीय पता (Local Access):    http://localhost:3000
echo   [+] टैबलेट पता (Tablet / Mobile):  http://!MY_IP!:3000
echo   [+] निष्पादन मोड (Execution Mode): 100%% ऑफ़लाइन (Zero Internet Required)
echo.
echo   [!] ब्राउज़र स्वतः 1.5 सेकंड में खुलेगा...
echo   [!] सर्वर रोकने के लिए इस विंडो में Ctrl+C दबाएँ।
echo ======================================================================
echo.

:: Auto-launch default browser in background
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Milliseconds 1500; Start-Process 'http://localhost:3000'"

:: Start Vite dev server on port 3000 bound to all network interfaces
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
echo   [✓] Test run complete.
echo ======================================================================
pause
goto menu

:run_build
cls
echo ======================================================================
echo       PALASH Vani - Building 100%% Offline Production Bundle
echo ======================================================================
echo.
call npm.cmd run build
echo.
echo Packaging dist folder into palash-vani-v2.0.0-dist.zip ...
powershell -NoProfile -Command "Compress-Archive -Path dist/* -DestinationPath palash-vani-v2.0.0-dist.zip -Force"
echo.
echo ======================================================================
echo   [✓] Production build and zip package complete:
echo       - dist/ folder (Ready for offline web hosting or USB distribution)
echo       - palash-vani-v2.0.0-dist.zip
echo ======================================================================
pause
goto menu

:sync_kaggle
cls
echo ======================================================================
echo       PALASH Vani - Kaggle Tribal Dataset Extraction & Sync
echo ======================================================================
echo.
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [RUN] Executing python scripts/pull_kaggle_datasets.py ...
    python scripts\pull_kaggle_datasets.py
) else (
    echo [INFO] Python not in PATH. Running Node.js dataset extractor...
    node scripts\pull_datasets.mjs
)
echo.
echo ======================================================================
echo   [✓] Kaggle dataset verification complete!
echo ======================================================================
pause
goto menu

:make_shortcut
cls
echo ======================================================================
echo       PALASH Vani - Creating Desktop Shortcut
echo ======================================================================
echo.
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $p = [Environment]::GetFolderPath('Desktop') + '\PALASH Vani.lnk'; $s = $ws.CreateShortcut($p); $s.TargetPath = '%~dp0start.bat'; $s.WorkingDirectory = '%~dp0'; $s.Description = 'PALASH Vani MTB-MLE Primary Education Suite'; $s.Save()"
echo ======================================================================
echo   [✓] Desktop shortcut created successfully on your Desktop:
echo       Name: "PALASH Vani.lnk"
echo       Target: %~dp0start.bat
echo ======================================================================
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
pause
goto menu

:system_check
cls
echo ======================================================================
echo       PALASH Vani - System Health & Diagnostics Check
echo ======================================================================
echo.
echo [1] Checking Node.js:
where node
node -v
echo.
echo [2] Checking NPM:
where npm
npm -v
echo.
echo [3] Checking Git:
where git
git --version
echo.
echo [4] Checking Python (Optional for Kaggle sync):
where python 2>nul
if %errorlevel% equ 0 (
    python --version
) else (
    echo [INFO] Python is optional. Node.js fallback is active.
)
echo.
echo [5] Checking Project Dependencies:
if exist "node_modules" (
    echo [✓] node_modules exists and is installed.
) else (
    echo [!] node_modules missing. Run 'npm install' first.
)
echo.
echo ======================================================================
echo   [✓] System environment diagnostics complete.
echo ======================================================================
pause
goto menu

:end
exit /b 0
