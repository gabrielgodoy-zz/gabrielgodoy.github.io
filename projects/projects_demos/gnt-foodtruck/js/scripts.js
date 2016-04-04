/* globals html2canvas */
/* exported html2canvas, popupwindow */

'use strict';

$(window).bind("load", function() {
  $('.loadingapp').fadeOut();
});

// Popup Twitter
function popupwindow(url, title, w, h) {
  var left = (screen.width / 2) - (w / 2);
  var top = (screen.height / 2) - (h / 2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}
function updateCountdown() {
  var remaining = 12 - jQuery('.lettering').val().length;
  jQuery('.countdown').text(remaining + '');

  var remaining2 = 12 - jQuery('.lettering2').val().length;
  jQuery('.countdown2').text(remaining2 + '');
}

$(document).ready(function () {

  $('body').prepend('<div class="warning-box" style="color:#333333; padding:20px; background: #ecfaff; border: #d8d8d8 solid 1px; margin: 20px auto; max-width: 750px; font-size: 14px; font-family:Verdana; text-align:center">This is a demo, and for that reason certain functionalities may not work as expected.</div>');

  // function fb_prompt(default_msg) {
  //   var message = prompt("Compartilhe seu Food truck com seus amigos!\n\* Clicando em “Ok” você estará consentindo\nem postar a imagem do Food Truck no\nseu perfil do Facebook.\n\n\nDigite uma mensagem para seus amigos:", default_msg);

  //   if (message != null) {
  //     console.log("Postando imagem...");
  //     PostImageToFacebook(window.authToken, message);
  //   }
  // }
  //setTimeout(fb_prompt("Vejam o meu Foodtruck! O que está esperando? Venha fazer o seu também!"), 2000);

  $('.compartilhar-foto').on('click', function (e) {
    e.preventDefault();
    $('.img-preview').remove();
    $('.share-mask').fadeIn();
    $('.input-share').val('');

    html2canvas($('.foodtruck-quadro'), {

      onrendered: function (canvas) {

        document.body.appendChild(canvas);
        $('canvas').attr('id', 'teste');
        var img = document.getElementById('teste').toDataURL('image/png');
        // Append imagem no Body
        $('.bt-confirmar').before('<img src="' + img + '" class="img-preview"/>');
      }

    });

  });

  //Cria um canvas para gerar a imagem a ser compartilhada no fb.
  $('.bt-confirmar').on('click',function(e){
    $('.share-box').hide();
    e.preventDefault();
    console.log("Novo método! já autenticado!");
    var message = $('.input-share').val();
    message = message+"\n\nEu joguei o game \"Corrida do Food Truck\", do GNT, e customizei meu truck. Vença a corrida, customize seu truck e desafie seus amigos! \n\nJogue agora: http://bit.ly/CorridaFoodTruckABatalhaDoGNT"
    html2canvas($('.foodtruck-quadro')).then(function (canvas) {
      document.body.appendChild(canvas);
      $('canvas').attr('id', 'teste');
      console.log("Dando alguns segundos para montar canvas...");
      PostImageToFacebook(window.authToken, message);
    });
    $('.title-confirmation').fadeIn();
    setTimeout(function() {
      $('.share-mask, .title-confirmation').fadeOut();
      $('.share-box').fadeIn('');
      $('canvas').remove();
    }, 1500);
  });

  $('.bt-cancelar').on('click', function(e){
    $('canvas').remove();
    e.preventDefault();
    $('.share-mask').fadeOut();
  });


  $('.bt-begin').on('click', function(e){
    e.preventDefault();
    $(this).addClass('canBegin');
    $('.box-instrucoes').fadeOut();
  });
  if ($('section').is('.faixa-mural')){
    updateCountdown();
  }
  $('.lettering, .lettering2').change(updateCountdown);
  $('.lettering, .lettering2').keyup(updateCountdown);
  $('.lettering, .lettering2').bind('keypress keyup blur', function() {
    var firstLineEmpty = ($('.lettering').val()?'<br/>':'');
    $('.letteringMirror').html($('.lettering').val()+firstLineEmpty+$('.lettering2').val().replace(/ /g, '&nbsp;'));
  });

  $('.bt-desafiar-conclusion').on('click', function(){
    //desafiar($(".time-result").html());
    convidar($(".time-result").html());
  });


  $('.box-custom > ul li a').on('click', function(e){
    e.preventDefault();
    // Pegar nome do botão limpo
    var getBtName = $(this).attr('class').split('-');
    var btNameLimpo = getBtName[1];
    if(!$(this).parent().hasClass('icon-selected')){
      if($('.'+btNameLimpo).parent().hasClass('design')){
        $('.'+btNameLimpo+' img').css('display','block');
      } else {
        $(this).parent().siblings().removeClass('icon-selected');
        $('.'+btNameLimpo).siblings('li').children().hide();
        $('.'+btNameLimpo+' img').css('display', 'block');
      }
      $(this).parent().addClass('icon-selected');
    } else {
      if($('.'+btNameLimpo).parent().is('.design, .pattern, .tipocomida')){
        $(this).parent().removeClass('icon-selected');
        $('.'+btNameLimpo+' img').hide();
      }
    }
  });

});
