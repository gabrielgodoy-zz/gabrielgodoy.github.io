<?php
//conection:
//$link = mysqli_connect("www.apps.blogfarm.com.br","appsblogfarm","q1w2e3!!","gnt_corrida_foodtruck") or die("Error " . mysqli_error($link));
//shell_exec("ssh -f -L www.apps.blogfarm.com.br:3306 appsblogfarm@blogfarm.com.br sleep 60 >> logfile");  
//$link = mysqli_connect("localhost","root","1234","corrida", "3306") or die("Não foi possível conectar ao banco de dados! " . mysqli_error($link));
$link = mysqli_connect("localhost","foodtruck_adm","QO*@Yisp)(9","foodtruck_db", "21") or die("Não foi possível conectar ao banco de dados! " . mysqli_error($link));

//consultation:

$query = "SELECT * FROM ranking where not ban or ban is null order by score limit 10" or die("Error in the consult.." . mysqli_error($link));

//execute the query.

$result = $link->query($query);

function mask_score($score) {
	$ms = substr($score,-1);
	$sec = substr($score,-3,2);
	$min = substr($score,0, strlen($score)-3);
	return $min.":".$sec.".".$ms;
};


?> 

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Aplicativo do GNT - Corrida do Food Truck</title>
	<link rel="icon" href="favicon.png" />
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/framework-game.css">
	<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="js/html2canvas.min.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
</head>
<body>
	<div class="wrapper">
		<header class="mural-foodtruck">
			<a href="http://gnt.globo.com/programas/food-truck-a-batalha/" target="_blank"><h1 class="main-logo"></h1></a>
			<a><img class="intro-logo-app" src="images/logo-app.png" alt="Corrida do Food Truck" width="200"></a>
			<a href="http://gnt.globo.com/" target="_blank"><img src="images/logo-gnt-header-ingame.png" alt=""></a>
		</header>
		<section class="faixa-ranking">

			<h2><span>TOP 10</span>Melhores<br> Tempos</h2>
			<p>Confira os melhores tempos do game</p>

			<ul class="ranking-lista">
			<?php 
				//display information:
			$inc = 0;
			while($row = mysqli_fetch_array($result)) {
				$inc++;
				$score = $row["score"];

				echo "<li><span>".$inc."&deg;</span> <p> ". $row["nome"] . "<span>" . mask_score($score) . " </span></p> </li>";
			}
			while($inc < 10) {
				$inc++;
				echo "<li><span>".$inc."&deg;</span> <p> Desafie seus amigos! <span> - </span></p> </li>";
			}

			?>
			</ul>
		</section>
		<footer class="ranking-footer">
			<div class="bts-action-mural">

				<a href="index.html" class="bt-mural-voltar bt-voltar-ranking">
					<span>Voltar</span> Voltar
				</a>

			</div>
		</footer>
	</div>
</body>
</html>
