/* globals html2canvas */
/* exported html2canvas, popupwindow */

'use strict';

function setItem(key, value) {
  var data;

  if (key == "text_up") { data = { "text_up" : value } ; sessionStorage.text_up = value; };
  if (key == "text_down") { data = { "text_down" : value }; sessionStorage.text_down= value; };
  if (key == "color") { data = { "color" : value }; sessionStorage.color = value; };
  if (key == "stickers") { data = { "stickers" : value }; sessionStorage.stickers = value; };
  if (key == "background") { data = { "background" : value }; sessionStorage.background = value; };
  if (key == "food_types") { data = { "food_types" : value }; sessionStorage.food_types = value; };
  if (key == "flower") { data = { "flower" : value }; sessionStorage.flower = value; };
  if (key == "eyelashes") { data = { "eyelashes" : value }; sessionStorage.eyelashes = value; };
  if (key == "candy") { data = { "candy" : value }; sessionStorage.candy = value; };
  if (key == "moustache") { data = { "moustache" : value }; sessionStorage.moustache = value; };
  if (key == "horn") { data = { "horn" : value }; sessionStorage.horn = value; };
  
  if (data) {
    $.get( "mural.php", data );
  } else {
     console.log("No data!");
  }
}

function getItem(key, value) {
  if (key == "text_up") return sessionStorage.text_up;
  if (key == "text_down") return sessionStorage.text_down;
  if (key == "color") return sessionStorage.color;
  if (key == "stickers") return sessionStorage.stickers;
  if (key == "background") return sessionStorage.background;
  if (key == "food_types") return sessionStorage.food_types;
  if (key == "flower") return sessionStorage.flower;
  if (key == "eyelashes") return sessionStorage.eyelashes;
  if (key == "candy") return sessionStorage.candy;
  if (key == "moustache") return sessionStorage.moustache;
  if (key == "horn") return sessionStorage.horn;
}

function getItens(id) {
  $.get( "mural.php", { "id_fb" : id, "consulta" : "true" }, 
    function(resultado) {
          build_foodtruck(resultado);

        }
  );

}

function build_foodtruck(data) {
  
  var array = data.split(";")
  //console.log(array);
  sessionStorage.text_up = array[1];
  sessionStorage.text_down = array[2];
  sessionStorage.color = array[3];
  sessionStorage.stickers = array[4];
  sessionStorage.background = array[5];
  sessionStorage.food_types = array[6];
  sessionStorage.flower = array[7];
  sessionStorage.eyelashes = array[8];
  sessionStorage.candy = array[9];
  sessionStorage.moustache = array[10];
  sessionStorage.horn = array[11];

  //Text 1
  var text_up = getItem("text_up");
  if (text_up != 'undefined') {
    $(".lettering").val(text_up);
  }

  //Text 2
  var text_down = getItem("text_down");
  if (text_down != 'undefined') {
    $(".lettering2").val(text_down);
  }

  // text truck
  if ((text_up != 'undefined') || (text_down != 'undefined') ) $(".letteringMirror").html(text_up + "<br>" + text_down);

  // Color
  var usr_choice = getItem("color");
  //console.log("Color: "+usr_choice);
  switch(usr_choice) {    
    case '2':
        setDesign(".bt-azul");
        break;
    case '3':
        setDesign(".bt-rosa");
        break;
    case'4':
        setDesign(".bt-verde");
        break;
    case '5':
        setDesign(".bt-amarelo");
        break;
    default:
  }


  // stickers
  usr_choice = getItem("stickers");
  //console.log("Stickers: "+usr_choice);
  switch(usr_choice) {    
    case '1':
        setDesign(".bt-organico");
        break;
    case '2':
        setDesign(".bt-verao");
        break;
    case'3':
        setDesign(".bt-candies");
        break;
    case '4':
        setDesign(".bt-caveira");
        break;
    default:
  }

  // backgrounds
  usr_choice = getItem("background");
  //console.log("Background: "+usr_choice);
  switch(usr_choice) {    
    case '1':
        setDesign(".bt-rua");
        break;
    case '2':
        setDesign(".bt-praia");
        break;
    case'3':
        setDesign(".bt-parque");
        break;
    case '4':
        setDesign(".bt-estadio");
        break;
    default:
  }

  // food_types
  usr_choice = getItem("food_types");
  //console.log("Food_types: "+usr_choice);
  switch(usr_choice) {    
    case '1':
        setDesign(".bt-tipohotburger");
        break;
    case '2':
        setDesign(".bt-tipoorganico");
        break;
    case'3':
        setDesign(".bt-tipodoces");
        break;
    default:
  }

  //Design
  //console.log("flower = " +getItem("flower"));
  if (getItem("flower") == '1') setDesign(".bt-flores");
  //console.log("eyelashes = " +getItem("eyelashes"));
  if (getItem("eyelashes")  == '1') setDesign(".bt-cilios");
  //console.log("candy = " +getItem("candy"));
  if (getItem("candy") == '1') setDesign(".bt-candy");
  //console.log("moustache = " +getItem("moustache"));
  if (getItem("moustache") == '1') setDesign(".bt-moustache");
  //console.log("horn = " +getItem("horn"));
  if (getItem("horn") == '1') setDesign(".bt-chifres");

}

  function setDesign(button) {

    var getBtName = $(button).attr('class').split('-');
    var btNameLimpo = getBtName[1];
    if(!$(button).parent().hasClass('icon-selected')){
      if($('.'+btNameLimpo).parent().hasClass('design')){
        $('.'+btNameLimpo+' img').css('display','block');
      } else {
        $(button).parent().siblings().removeClass('icon-selected');
        $('.'+btNameLimpo).siblings('li').children().hide();
        $('.'+btNameLimpo+' img').css('display', 'block');        
      }
      $(button).parent().addClass('icon-selected');
    } else {
      if($('.'+btNameLimpo).parent().is('.design, .pattern, .tipocomida')){
        $(button).parent().removeClass('icon-selected');
        $('.'+btNameLimpo+' img').hide();
      }
    }
  }


