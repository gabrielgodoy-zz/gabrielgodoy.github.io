<?php
session_start();

$con=mysqli_connect("localhost","foodtruck_adm","QO*@Yisp)(9","foodtruck_db", "21");
//$con=mysqli_connect("localhost","root","1234","corrida", "3306");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

if (isset($_GET['id_fb'])) {
	$id_fb = $_GET['id_fb'];
} else {
	$id_fb = $_SESSION['id_fb'];
}
//$id_fb = "1";

if (!isset($_GET['consulta'])) {

	if (isset($_GET['text_up'])) $text_up = $_GET['text_up'];
	if (isset($_GET['text_down'])) $text_down = $_GET['text_down'];
	if (isset($_GET['color'])) $color = $_GET['color'];
	if (isset($_GET['stickers'])) $stickers = $_GET['stickers'];
	if (isset($_GET['background'])) $background = $_GET['background'];
	if (isset($_GET['food_types'])) $food_types = $_GET['food_types'];
	if (isset($_GET['flower'])) $flower = $_GET['flower'];
	if (isset($_GET['eyelashes'])) $eyelashes = $_GET['eyelashes'];
	if (isset($_GET['candy'])) $candy = $_GET['candy'];
	if (isset($_GET['moustache'])) $moustache = $_GET['moustache'];
	if (isset($_GET['horn']))	 $horn = $_GET['horn'];


	if (isset($text_up)) $sql = "INSERT INTO truck (id_fb, text_up) VALUES ('$id_fb','$text_up') ON DUPLICATE KEY UPDATE text_up='$text_up'";
	if (isset($text_down)) $sql = "INSERT INTO truck (id_fb, text_down) VALUES ('$id_fb','$text_down') ON DUPLICATE KEY UPDATE text_down='$text_down'";
	if (isset($color)) $sql = "INSERT INTO truck (id_fb, color) VALUES ('$id_fb','$color') ON DUPLICATE KEY UPDATE color='$color'";
	if (isset($stickers)) $sql = "INSERT INTO truck (id_fb, stickers) VALUES ('$id_fb','$stickers') ON DUPLICATE KEY UPDATE stickers='$stickers'";
	if (isset($background)) $sql = "INSERT INTO truck (id_fb, background) VALUES ('$id_fb','$background') ON DUPLICATE KEY UPDATE background='$background'";
	if (isset($food_types)) $sql = "INSERT INTO truck (id_fb, food_types) VALUES ('$id_fb','$food_types') ON DUPLICATE KEY UPDATE food_types='$food_types'";
	if (isset($flower)) $sql = "INSERT INTO truck (id_fb, flower) VALUES ('$id_fb','$flower') ON DUPLICATE KEY UPDATE flower='$flower'";
	if (isset($eyelashes)) $sql = "INSERT INTO truck (id_fb, eyelashes) VALUES ('$id_fb','$eyelashes') ON DUPLICATE KEY UPDATE eyelashes='$eyelashes'";
	if (isset($candy)) $sql = "INSERT INTO truck (id_fb, candy) VALUES ('$id_fb','$candy') ON DUPLICATE KEY UPDATE candy='$candy'";
	if (isset($moustache)) $sql = "INSERT INTO truck (id_fb, moustache) VALUES ('$id_fb','$moustache') ON DUPLICATE KEY UPDATE moustache='$moustache'";
	if (isset($horn)) $sql = "INSERT INTO truck (id_fb, horn) VALUES ('$id_fb','$horn') ON DUPLICATE KEY UPDATE horn='$horn'";

	if (mysqli_query($con, $sql)) {
	    echo "Truck saved for: ";
	} else {
	    echo "Error updating record: " . mysqli_error($con);
	}

} else {
	$sql = "SELECT * FROM truck WHERE id_fb = '$id_fb'";

	$result = $con->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo $row["id_fb"] .";".$row["text_up"]. ";".$row["text_down"]. ";".$row["color"]. ";".$row["stickers"]. ";".$row["background"]. ";"
	        .$row["food_types"]. ";".$row["flower"]. ";".$row["eyelashes"]. ";".$row["candy"]. ";".$row["moustache"]. ";".$row["horn"];
	    }
	} else {
	    echo "User " . $id_fb . " has no saved truck!";
	}
}

mysqli_close($con);

?>