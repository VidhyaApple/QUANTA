<?php
<<<<<<< HEAD
$file = 'quanta-1_5.apk'; //not public folder
=======
$file = 'quanta.apk'; //not public folder
>>>>>>> 1f397fa5567a5202a063583f9e10324a794d0503
if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.android.package-archive');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    
    exit;
}else{

echo "<script>alert('apk file not found!')</script>";
}

?>