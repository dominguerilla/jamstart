$musics = Get-Content songs.txt
$maxInd = $musics.Count

$index = Get-Random -minimum 0 -maximum $maxInd

Start-Process $musics[$index].ToString()