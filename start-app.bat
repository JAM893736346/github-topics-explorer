@echo off
echo Starting GitHub Topics Explorer...
echo.
echo [提示] 要关闭服务器，请按 Ctrl + C，然后输入 Y 确认
echo [Tips] To stop the server, press Ctrl + C, then type Y to confirm
echo.
cd /d "%~dp0"
start http://localhost:3000
npm run dev 