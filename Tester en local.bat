@echo off
title Le Francais facile - Serveur local
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo ============================================================
    echo  ERREUR : Node.js n'est pas installe ou n'est pas dans le PATH.
    echo  Telechargez-le sur https://nodejs.org puis relancez ce fichier.
    echo ============================================================
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo  Le Francais facile - demarrage du serveur local
echo  (necessaire pour tester le PWA / mode hors-ligne comme en
echo   production - ouvrir index.html directement ne suffit pas)
echo ============================================================
echo.

node scripts\serve.js . 3000 --open

echo.
echo Serveur arrete.
pause
