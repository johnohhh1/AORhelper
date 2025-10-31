@echo off
echo Initializing Git repository...

cd /d C:\Users\John\Desktop\AORhelper

git init
git remote add origin https://github.com/johnohhh1/AORhelper.git
git add .
git commit -m "Initial commit: AOR Helper App - Planning documentation and PRD"
git branch -M main
git push -u origin main

echo.
echo Done! Repository pushed to GitHub.
echo View at: https://github.com/johnohhh1/AORhelper
pause
