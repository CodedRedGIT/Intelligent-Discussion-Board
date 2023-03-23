# Setup venv
if (!(Test-Path -Path "./venv")) {
  Write-Output "Creating virtual environment"
  python -m venv venv
}

# Activate venv
./venv/Scripts/activate