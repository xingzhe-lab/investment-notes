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
  # GitHub 直连比本机的 SOCKS 代理更稳定；仅对本次同步临时覆盖代理。
  $env:GIT_CONFIG_COUNT = "2"
  $env:GIT_CONFIG_KEY_0 = "http.proxy"
  $env:GIT_CONFIG_VALUE_0 = ""
  $env:GIT_CONFIG_KEY_1 = "https.proxy"
  $env:GIT_CONFIG_VALUE_1 = ""
  npx quartz sync
}
finally {
  Remove-Item Env:GIT_CONFIG_COUNT -ErrorAction SilentlyContinue
  Remove-Item Env:GIT_CONFIG_KEY_0 -ErrorAction SilentlyContinue
  Remove-Item Env:GIT_CONFIG_VALUE_0 -ErrorAction SilentlyContinue
  Remove-Item Env:GIT_CONFIG_KEY_1 -ErrorAction SilentlyContinue
  Remove-Item Env:GIT_CONFIG_VALUE_1 -ErrorAction SilentlyContinue
  Pop-Location
}
