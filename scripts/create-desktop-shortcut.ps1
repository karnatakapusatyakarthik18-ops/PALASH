# PALASH Vani — Desktop Shortcut Creator
$wshell = New-Object -ComObject WScript.Shell
$targetExe = "C:\Users\karna\Documents\sih\release\win-unpacked\PALASH Vani.exe"
$workingDir = "C:\Users\karna\Documents\sih\release\win-unpacked"

# Detect possible desktop locations
$possibleDesktops = @(
    "C:\Users\karna\Desktop",
    "$env:USERPROFILE\Desktop",
    "$env:OneDrive\Desktop"
)

$created = $false
foreach ($desktop in $possibleDesktops) {
    if ($desktop -and (Test-Path $desktop)) {
        $shortcutPath = Join-Path $desktop "PALASH Vani.lnk"
        $shortcut = $wshell.CreateShortcut($shortcutPath)
        $shortcut.TargetPath = $targetExe
        $shortcut.WorkingDirectory = $workingDir
        $shortcut.Description = "PALASH Vani - 100% Offline Multilingual EdTech Suite (Jharkhand)"
        $shortcut.IconLocation = "$targetExe,0"
        $shortcut.Save()
        Write-Output "SUCCESS: Created desktop shortcut at $shortcutPath"
        $created = $true
    }
}

if (-not $created) {
    # Fallback to standard C:\Users\karna\Desktop
    $shortcutPath = "C:\Users\karna\Desktop\PALASH Vani.lnk"
    $shortcut = $wshell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $targetExe
    $shortcut.WorkingDirectory = $workingDir
    $shortcut.Description = "PALASH Vani - 100% Offline Multilingual EdTech Suite"
    $shortcut.IconLocation = "$targetExe,0"
    $shortcut.Save()
    Write-Output "SUCCESS: Created desktop shortcut at $shortcutPath"
}
