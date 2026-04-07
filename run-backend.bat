@echo off
cd /d %~dp0
if exist args.txt del args.txt
echo -cp>args.txt
<nul set /p =target\classes>>args.txt
for /r %USERPROFILE%\.m2\repository %%i in (*.jar) do <nul set /p =;%%i>>args.txt
echo.>>args.txt
echo com.example.demo.DemoApplication>>args.txt
java @args.txt
