' Lanceur — double-cliquez ce fichier pour ouvrir l'application
' dans votre navigateur par défaut (aucune fenêtre de console).
Dim fso, objShell, scriptDir, indexPath

Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
indexPath = scriptDir & "\index.html"

If fso.FileExists(indexPath) Then
    Set objShell = CreateObject("WScript.Shell")
    objShell.Run """" & indexPath & """", 1, False
Else
    MsgBox "index.html introuvable dans : " & scriptDir, vbExclamation, "Le Français facile"
End If
