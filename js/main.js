(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'pe-container' ),
		header = container.querySelector( 'header.pe-header' ),
		loader = new PathLoader( document.getElementById( 'pe-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

	
		window.addEventListener( 'scroll', noscroll );
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	
function startLoading() {
		
		var simulationFn = function(instance) {
			
			var progress = 0;
			var myTimer = setInterval(function() {
				var temp = $('.pace-progress').attr('data-progress-text');
				progress = parseFloat(temp) / 100.00;

				instance.setProgress(progress);

				if (progress == 1) {
					clearInterval(myTimer);
					console.log('Page fully loaded');
					
					if (progress >= 1) {
						classie.remove(container, 'loading');
						classie.add(container, 'loaded');

						var h = $( window ).height();
						
						$('.inner-wrap').css('height', 'auto');
						$('header.index').show();
						$('header.index .innerHeader').show();
						
						$('.fullpage-wrapper').css({
							'height': h+'px',
							'margin-top': 0
						});

						progress = null;

						var onEndHeaderAnimation = function(ev) {
							if (support.animations) {
								if (ev.target !== header) return;
								this.removeEventListener(animEndEventName, onEndHeaderAnimation);
							}

							classie.add(document.body, 'no-preload');
							window.removeEventListener('scroll', noscroll);

				
						};

						if (support.animations) {
							header.addEventListener(animEndEventName, onEndHeaderAnimation);
						} else {
									onEndHeaderAnimation();
						}

						setTimeout(function() {
							$('.pe-header').css({'opacity': 0});
						}, 300);

					}
				}
			}, 80);
		};

	loader.setProgressFn(simulationFn);

	setTimeout(function() {

		classie.remove(container, 'loading');
		classie.add(container, 'loaded');

		var h = $( window ).height();

		$('.pe-header').hide();

		$('.inner-wrap').css('height', 'auto');
		$('header.index').show();
		$('header.index .innerHeader').show();

		$('.fullpage-wrapper').css({
			'height': h+'px',
			'margin-top': 0
		});

		progress = null;

		var onEndHeaderAnimation = function(ev) {
			if (support.animations) {
				if (ev.target !== header) return;
				this.removeEventListener(animEndEventName, onEndHeaderAnimation);
			}

			classie.add(document.body, 'no-preload');
			window.removeEventListener('scroll', noscroll);


		};

		if (support.animations) {
			header.addEventListener(animEndEventName, onEndHeaderAnimation);
		} else {
			onEndHeaderAnimation();
		}
	}, 5000);

}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();

})();