<?php
session_start();

$con=mysqli_connect("localhost","foodtruck_adm","QO*@Yisp)(9","foodtruck_db", "21");
//$con=mysqli_connect("localhost","root","1234","corrida", "3306");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$nome = $_SESSION['nome'];
$id_fb = $_SESSION['id_fb'];
$score = $_SESSION['score'];
$ban = false;

// Fetch
$query = "SELECT * FROM ranking where id_fb='$id_fb'";
$result = $con->query($query);

$inc = 0;
$new_record = false;
while($row = mysqli_fetch_array($result)) {
	$inc++;
	if ($score < $row["score"]) {
		$new_record = true;
	}
}

if ($score<1000) {
	$score = 3000;
	$ban = true;
}

if ($ban && $new_record) {
	$sql = "UPDATE ranking SET ban='$ban' WHERE id_fb='$id_fb'";
} else if ($new_record) {
	$sql = "UPDATE ranking SET score='$score' WHERE id_fb='$id_fb'";
} else {
	$sql = "INSERT INTO ranking (nome,id_fb,score,ban) VALUES ('$nome','$id_fb','$score', '$ban')";
}

if ($inc>0 && !$new_record) {
	echo "No record for: ";
} else if (mysqli_query($con, $sql)) {
    echo "Record updated successfully for: ";
} else {
    echo "Error updating record: " . mysqli_error($con);
}
//mysqli_query($con,"INSERT INTO ranking (nome,id_fb,score) VALUES ('Douglas','12345',3000)");

mysqli_close($con);

echo $_SESSION['nome'];

?>