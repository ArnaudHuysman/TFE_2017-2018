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
		<div class="module"></div>

		<!-- Header -->
		<template class="header_template">
			<div class="header">
				<ul class="header_nav">
					<li class="header_nav--item">
						<div class="option_buttons">
							<div class="sound buttons" alt="exit">
								<a href="#" class="btn"><span> - / + </span></a>
							</div>
							<div class="param buttons" alt="exit">
								<a href="#" class="btn"><span> O </span></a>
							</div>
						</div>
					</li>
					<li class="header_nav--item">
						<div class="header_title" alt="exit">
							<!-- <p>Hero Level</p> -->
						</div>
					</li>
					<li class="header_nav--item">
						<div class="option buttons" alt="exit">
							<a href="#" class="btn"><span> < - </span></a>
						</div>
					</li>
				</ul>
			</div>
		</template>

		<template class="template">

			<!-- Ecran d'acceuil -->
			<div class="screen introScreen">
				<div class="title">
					<img class="title_img fluidimg" src="./dist/assets/img/TFE_Title-01.png" alt="">
				</div>

				<div class="intro_buttons">

					<div class="playButton buttons">
						<a href="#" class="btn"><span></span></a>
					</div>
					<div class="optionButton buttons">
						<a href="#" class="btn"><span></span></a>
					</div>
					<div class="creditButton buttons">
						<a href="#" class="btn"><span></span></a>
					</div>
				</div>

			</div>

			<!-- Ecran de choix de la map -->
			<div class="screen mapScreen">
				<div class="">

					<div class="maps">

						<div class="map map1">
							<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							<div class="description">
								<h3 class="description_title"> Premium </h3>
								<div class="map_vie"> <img src="./dist/assets/img/icons/icon_map.png" alt=""> </div>
							</div>
						</div>
						<div class="map map2">
							<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							<div class="description">
								<h3 class="description_title"> Derivium </h3>
								<div class="map_vie"> <img src="./dist/assets/img/icons/icon_map.png" alt=""> </div>
							</div>
						</div>
						<div class="map map3">
							<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							<div class="description">
								<h3 class="description_title"> Trilium </h3>
								<div class="map_vie"> <img src="./dist/assets/img/icons/icon_map.png" alt=""> </div>
							</div>
						</div>
						<div class="map map4">
							<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							<div class="description">
								<h3 class="description_title"> Strium </h3>
								<div class="map_vie"> <img src="./dist/assets/img/icons/icon_map.png" alt=""> </div>
							</div>
						</div>
						<div class="map map5">
							<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							<div class="description">
								<h3 class="description_title"> Delightium </h3>
								<div class="map_vie"> <img src="./dist/assets/img/icons/icon_map.png" alt=""> </div>
							</div>
						</div>
						<div class="map map6">
							<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							<div class="description">
								<h3 class="description_title"> Bloom </h3>
								<div class="map_vie"> <img src="./dist/assets/img/icons/icon_map.png" alt=""> </div>
							</div>
						</div>
					</div>

				</div>

				<div class="screen_footer">

					<ul class="footer_nav">
						<li class="footer_nav--item">
							<div class="exit buttons" alt="exit">
								<a href="#" class="btn"><span> Return to menu </span></a>
							</div>
						</li>
						<li class="footer_nav--item">
							<div class="char_choice buttons">
								<a href="#" class="btn"><span>Choose your Character </span></a>
							</div>
						</li>
					</ul>


				</div>
			</div>

			<!-- Ecran de choix du personnages -->
			<div class="screen characterScreen">

				<div class="showreel" id="showreel"></div>
				<div class="screen_footer">

					<ul class="footer_nav">
						<li class="footer_nav--item">
							<div class="exit buttons">
								<a href="#" class="btn"><span> Return to menu </span></a>
							</div>
						</li>
						<li class="footer_nav--item">
							<div class="startButton buttons" alt="exit">
								<a href="#" class="btn"><span>Play</span></a>
							</div>
						</li>
					</ul>

				</div>

			</div>

			<!-- Ecran de jeux -->
			<div class="screen gameScreen">
				<div class="score"> Score : 0 </div>
				<div class="world" id="world"></div>
			</div>

		</template>

		<!-- Module Template  -->
		<template class="module_template" id="module_template">
			<div class="menu_module module">
				<p> Menu </p>
				<a class="exit button" href="#"> Exit </a>
			</div>
		</template>

	<script type="text/javascript" src="dist/js/app.js?cb=<?php echo mt_rand(1000, 100000);?>"/></script>

	</body>
</html>
