<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Just A Game</title>
    <link rel="stylesheet" type="text/css" href="src/css/myCss.css" />
		<link href="https://fonts.googleapis.com/css?family=Titillium+Web:200,400,600,700" rel="stylesheet">
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js"></script> -->
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
							<div class="sound buttons" alt="sound">
								<a href="#" class="btn">  </a>
							</div>
							<div class="music buttons" alt="music">
								<a href="#" class="btn">  </a>
							</div>
						</div>
					</li>
					<li class="header_nav--item">
						<div class="pause buttons" alt="option">
							<a href="#" class="btn">  </a>
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

						<div data-name="derivium" class="map map1">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
								<div class="map_hidden-info">
									<h3 class="map_title"> Derivium </h3>
									<h4 class="map_infoTitle"></h4>
									<h2 class="map_info"></h2>
								</div>
							</div>
						</div>
						<div data-name="talentium" class="map map2">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
								<div class="map_hidden-info">
									<h3 class="map_title"> Talentium </h3>
									<h4 class="map_infoTitle"></h4>
									<h2 class="map_info"></h2>
								</div>
							</div>
						</div>
						<div data-name="krypton" class="map map3">
							<div class="map_icon">
									<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
									<div class="map_hidden-info">
										<h3 class="map_title"> Krypton </h3>
										<h4 class="map_infoTitle"></h4>
										<h2 class="map_info"></h2>
									</div>
							</div>
						</div>
						<div data-name="belgium" class="map map4">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
								<div class="map_hidden-info">
									<h3 class="map_title"> Belgium </h3>
									<h4 class="map_infoTitle"></h4>
									<h2 class="map_info"></h2>
								</div>
							</div>
						</div>
						<div data-name="delight" class="map map5">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
								<div class="map_hidden-info">
									<h3 class="map_title"> Delight </h3>
									<h4 class="map_infoTitle"></h4>
									<h2 class="map_info"></h2>
								</div>
							</div>
						</div>
						<div data-name="bloom" class="map map6">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
								<div class="map_hidden-info">
									<h3 class="map_title"> Bloom </h3>
									<h4 class="map_infoTitle"></h4>
									<h2 class="map_info"></h2>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="screen_footer">

					<ul class="footer_nav">
						<li class="footer_nav--item">
							<div class="exit buttons" alt="exit">
								<a href="#" class="btn"></a>
							</div>
						</li>
						<li class="footer_nav--item">
							<div class="fragment footer--item">
								<div class="fragment-img">
									<div class="fragment-text">
									</div>
								</div>
							</div>
						</li>
					</ul>

				</div>
			</div>

			<!-- Ecran de jeux -->
			<div class="screen gameScreen">
				<div class="world" id="world"></div>
				<div class="screen_footer">
					<ul class="footer_nav">
						<li class="footer_nav--item">
							<div class="lifes footer--item">
								<div class="life"></div>
								<div class="life"></div>
								<div class="life"></div>
							</div>
						</li>
						<li class="footer_nav--item">
							<div class="fragment footer--item">
								<div class="fragment-img">
									<div class="fragment-text">
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>

		</template>

		<!-- Module Template  -->
		<template class="module_template" id="module_template">

			<!-- Menu Template  -->
			<div class="menu_module module">
				<div class="menu_module--img">

				</div>
			</div>

			<!-- State Template  -->
			<div class="state_module module">
				<p class="state_module--text"> Empty </p>
			</div>

			<!-- EndGame Template  -->
			<!-- Victory Template  -->
			<div class="end_module victory module">
				<h1 class="end_module--title"> Victory </h1>
				<div class="end-module--info fragment">
					<div class="fragment-img">
						<div class="fragment-text">
						</div>
					</div>
				</div>
				<div class="end_module--buttons">
					<div class="end_module--interface">
						<p class="end_module--text"> Menu </p>
						<div class="end_module--btn button return"> <a href="#"></a></div>
					</div>
					<div class="end_module--interface">
						<div class="end_module--btn button replay"> <a href="#"></a></div>
						<p class="end_module--text"> Replay </p>
					</div>
				</div>
			</div>
			<!-- Defeat Template  -->
			<div class="end_module defeat module">
				<h1 class="end_module--title"> Defeat </h1>
				<div class="end_module--buttons">
					<div class="end_module--interface">
						<p class="end_module--text"> Menu </p>
						<div class="end_module--btn button return"> <a href="#"></a></div>
					</div>
					<div class="end_module--interface">
						<div class="end_module--btn button replay"> <a href="#"></a></div>
						<p class="end_module--text"> Replay </p>
					</div>
				</div>
			</div>

			<!-- Map Module -->
			<div class="map_module module description">
				<div class="description_block">
					<div class="description_img">
					</div>
					<div class="description_textblock">
						<div class="textblock--title">
						</div>
						<div class="textblock--waves">
							<p > <span class="wave-nbr"></span> Waves </p>
							<p> <span class="wave-diff"></span> Level </p>

						</div>
						<div class="textblock--text">
							<p> First stage of the journey, spaces marines arrive on the planet Derivium. They discover it a resource which can potentially save the inhabitants of the Earth. They decide to place a drill there to extract this ore. Everything was quiet, too quiet... An indescribable sound was heard, and suddenly extraterrestrials fell of the sky... And they do not look happy !</p>
						</div>
						<a class="textblock--btn button" href="#">
							<div>
								Play
							</div>
						</a>
					</div>
					<a class="exit-btn button" href="#">
						<div>
							X
						</div>
					</a>
				</div>
			</div>
		</template>

	<script type="text/javascript" src="dist/js/app.js?cb=<?php echo mt_rand(1000, 100000);?>"/></script>

	</body>
</html>
