function popupwindow(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

(function($) {

    $('body').prepend('<div class="warning-box" style="color:#333333; padding:20px; background: #ecfaff; border: #d8d8d8 solid 1px; margin: 20px auto; max-width: 750px; font-size: 14px; font-family:Verdana; text-align:center">This is a demo, and for that reason certain functionalities may not work as expected.</div>');
   	//DOM Ready
   	// Anula de forma 'fake' os dados de cada item ao clicar
   	$('.sliderCalculatorMultiplicand').on('click', function(){
   		if($(this).is('.minialmoco, .minisanduiche, .minipizza') && !$(this).hasClass('itemoff')){
   			$(this).addClass('itemoff');
            $('.item-close', this).remove();
            if($('.minialmoco').hasClass('itemoff') && $('.minisanduiche').hasClass('itemoff') && $('.minipizza').hasClass('itemoff')) {
             $('.maissalgadinhofrito, .maissalgadinhoassado').show();
             $('.salgadinhofrito, .salgadinhoassado').css('visibility', 'hidden');
             if (!$('.salgadinhofrito').hasClass('itemoff')) {
              $('.maissalgadinhofrito').removeClass('itemoff');
              $(this).append('<div class="item-close"></div>');
              $('.item-close', this).fadeIn('fast');
              $('.maissalgadinhofrito .sliderCalculatorDisplayOff').remove();
           } else {
              $('.maissalgadinhofrito').addClass('itemoff');
              $('.item-close', this).remove();
              $('.maissalgadinhofrito').append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
              $('.maissalgadinhofrito').css('visibility', 'visible');
           }
           if (!$('.salgadinhoassado').hasClass('itemoff')) {
              $('.maissalgadinhoassado').removeClass('itemoff');
              $(this).append('<div class="item-close"></div>');
              $('.item-close', this).fadeIn('fast');
              $('.maissalgadinhoassado .sliderCalculatorDisplayOff').remove();
           } else {
              $('.maissalgadinhoassado').addClass('itemoff');
              $('.item-close', this).remove();
              $('.maissalgadinhoassado').append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
              $('.maissalgadinhoassado').css('visibility', 'visible');
           }
        }
     } else if ($(this).is('.minialmoco, .minisanduiche, .minipizza') && $('.minialmoco, .minisanduiche, .minipizza').filter('.itemoff').length === 3) {
      $('.salgadinhofrito, .salgadinhoassado').css('visibility', 'visible');
      if(!$('.maissalgadinhofrito').hasClass('itemoff')) {
       $('.maissalgadinhofrito').hide();
       $('.salgadinhofrito').removeClass('itemoff');
       $(this).append('<div class="item-close"></div>');
       $('.item-close', this).fadeIn('fast');
       $('.salgadinhofrito .sliderCalculatorDisplayOff').remove();
    } else {
       $('.maissalgadinhofrito').hide();
       $('.salgadinhofrito').addClass('itemoff');
       $('.item-close', this).remove();
       $('.salgadinhofrito').append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
       $('.salgadinhofrito').css('visibility', 'visible');
    }
    if (!$('.maissalgadinhoassado').hasClass('itemoff')) {
       $('.maissalgadinhoassado').hide();
       $('.salgadinhoassado').removeClass('itemoff');
       $(this).append('<div class="item-close"></div>');
       $('.item-close', this).fadeIn('fast');
       $('.salgadinhoassado .sliderCalculatorDisplayOff').remove();
    } else {
       $('.maissalgadinhoassado').hide();
       $('.salgadinhoassado').addClass('itemoff');
       $('.item-close', this).remove();
       $('.salgadinhoassado').append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
       $('.salgadinhoassado').css('visibility', 'visible');
    }
    $(this).removeClass('itemoff');
    $(this).append('<div class="item-close"></div>');
    $('.item-close', this).fadeIn('fast');
 } else if ($(this).hasClass('maissalgadinhofrito') || $(this).hasClass('maissalgadinhoassado')) {
   if (!$(this).hasClass('itemoff')){
    $(this).addClass('itemoff');
    $('.item-close', this).remove();
    $(this).append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
 } else {
    $(this).removeClass('itemoff');
    $(this).append('<div class="item-close"></div>');
    $('.item-close', this).fadeIn('fast');
    $('.sliderCalculatorDisplayOff', this).remove();
 }
} else if ($(this).hasClass('suco')) {
   if (!$(this).hasClass('itemoff')){
    $(this).addClass('itemoff');
    $('.item-close', this).remove();
    $(this).append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
    $('.maisrefri').show();
    $('.refrigerante').css('visibility', 'hidden');
 } else {
    $(this).removeClass('itemoff');
    $(this).append('<div class="item-close"></div>');
    $('.item-close', this).fadeIn('fast');
    $('.sliderCalculatorDisplayOff', this).remove();
    $('.maisrefri').hide();
    $('.refrigerante').css('visibility', 'visible');
 }
} else if ($(this).hasClass('refrigerante')) {
   if (!$(this).hasClass('itemoff')){
    $(this).addClass('itemoff');
    $('.item-close', this).remove();
    $(this).append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
    $('.maissuco').show();
    $('.suco').css('visibility', 'hidden');
 } else {
    $(this).removeClass('itemoff');
    $(this).append('<div class="item-close"></div>');
    $('.item-close', this).fadeIn('fast');
    $('.sliderCalculatorDisplayOff', this).remove();
    $('.maissuco').hide();
    $('.suco').css('visibility', 'visible');
 }
} else if ($(this).hasClass('maissuco')) {
   $(this).hide();
   $('.refrigerante').removeClass('itemoff');
   $(this).append('<div class="item-close"></div>');
   $('.item-close', this).fadeIn('fast');
   $('.refrigerante .sliderCalculatorDisplayOff').remove();
   $('.suco').css('visibility', 'visible');
} else if ($(this).hasClass('maisrefri')) {
   $(this).hide();
   $('.suco').removeClass('itemoff');
   $(this).append('<div class="item-close"></div>');
   $('.item-close', this).fadeIn('fast');
   $('.suco .sliderCalculatorDisplayOff').remove();
   $('.refrigerante').css('visibility', 'visible');
} else if (!$(this).hasClass('itemoff')){
   $(this).addClass('itemoff');
   $('.item-close', this).remove();
   $(this).append('<div class="sliderCalculatorDisplayOff"><span>0</span></div>');
} else {
   $(this).removeClass('itemoff');
   $(this).append('<div class="item-close"></div>');
   $('.item-close', this).fadeIn('fast');
   $('.sliderCalculatorDisplayOff', this).remove();
}
});

      // Exibe o botao de close
      $('.sliderCalculatorMultiplicand').hover(function(){
         if(!$(this).hasClass('itemoff') && !$(this).children().hasClass('.item-close')) {
            $(this).append('<div class="item-close"></div>');
            $('.item-close', this).fadeIn('slow');
         }
      }, function() {
         if ($('.item-close', this).length > 0){
            $('.item-close', this).stop(true, true).fadeOut(200, function() { $(this).remove();});
         }
      });


      // Remover Headers antes de dar print
      var _print = window.print;
      $('.sliderCalculatorButton').on('click', function(e){
         e.preventDefault();
         if($('.sliderCalculatorMultiplicand.suco').css('visibility') === 'hidden'){
            $('.sliderCalculatorMultiplicand.suco').css('display', 'none');
         }
         if($('.sliderCalculatorMultiplicand.salgadinhoassado').css('visibility') === 'hidden'){
            $('.sliderCalculatorMultiplicand.salgadinhoassado').css('display', 'none');
         }
         if($('.sliderCalculatorMultiplicand.salgadinhofrito').css('visibility') === 'hidden'){
            $('.sliderCalculatorMultiplicand.salgadinhofrito').css('display', 'none');
         }

         $('.sliderCalculatorMultiplicands').each(function(){
            console.log($(this).children('.sliderCalculatorMultiplicand').length);
            console.log($(this).children('.itemoff').length);
            if($(this).children('.sliderCalculatorMultiplicand').length === $(this).children('.itemoff')){
               $(this).siblings('.for-print').css('display', 'none');
            }
         });

         _print();
         $('.sliderCalculatorMultiplicand.salgadinhofrito').css('display', 'block');
         $('.sliderCalculatorMultiplicand.suco').css('display', 'block');
         $('.sliderCalculatorMultiplicand.salgadinhoassado').css('display', 'block');
      });

   // do stuff

	// Facebook
	var urlApp = 'http://www.gnt.globo.com/maes-e-filhos/infograficos/como-calcular-os-doces-salgados-e-brindes-para-uma-festa-infantil.htm';
	$('.facebook').click(function(e){
		e.preventDefault();
		FB.ui(
		{
			method: 'feed',
			link: urlApp,
			name: 'Eu usei a Calculadora de Festas do “Fazendo a Festa”!',
			picture: 'http://www.apps.blogfarm.com.br/gnt-calculadora-festas/images/ImageShare.jpg',
			description: 'Calcule você também a quantidade de comidinhas, bebidas, doces e brindes de acordo com o número de convidados. Não deixe faltar nada na sua festa!',
			message: 'Mensagem'
		});
	});

	// Twitter
	var twitterMsg = 'https://twitter.com/intent/tweet?text=Calcule a quantidade de comidinhas, bebidas, doces e brindes para a sua festa. %23FazendoaFestaNoGNT http://goo.gl/CPCPX0';

	$('.twitter').attr('href', twitterMsg);

	$('.twitter').click(function(e) {
		e.preventDefault();
		popupwindow(this.href, 'Twitter', 600, 300);
	});


})(jQuery);
