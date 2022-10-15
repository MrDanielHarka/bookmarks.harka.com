if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit
@echo off
node app.js
timeout /t 5 /nobreak
git add .
git commit -m "Add bookmark"
git push
exit