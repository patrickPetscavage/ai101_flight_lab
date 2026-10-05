@echo off
cd /d "%~dp0"
py -3 --version >nul 2>&1
if not errorlevel 1 (
  py -3 launch.py
) else (
  python launch.py
)
if errorlevel 1 (
  echo Could not start Flight Lab. Python 3 is required.
  pause
)
