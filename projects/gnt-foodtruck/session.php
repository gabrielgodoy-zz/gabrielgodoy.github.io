<?php

session_start();

if (isset($_POST['nome'])) {
	$_SESSION['nome'] = $_POST['nome'];
}

if (isset($_POST['id_fb'])) {
	$_SESSION['id_fb'] = $_POST['id_fb'];
}

if (isset($_POST['score'])) {
	$_SESSION['score'] = $_POST['score'];	
} else {
	$_SESSION['score'] = "3000";
}

echo $_SESSION['score'];

?>