[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$source = "C:\Obsidian\读书笔记_md"
$destination = Join-Path $PSScriptRoot "..\content"

if (-not (Test-Path -LiteralPath $source)) {
  throw "找不到 Obsidian 源目录：$source"
}

robocopy $source $destination /E /XO /FFT /R:2 /W:1 /XD ".obsidian" "private"
if ($LASTEXITCODE -gt 7) {
  throw "同步笔记失败，robocopy 返回代码：$LASTEXITCODE"
}

Push-Location (Join-Path $PSScriptRoot "..")
try {
  npx quartz sync
}
finally {
  Pop-Location
}
