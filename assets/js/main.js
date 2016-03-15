'use strict';

function pieChart(chartClass, barCor, trackCor) {
	$('.chart.' + chartClass).easyPieChart({
		easing: 'easeOutElastic',
		barColor: barCor,
		animate: 3000,
		trackColor: trackCor,
		scaleColor: false,
		lineWidth: 20,
		trackWidth: 16,
		lineCap: 'butt',
		onStep: function(from, to, percent) {
			$(this.el).find('.percent').text(Math.round(percent));
		}
	});
}

(function($) {
	$(function() {
		$(document).foundation();

		$('#myform').on('valid.fndtn.abide', function(e) {
			if (e.namespace != 'abide.fndtn') {
				return;
			}
			$('div.mask-form').fadeIn();
			$.ajax({
				type: 'POST',
				data: {
					'user_name': $('input[name=nome]').val(),
					'user_email': $('input[name=email]').val(),
					'msg': $('textarea[name=mensagem]').val()
				},
				url: 'contact_me.php',
				success: function(response) {
					var data = $.parseJSON(response);
					if(data.resp1.status === 'success' && data.resp2.status === 'success') {
						$('h4.successMsg').hide().html('<i class="fa fa-smile-o"></i> Sua mensagem foi enviada com sucesso!').fadeIn();
					} else {
						$('h4.successMsg').hide().html('<i class="fa fa-frown-o"></i> Ocorreu um erro no envio...tente novamente!').fadeIn();
					}
					setTimeout(function() {
						$('div.mask-form').fadeOut(function() {
							$('h4.successMsg').html('<i class="fa fa-smile-o"></i> Sua mensagem está sendo enviada...aguarde...');
						});
					}, 2000);
					$('input[name=nome]').val('');
					$('input[name=email]').val('');
					$('textarea[name=mensagem]').val('');
				}
			});
		});

		var trueFalse;
		if ($('.owl-carousel .item').length > 1) {
			trueFalse = true;
		} else {
			trueFalse = false;
		}

		if ($.fn.owlCarousel) {
			$('.content > div').owlCarousel({
				loop: trueFalse,
				nav: false,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				items: 1,
				animateOut: 'fadeOut'
			});
		}

		$('.jobs-box a').each(function() {
			$(this).hoverdir();
		});

		var dragged = false;
		$(document).on('click', '.lines-button', function() {
			if (!dragged) {
				if ($(this).hasClass('close')) {
					var counterEl = $('nav.main-menu').children().children('li').length;
					$('nav.main-menu').children().children('li').each(function() {
						var iterateTop = 0;
						$(this).stop(true, true).animate({
							top: iterateTop
						});
						iterateTop -= 65;
						counterEl--;
						if (counterEl === 0) {
							$('nav.main-menu').stop(true, true).animate({
								top: '-65'
							});
						}
					});
					$('nav.main-menu').stop(true, true).fadeOut('fast');
				} else {
					$('nav.main-menu').stop(true, true).fadeIn(0, function() {
						$(this).stop(true, true).animate({
							top: '0'
						});
						var counterEl = $('nav.main-menu').children().children('li').length;
						var iterateTop = 0;
						$(this).children().children('li').each(function() {
							$(this).stop(true, true).animate({
								top: iterateTop
							});
							iterateTop += 65;
							counterEl--;
						});
					});
				}
				$(this).toggleClass('close');
			}
		});

		if ($(document).width() > 500) {
			$('.menu-box').draggable({
				start: function() {
					dragged = true;
				},
				distance: 10,
				stop: function() {
					setTimeout(function() {
						dragged = false;
					}, 10);
				},
				axis: 'y',
				cancel: false,
				containment: '.detalhes'
			});
		}

		$('.main-menu ul li a').on('mouseenter', function() {
			$(this).siblings('span').stop().animate({
				opacity: 1
			}, 'fast');
		});
		$('.main-menu ul li a').on('mouseleave', function() {
			$(this).siblings('span').stop().animate({
				opacity: 0
			}, 'fast');
		});
		var initialTop = $('.menu-box').offset().top,
		viewportH = $(window).height();

		if ($('#skills').length > 0) {
			if (viewportH > $('#skills').offset().top) {
				setTimeout(function() {
					pieChart('chart-html', '#E34F26', '#f3a681');
					pieChart('chart-css', '#0172B8', '#ace');
					pieChart('chart-js', '#E4A226', '#fce7a7');
					pieChart('chart-ps', '#2FCAF4', '#a6ecff');
					pieChart('chart-php', '#6F7CB7', '#ace');
					pieChart('chart-sql', '#DB3B00', '#fbb49a');
				}, 500);
			}
		}

		$(document).scroll(function() {
			if ($(this).scrollTop() > initialTop - 20) {
				$('.menu-box').animate({
					top: ($(this).scrollTop() - initialTop) + 20
				}, 0);
			} else {
				$('.menu-box').animate({
					top: 0
				}, 0);
			}
			if ($('#skills').length > 0) {
				if ($(window).scrollTop() + viewportH > $('#skills').offset().top) {
					setTimeout(function() {
						pieChart('chart-html', '#E34F26', '#f3a681');
						pieChart('chart-css', '#0172B8', '#ace');
						pieChart('chart-js', '#E4A226', '#fce7a7');
						pieChart('chart-ps', '#2FCAF4', '#a6ecff');
						pieChart('chart-php', '#6F7CB7', '#ace');
						pieChart('chart-sql', '#DB3B00', '#fbb49a');
					}, 500);
				}
			}
		});

		// Smooth Anchors
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').stop().animate({
						scrollTop: target.offset().top - 30
					}, 600);
					return false;
				}
			}
		});
	});
}(jQuery));
