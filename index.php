<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Just A Game</title>
    <link rel="stylesheet" type="text/css" href="src/css/myCss.css" />
		<link href="https://fonts.googleapis.com/css?family=Titillium+Web:200,400,600,700" rel="stylesheet">
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

						<div class="map map1">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							</div>
							<h3 class="map_title"> Premium </h3>
							<div class="description">
								<div class="description_block">
									<div class="description_img">

									</div>
									<div class="description_textblock">
										<div class="textblock--title">
											<h2> Premium </h2>
										</div>
										<div class="textblock--waves">
											<p> <span> 10 </span> Waves </p>
											<p> <span> Easy </span> Level </p>

										</div>
										<div class="textblock--text">
											<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										</div>
										<a class="textblock--btn buttons" data-name="premium" href="#">
											<div>
												Play
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="map map2">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							</div>
							<h3 class="map_title"> Derivium </h3>
							<div class="description">
								<div class="description_block">
									<div class="description_img">

									</div>
									<div class="description_textblock">
										<div class="textblock--title">
											<h2> Derivium </h2>
										</div>
										<div class="textblock--waves">
											<p> Waves : 10 </p>
										</div>
										<div class="textblock--text">
											<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										</div>
										<a class="textblock--btn buttons" data-name="derivium" href="#">
											<div>
												Play
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="map map3">
							<div class="map_icon">
									<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							</div>
							<h3 class="map_title"> Trilium </h3>
							<div class="description">
								<div class="description_block">
									<div class="description_img">

									</div>
									<div class="description_textblock">
										<div class="textblock--title">
											<h2> Trilium </h2>
										</div>
										<div class="textblock--waves">
											<p> Waves : 10 </p>
										</div>
										<div class="textblock--text">
											<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										</div>
										<a class="textblock--btn buttons" data-name="trilium" href="#">
											<div>
												Play
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="map map4">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							</div>
							<h3 class="map_title"> Strium </h3>
							<div class="description">
								<div class="description_block">
									<div class="description_img">

									</div>
									<div class="description_textblock">
										<div class="textblock--title">
											<h2> Strium </h2>
										</div>
										<div class="textblock--waves">
											<p> Waves : 10 </p>
										</div>
										<div class="textblock--text">
											<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										</div>
										<a class="textblock--btn buttons" data-name="strium" href="#">
											<div>
												Play
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="map map5">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							</div>
							<h3 class="map_title"> Delightium </h3>
							<div class="description">
								<div class="description_block">
									<div class="description_img">

									</div>
									<div class="description_textblock">
										<div class="textblock--title">
											<h2> Delightium </h2>
										</div>
										<div class="textblock--waves">
											<p> Waves : 10 </p>
										</div>
										<div class="textblock--text">
											<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										</div>
										<a class="textblock--btn buttons" data-name="delightium" href="#">
											<div>
												Play
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="map map6">
							<div class="map_icon">
								<img src="./dist/assets/img/icons/icon_map.png" alt="" width="100" height="100">
							</div>
							<h3 class="map_title"> Bloom </h3>
							<div class="description">
								<div class="description_block">
									<div class="description_img">

									</div>
									<div class="description_textblock">
										<div class="textblock--title">
											<h2> Bloom </h2>
										</div>
										<div class="textblock--waves">
											<p> Waves : 10 </p>
										</div>
										<div class="textblock--text">
											<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										</div>
										<a class="textblock--btn buttons" data-name="bloom" href="#">
											<div>
										 		Play
											</div>
										</a>
									</div>
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
				<div class="world" id="world"></div>
				<div class="screen_footer">
					<ul class="footer_nav">
						<li class="footer_nav--item">
							<div class="fragment footer--item">
								<div class="fragment-img">
									<div class="fragment-text">
									</div>
								</div>
							</div>
							<div class="lifes footer--item">
								<div class="life"></div>
								<div class="life"></div>
								<div class="life"></div>
							</div>
						</li>
						<li class="footer_nav--item">
							<div class="drilllifes footer--item"></div>
						</li>
						<li class="footer_nav--item">
							<div class="waves footer--item">
								<p> Waves </p>
							</div>
						</li>
					</ul>
				</div>
			</div>

		</template>

		<!-- Module Template  -->
		<template class="module_template" id="module_template">
			<div class="menu_module module">
				<p> Menu </p>
				<a class="exit button" href="#"> Exit </a>
			</div>
			<div class="state_module module">
				<p class="state_module--text"> Empty </p>
			</div>
			<div class="end_module victory module">
				<h1 class="end_module--title"> Victory </h1>
				<div class="end-module--info fragment">
					<div class="fragment-img">
						<div class="fragment-text">
							100
						</div>
					</div>
				</div>
				<div class="end_module--buttons">
					<div class="end_module--btn button return"> <a href="#" ></a> </div>
					<div class="end_module--btn button replay"> <a href="#" ></a> </div>
				</div>
			</div>
			<div class="end_module defeat module">
				<h1 class="end_module--title"> Defeat </h1>
				<div class="end_module--buttons">
					<div class="end_module--btn button return"> <a href="#"></a></div>
					<div class="end_module--btn button replay"> <a href="#"></a></div>
				</div>
			</div>
		</template>

	<script type="text/javascript" src="dist/js/app.js?cb=<?php echo mt_rand(1000, 100000);?>"/></script>

	</body>
</html>
