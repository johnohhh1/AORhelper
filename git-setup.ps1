# Git Setup Script for AORhelper
# Run this in PowerShell from C:\Users\John\Desktop\AORhelper

Write-Host "Initializing Git repository..." -ForegroundColor Green

# Initialize git
git init

Write-Host "Adding remote repository..." -ForegroundColor Green

# Add remote
git remote add origin https://github.com/johnohhh1/AORhelper.git

Write-Host "Staging all files..." -ForegroundColor Green

# Add all files
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green

# Commit
git commit -m "Initial commit: AOR Helper App - Planning documentation and PRD"

Write-Host "Pushing to GitHub..." -ForegroundColor Green

# Rename branch to main and push
git branch -M main
git push -u origin main

Write-Host "Done! Repository pushed to GitHub." -ForegroundColor Green
Write-Host "View at: https://github.com/johnohhh1/AORhelper" -ForegroundColor Cyan
