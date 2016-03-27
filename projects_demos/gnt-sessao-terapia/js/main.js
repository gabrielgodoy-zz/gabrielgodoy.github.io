// Função para ativar os popups
function ativaPopup(selector, popupName) {
    selector.click(function(e) {
        $('.mask').fadeIn();
        $('.close-bt').delay(400).fadeIn();
        $(this).siblings(popupName).addClass('scaled', "easeOutQuart").fadeIn();
        e.preventDefault();
    });
};
$(window).bind("load", function() {
    $('.loadingapp').fadeOut();
});

$(document).ready(function() {
    $('body').prepend('<div class="warning-box" style="color:#333333; padding:20px; background: #ecfaff; border: #d8d8d8 solid 1px; margin: 20px auto; max-width: 750px; font-size: 14px; font-family:Verdana; text-align:center">Este projeto é demonstrativo, por isso certas funcionalidades foram bloqueadas ou removidas.</div>');
    //Controle do Som
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'tel.mp3');

    $.get();

    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);

    $('.play').click(function() {
        audioElement.play();
    });

    $('.stop').click(function() {
        audioElement.pause();
        audioElement.currentTime = 0;
    });

    audioElement.addEventListener("ended", function() {
        $('.icon-sound.stop').hide();
        $('.icon-sound.play').show();
    }, true);


    $('.icon-sound.play').on('click', function() {
        $(this).hide();
        $('.icon-sound.stop').show();
    });
    $('.icon-sound.stop').on('click', function() {
        $(this).hide();
        $('.icon-sound.play').show();
    });

    // Preload Images
    Image1 = new Image(14, 14)
    Image1.src = "img/icon-stop.png"

    // Ativando os popups
    ativaPopup($('#iconCafe'), '.popupCafe');
    ativaPopup($('#iconGeladeira'), '.popupGeladeira');
    ativaPopup($('#iconBarco'), '.popupBarco');
    ativaPopup($('#iconSofa'), '.popupSofa');
    ativaPopup($('#iconLenco'), '.popupLenco');
    ativaPopup($('#iconPoltrona'), '.popupPoltrona');
    ativaPopup($('#iconMesa'), '.popupMesa');
    ativaPopup($('#iconPorta'), '.popupPorta');
    ativaPopup($('#iconJanela'), '.popupJanela');
    ativaPopup($('#iconEstante'), '.popupEstante');


    // Botao inicia aplicação
    $('.bt-iniciar').click(function(e) {
        $('#left_scroll, #right_scroll').fadeIn();
        $('.slide-inicio').fadeOut();
        e.preventDefault();
    });

    // Controle Setas Direita e Esquerda
    var _item = $("#carousel_ul");
    var _rightScroll = $('#right_scroll');
    var _leftScroll = $('#left_scroll');
    var interval;
    _rightScroll.hover(function() {
        $(this).addClass('hover');
        _leftScroll.removeClass('finish');
        var _valor = (_item.css('left').replace('px', '') * 1);
        if (_rightScroll.hasClass("hover") && _valor > -1362) {
            interval = setInterval(function() {
                _valor -= 6;
                _item.css('left', _valor + "px");
                if (_valor == -1362) {
                    clearInterval(interval);
                    $(_rightScroll).addClass('finish');
                };

            }, 10);
        }
    }, function() {
        clearInterval(interval);
        $(this).removeClass('hover');
    });
    _leftScroll.hover(function() {
        $(this).addClass('hover');
        _rightScroll.removeClass('finish');
        var _valor = (_item.css('left').replace('px', '') * 1);
        if (_leftScroll.hasClass("hover") && _valor < 0) {
            interval = setInterval(function() {
                _valor += 6;
                _item.css('left', _valor + "px");
                if (_valor == 0) {
                    clearInterval(interval);
                    $(_leftScroll).addClass('finish');
                };
            }, 10);
        }
    }, function() {
        clearInterval(interval);
        $(this).removeClass('hover');
    });

    // Area clicável que da zomm para a cena ampliada
    $('.bt-zoom').click(function(e) {
        e.preventDefault();
        $('.scroll').fadeOut();
        $('.carousel_ul').fadeOut();
        $('.voltar-bt').fadeIn();
        audioElement.pause();
        audioElement.currentTime = 0;
        $('.icon-sound.stop').hide();
        $('.icon-sound.play').show();
    });

    $('.close-tutorial, .slide-tutorial').click(function(e) {
        e.preventDefault();
        $('.slide-tutorial').fadeOut();
    });

    // Fecha popup do vídeo
    $('.close-bt').click(function(e) {
        $(this).fadeOut();
        $('.zoomPopup').fadeOut();
        $('.mask').fadeOut();
        e.preventDefault();
        $(this).siblings('.popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });

    // Botao sai da cena ampliada e volta pro consultorio
    $('.voltar-bt').click(function(e) {
        $('.mask').fadeOut();
        $('.zoomPopup').fadeOut();
        $(this).fadeOut();
        $('.img-zoom, .container-zoom').fadeOut();
        $('.scroll').fadeIn();
        $('.carousel_ul').fadeIn();
        e.preventDefault();
        $(this).siblings('.zoomPopup').children('.popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        $(this).siblings('.zoomPopup.popup2').children('.popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });

    // Botão leva para a cozinha ampliada
    $('#btcozinha').click(function(e) {
        $('#zoomcozinha').fadeIn();
        e.preventDefault();
    });

    // Botão leva para o barco ampliado
    $('#btbarco').click(function(e) {
        $('#zoombarco').fadeIn();
        e.preventDefault();
    });

    // Botão leva para o cafe ampliado
    $('#btcafe').click(function(e) {
        $('#zoomcafe').fadeIn();
        e.preventDefault();
    });

    // Botão leva para o sofa ampliado
    $('#btsofa').click(function(e) {
        $('#zoomsofa').fadeIn();
        e.preventDefault();
    });

    $('#btjanela').click(function(e) {
        $('#zoomjanela').fadeIn();
        e.preventDefault();
    });

    $('#btestante').click(function(e) {
        $('#zoomestante').fadeIn();
        e.preventDefault();
    });

    // Botão leva para o lenço ampliado
    $('#btlenco').click(function(e) {
        $('#zoomlenco').fadeIn();
        e.preventDefault();
    });

    // Botão leva para a mesa
    $('#btmesa').click(function(e) {
        $('#zoommesa').fadeIn();
        e.preventDefault();
    });

    // Botão leva para a poltrona
    $('#btpoltrona').click(function(e) {
        $('#zoompoltrona').fadeIn();
        e.preventDefault();
    });

    // Botão leva para a porta
    $('#btporta').click(function(e) {
        $('#zoomporta').fadeIn();
        e.preventDefault();
    });
});