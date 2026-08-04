@echo off
setlocal
title MP4 Compressor

set "MP4_COMPRESSOR_SELF=%~f0"
set "MP4_COMPRESSOR_DIR=%~dp0"

powershell.exe -NoProfile -ExecutionPolicy Bypass -STA -Command ^
"$self = $env:MP4_COMPRESSOR_SELF; ^
if ([string]::IsNullOrWhiteSpace($self)) { throw 'Batch file path is unavailable.' }; ^
$lines = Get-Content -LiteralPath $self; ^
$marker = [Array]::IndexOf($lines, '# POWERSHELL'); ^
if ($marker -lt 0) { throw 'PowerShell section not found.' }; ^
$script = $lines[($marker + 1)..($lines.Length - 1)] -join [Environment]::NewLine; ^
& ([ScriptBlock]::Create($script))"

set "exitCode=%errorlevel%"

if not "%exitCode%"=="0" (
    echo.
    echo The compressor stopped with exit code %exitCode%.
    echo.
    pause
)

endlocal
exit /b %exitCode%

# POWERSHELL
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

try {
    $folder = $env:MP4_COMPRESSOR_DIR.TrimEnd('\')

    $ffmpegLocations = @(
        (Join-Path $folder 'ffmpeg.exe'),
        (Join-Path $folder 'bin\ffmpeg.exe'),
        (Join-Path $folder 'ffmpeg\bin\ffmpeg.exe')
    )

    $ffmpeg = $null

    foreach ($location in $ffmpegLocations) {
        if (Test-Path -LiteralPath $location -PathType Leaf) {
            $ffmpeg = $location
            break
        }
    }

    if (-not $ffmpeg) {
        $command = Get-Command 'ffmpeg.exe' -ErrorAction SilentlyContinue

        if ($command) {
            $ffmpeg = $command.Source
        }
    }

    if (-not $ffmpeg) {
        [System.Windows.Forms.MessageBox]::Show(
            "ffmpeg.exe was not found.`n`nPlace ffmpeg.exe beside the batch file or add FFmpeg to PATH.",
            'FFmpeg not found',
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        ) | Out-Null

        exit 1
    }

    $files = @(
        Get-ChildItem -LiteralPath $folder -Filter '*.mp4' -File |
        Where-Object { $_.BaseName -notmatch '_compressed(?:_\d{8}_\d{6})?$' } |
        Sort-Object Name
    )

    if ($files.Count -eq 0) {
        [System.Windows.Forms.MessageBox]::Show(
            "No MP4 files were found in:`n`n$folder",
            'No MP4 files found',
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Information
        ) | Out-Null

        exit 0
    }

    $form = New-Object System.Windows.Forms.Form
    $form.Text = 'MP4 Compressor'
    $form.StartPosition = 'CenterScreen'
    $form.ClientSize = New-Object System.Drawing.Size(700, 520)
    $form.MinimumSize = New-Object System.Drawing.Size(550, 420)
    $form.Font = New-Object System.Drawing.Font('Segoe UI', 10)
    $form.MaximizeBox = $false

    $titleLabel = New-Object System.Windows.Forms.Label
    $titleLabel.Text = 'Select one or more MP4 files'
    $titleLabel.Location = New-Object System.Drawing.Point(15, 15)
    $titleLabel.Size = New-Object System.Drawing.Size(660, 25)
    $titleLabel.Anchor = 'Top,Left,Right'
    $form.Controls.Add($titleLabel)

    $helpLabel = New-Object System.Windows.Forms.Label
    $helpLabel.Text = 'Use Ctrl+click, Shift+click, or Ctrl+A to select multiple files.'
    $helpLabel.Location = New-Object System.Drawing.Point(15, 42)
    $helpLabel.Size = New-Object System.Drawing.Size(660, 22)
    $helpLabel.Anchor = 'Top,Left,Right'
    $form.Controls.Add($helpLabel)

    $folderLabel = New-Object System.Windows.Forms.Label
    $folderLabel.Text = $folder
    $folderLabel.Location = New-Object System.Drawing.Point(15, 67)
    $folderLabel.Size = New-Object System.Drawing.Size(660, 22)
    $folderLabel.Anchor = 'Top,Left,Right'
    $folderLabel.AutoEllipsis = $true
    $form.Controls.Add($folderLabel)

    $listBox = New-Object System.Windows.Forms.ListBox
    $listBox.Location = New-Object System.Drawing.Point(15, 100)
    $listBox.Size = New-Object System.Drawing.Size(670, 310)
    $listBox.Anchor = 'Top,Bottom,Left,Right'
    $listBox.DisplayMember = 'Name'
    $listBox.SelectionMode = [System.Windows.Forms.SelectionMode]::MultiExtended

    foreach ($file in $files) {
        [void]$listBox.Items.Add($file)
    }

    $form.Controls.Add($listBox)

    $selectAllButton = New-Object System.Windows.Forms.Button
    $selectAllButton.Text = 'Select all'
    $selectAllButton.Location = New-Object System.Drawing.Point(15, 425)
    $selectAllButton.Size = New-Object System.Drawing.Size(100, 32)
    $selectAllButton.Anchor = 'Bottom,Left'
    $form.Controls.Add($selectAllButton)

    $clearButton = New-Object System.Windows.Forms.Button
    $clearButton.Text = 'Clear'
    $clearButton.Location = New-Object System.Drawing.Point(125, 425)
    $clearButton.Size = New-Object System.Drawing.Size(100, 32)
    $clearButton.Anchor = 'Bottom,Left'
    $form.Controls.Add($clearButton)

    $progressBar = New-Object System.Windows.Forms.ProgressBar
    $progressBar.Location = New-Object System.Drawing.Point(15, 466)
    $progressBar.Size = New-Object System.Drawing.Size(410, 28)
    $progressBar.Anchor = 'Bottom,Left,Right'
    $progressBar.Minimum = 0
    $progressBar.Value = 0
    $form.Controls.Add($progressBar)

    $statusLabel = New-Object System.Windows.Forms.Label
    $statusLabel.Text = 'Ready'
    $statusLabel.Location = New-Object System.Drawing.Point(240, 429)
    $statusLabel.Size = New-Object System.Drawing.Size(300, 28)
    $statusLabel.Anchor = 'Bottom,Left,Right'
    $statusLabel.AutoEllipsis = $true
    $form.Controls.Add($statusLabel)

    $compressButton = New-Object System.Windows.Forms.Button
    $compressButton.Text = 'Compress'
    $compressButton.Location = New-Object System.Drawing.Point(465, 462)
    $compressButton.Size = New-Object System.Drawing.Size(105, 35)
    $compressButton.Anchor = 'Bottom,Right'
    $form.Controls.Add($compressButton)

    $cancelButton = New-Object System.Windows.Forms.Button
    $cancelButton.Text = 'Close'
    $cancelButton.Location = New-Object System.Drawing.Point(580, 462)
    $cancelButton.Size = New-Object System.Drawing.Size(105, 35)
    $cancelButton.Anchor = 'Bottom,Right'
    $form.Controls.Add($cancelButton)

    $form.AcceptButton = $compressButton
    $form.CancelButton = $cancelButton

    $selectAllButton.Add_Click({
        for ($i = 0; $i -lt $listBox.Items.Count; $i++) {
            $listBox.SetSelected($i, $true)
        }
    })

    $clearButton.Add_Click({
        $listBox.ClearSelected()
    })

    $cancelButton.Add_Click({
        $form.Close()
    })

    $listBox.Add_KeyDown({
        param($sender, $eventArgs)

        if ($eventArgs.Control -and $eventArgs.KeyCode -eq [System.Windows.Forms.Keys]::A) {
            for ($i = 0; $i -lt $listBox.Items.Count; $i++) {
                $listBox.SetSelected($i, $true)
            }

            $eventArgs.SuppressKeyPress = $true
        }
    })

    $compressButton.Add_Click({
        $selectedFiles = @($listBox.SelectedItems)

        if ($selectedFiles.Count -eq 0) {
            [System.Windows.Forms.MessageBox]::Show(
                'Select at least one MP4 file.',
                'No files selected',
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Warning
            ) | Out-Null

            return
        }

        $controls = @(
            $compressButton,
            $cancelButton,
            $selectAllButton,
            $clearButton,
            $listBox
        )

        foreach ($control in $controls) {
            $control.Enabled = $false
        }

        $progressBar.Minimum = 0
        $progressBar.Maximum = $selectedFiles.Count
        $progressBar.Value = 0

        $completed = 0
        $failed = New-Object System.Collections.Generic.List[string]

        foreach ($selectedFile in $selectedFiles) {
            $current = $completed + $failed.Count + 1
            $statusLabel.Text = "Compressing $current of $($selectedFiles.Count): $($selectedFile.Name)"
            $form.Refresh()
            [System.Windows.Forms.Application]::DoEvents()

            $outputFile = Join-Path $selectedFile.DirectoryName "$($selectedFile.BaseName)_compressed.mp4"

            if (Test-Path -LiteralPath $outputFile) {
                $timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
                $outputFile = Join-Path $selectedFile.DirectoryName "$($selectedFile.BaseName)_compressed_$timestamp.mp4"
            }

            try {
                $arguments = @(
                    '-hide_banner',
                    '-y',
                    '-i', $selectedFile.FullName,
                    '-map', '0:v:0',
                    '-map', '0:a?',
                    '-c:v', 'libx264',
                    '-crf', '23',
                    '-preset', 'medium',
                    '-c:a', 'aac',
                    '-b:a', '128k',
                    '-movflags', '+faststart',
                    $outputFile
                )

                & $ffmpeg @arguments

                if ($LASTEXITCODE -ne 0) {
                    throw "FFmpeg exited with error code $LASTEXITCODE."
                }

                $completed++
            }
            catch {
                $failed.Add($selectedFile.Name)
            }

            $progressBar.Value = $completed + $failed.Count
            $form.Refresh()
        }

        foreach ($control in $controls) {
            $control.Enabled = $true
        }

        if ($failed.Count -eq 0) {
            $statusLabel.Text = "Completed $completed file(s)."

            [System.Windows.Forms.MessageBox]::Show(
                "Compression completed successfully.`n`nFiles completed: $completed",
                'Compression complete',
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Information
            ) | Out-Null
        }
        else {
            $statusLabel.Text = "Completed: $completed | Failed: $($failed.Count)"
            $failedNames = $failed -join "`n"

            [System.Windows.Forms.MessageBox]::Show(
                "Completed: $completed`nFailed: $($failed.Count)`n`nFailed files:`n$failedNames",
                'Compression finished',
                [System.Windows.Forms.MessageBoxButtons]::OK,
                [System.Windows.Forms.MessageBoxIcon]::Warning
            ) | Out-Null
        }
    })

    [void]$form.ShowDialog()
    exit 0
}
catch {
    Write-Host ''
    Write-Host $_.Exception.ToString()

    [System.Windows.Forms.MessageBox]::Show(
        $_.Exception.Message,
        'MP4 Compressor error',
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    ) | Out-Null

    exit 1
}