$(document).ready(function () {

  //texts
  $(".lettering").on('blur', function(e){
    setItem("text_up", this.value);
  }); 

  $(".lettering2").on('blur', function(e){
    setItem("text_down", this.value);
  }); 

  //colors
  $(".bt-preto").on('click', function(e){setItem("color", 1);});
  $(".bt-azul").on('click', function(e){setItem("color", 2);});
  $(".bt-rosa").on('click', function(e){setItem("color", 3);});
  $(".bt-verde").on('click', function(e){setItem("color", 4);});
  $(".bt-amarelo").on('click', function(e){setItem("color", 5);});

  //stickers
  $(".adesivo-custom > li a").on('click', function(e){
    //$(this).parent().hasClass('icon-selected'))
    if (getItem("stickers") != $(this).parent().index()+1) {
      setItem("stickers", $(this).parent().index()+1);      
    } else {
      setItem("stickers", 0);
    }
  });

  //backgrounds
  $(".bt-rua").on('click', function(e){setItem("background", 1);});
  $(".bt-praia").on('click', function(e){setItem("background", 2);});
  $(".bt-parque").on('click', function(e){setItem("background", 3);});
  $(".bt-estadio").on('click', function(e){setItem("background", 4);});

  //food_types
  $(".tipocomida-custom > li a").on('click', function(e){
    //$(this).parent().hasClass('icon-selected'))
    if (getItem("food_types") != $(this).parent().index()+1) {
      setItem("food_types", $(this).parent().index()+1);      
    } else {
      setItem("food_types", 0);
    }
  });
  
  //design  
  $(".bt-flores").on('click', function(e){
    if ($(this).parent().hasClass("icon-selected")) {
      setItem("flower", 1);      
    } else {
      setItem("flower", 0);
    }
  });

  $(".bt-cilios").on('click', function(e){
    if ($(this).parent().hasClass("icon-selected")) {
      setItem("eyelashes", 1);      
    } else {
      setItem("eyelashes", 0);
    }
  });

  $(".bt-candy").on('click', function(e){
    if ($(this).parent().hasClass("icon-selected")) {
      setItem("candy", 1);      
    } else {
      setItem("candy", 0);
    }
  });
  $(".bt-moustache").on('click', function(e){
    if ($(this).parent().hasClass("icon-selected")) {
      setItem("moustache", 1);      
    } else {
      setItem("moustache", 0);
    }
  });
  $(".bt-chifres").on('click', function(e){
    if ($(this).parent().hasClass("icon-selected")) {
      setItem("horn", 1);      
    } else {
      setItem("horn", 0);
    }
  });
});