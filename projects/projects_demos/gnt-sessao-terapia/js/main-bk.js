$(document).ready(function () {
    // Pulsar Ícones
    function pulsate(element) {
        $(element).hover(function () {
            $(this).animate({
                opacity: 1
            }, 500);
            $(this).stop().pulsate();
        }, function () {
            $(element || this).stop().animate({
                opacity: 0
            }, 1000, function () {
                $(this).animate({
                    opacity: 1
                }, 1000, pulsate);
            });
        });
        $(element || this).animate({
            opacity: 0
        }, 1000, function () {
            $(this).animate({
                opacity: 1
            }, 1000, pulsate);
        });
    }

    pulsate('.icon-barco .barco-shine');

    $('.bt-iniciar').click(function (e) {
        $('#left_scroll, #right_scroll').fadeIn();
        $('.slide-inicio').fadeOut();
        e.preventDefault();
    });

    $('.icon-zoom').click(function (e) {
        // $('.zoom-img').fadeIn();
        $('.mask').fadeIn();
        $('.close-bt').delay(500).fadeIn();
        e.preventDefault();
    });
    $('.close-bt').click(function (e) {
        $(this).fadeOut();
        $('.zoom-img').fadeOut();
        $('.mask').fadeOut();
        e.preventDefault();
    });

    $('#iconbarco').click(function (e) {
        $('#boxbarco').addClass('scaled', "easeOutQuart");
        $('#boxbarco').fadeIn();        
        $('#zoombarco').delay(500).fadeIn();
        e.preventDefault();
    });

    var _item = $("#carousel_ul");
    var carouselPosLeft = $("#carousel_ul").offset();
    var _nCliques = _item.find('li').length - 1;
    var _itemNumber = 1;
    var _rightScroll = $('#right_scroll');
    var _leftScroll = $('#left_scroll');
    console.log(carouselPosLeft);
    _rightScroll.click(function (e) {

        if (_itemNumber == _nCliques) {
            return false;
        } else {
            _itemNumber++;
        }

        _leftScroll.removeClass('finish');

        _valor = ((_item.css('left').replace('px', '') * 1) - 455);
        _item.animate({
            left: _valor + "px"
        });

        if (_itemNumber == _nCliques) {
            $(this).toggleClass('finish');
        } else {
            if ($(this).hasClass('finish')) {
                $(this).toggleClass('finish');
            }
        }
    });
    _leftScroll.click(function (e) {
        console.log(_itemNumber);

        if (_itemNumber == 1) {
            return false;
        } else {
            _itemNumber--;
        }

        _rightScroll.removeClass('finish');

        _valor = ((_item.css('left').replace('px', '') * 1) + 455);
        _item.animate({
            left: _valor + "px"
        })

        if (_itemNumber == 1) {
            $(this).toggleClass('finish');
        } else {
            if ($(this).hasClass('finish')) {
                $(this).toggleClass('finish');
            }
        }
    });


    $('.bt-zoom').click(function (e) {
        // $('.img-zoom').fadeIn();
        $('.scroll').fadeOut();
        $('.carousel_ul').fadeOut();
        $('.voltar-bt').fadeIn();
        e.preventDefault();
    });
    $('.voltar-bt').click(function (e) {
        $(this).fadeOut();
        $('.img-zoom, .container-zoom').fadeOut();
        $('.scroll').fadeIn();
        $('.carousel_ul').fadeIn();
        e.preventDefault();
    });


    $('#btcozinha').click(function (e) {
        $('#zoomcozinha').fadeIn();
        e.preventDefault();
    });
    $('#btbarco').click(function (e) {
        $('#zoombarco').fadeIn();
        e.preventDefault();
    });


});

