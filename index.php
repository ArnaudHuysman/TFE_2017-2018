<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Just A Game</title>
    <link rel="stylesheet" type="text/css" href="src/css/myCss.css" />
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js"></script>
		<script type="text/javascript" src="dist/js/package/three.min.js"></script>
		<script type="text/javascript" src="dist/js/package/OrbitControls.js"></script>

		<!--[if IE]>
  		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>
	<body>

		<div class="app"></div>

		<template class="template">

			<div class="screen introScreen">
				<div class="title">
					<img class="title_img fluidimg" src="./dist/assets/img/TFE_Title-01.png" alt="">
				</div>

				<div class="playButton ">
					<a href="#" class="btn"><span>Jouer</span></a>
				</div>
				<div class="optionButton ">
					<a href="#" class="btn"><span>Options</span></a>
				</div>
				<div class="creditButton ">
					<a href="#" class="btn"><span>Credits</span></a>
				</div>
			</div>

			<div class="screen characterScreen">
				<div class="heroes">
					<div class="hero">
						<a href=""> Simple Guy</a>
					</div>
					<div class="hero">
						<a href=""> Scientist </a>
					</div>
					<div class="hero">
						<a href=""> Big Guy </a>
					</div>
					<div class="hero">
						<a href=""> Engeneer </a>
					</div>
				</div>
				<div class="maps">
					<div class="map">
						<a href=""> 1ère Map</a>
					</div>
				</div>
				<div class="playButton">
					 <a href="#" class="btn"><span>Play</span></a>
				</div>
			</div>

			<div class="screen gameScreen">
				<div class="score"> Score : 0 </div>
				<div class="world" id="world"></div>
			</div>

		</template>

	<script type="text/javascript" src="dist/js/app.js?cb=<?php echo mt_rand(1000, 100000);?>"/></script>

	</body>
</html>
