<?php 
    session_start();
    if(empty($_SESSION['user'])) 
    { 
        header("Location: /php/login/index.php?p=".$_SERVER['PHP_SELF']); 
        die("Sorry, deze pagina is alleen voor gebruikers. Je wordt naar de loginpagina gestuurd."); 
    } 
    if($_SESSION['user']['username'] !== "Xx.Nout_Kleef.xX") 
    { 
				echo "<script>alert('Sorry, deze pagina is alleen toegankelijk voor Xx.Nout_Kleef.xX.');window.location.replace('/php/memoryGame.php');</script>";
        die("Sorry, deze pagina is alleen voor gebruikers. Je wordt naar de loginpagina gestuurd."); 
    } 
?>
<!DOCTYPE html />
<html lang="en-US">

<head>
  <meta name="author" content="Nout Kleef">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/defaultStylesheet.css" />
	<link rel="stylesheet" href="/css/responsive.css" />
	<link rel="shortcut icon" href="/images/favicon.ico?v=2" />
  <title>Nout Kleef</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
	<script src="http://www.w3schools.com/lib/w3data.js"></script>
	<script src="/javascript/p5.js"></script>
</head>

<body>
  <div class="title">
    <img src="/images/newLogo.png" class="titleLogo" /><h1>KP</h1></div>

  <nav><ul id="menu"><?php require_once "/home/nkleef/public_html/templates/menu.php"; ?>
  </ul></nav>

  <div class="wrapper">
		<h1>
			NN
		</h1>
	<p id="TBH">
		<textarea id="toBeParsed" cols="24" rows="4"></textarea>
		<table id="inputTable">
			<tr><th>HK</th><th>HD</th><th>HM</th><th>HA</th><th>AK</th><th>AD</th><th>AM</th><th>AA</th><th>LR</th></tr>
		</table>
		Thuisvoordeel <input id="homeAdv" type="checkbox" checked="checked" /><br>
		<table style='width:186px;'>
			<tr><th style='width:60px;'>H</th><th style='width:60px;'>D</th><th style='width:60px;'>A</th></tr>
			<tr><td style='width:60px;'><input id="hPr" style='width:58px;' /></td><td style='width:60px;'><input id="dPr" style='width:58px;' /></td><td style='width:60px;'><input id="aPr" style='width:58px;' /></td></tr>
		</table>
		<button onclick="calcProbs();">
			Calculate  probabilities
		</button>
		</p>
		<div id="sketch-holder">
		</div>
  </div>

  <div id="footer" w3-include-html="/templates/footer.html">
  </div>
  <script src="/KP/Weight.js"></script>
	<script src="/KP/Neuron.js"></script>
	<script src="/KP/Layer.js"></script>
	<script src="/KP/NeuralNetwork.js"></script>
	<script src="/KP/input.js"></script>
	<script src="/KP/output.js"></script>
</body>
</html>