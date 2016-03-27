  /* globals FB, statusChangeCallback */
  /* exported checkLoginState, connect */
  'use strict';

  function statusChangeCallback(response) {
  	if (response.status === 'connected') {
  		window.authToken = response.authResponse.accessToken;
  		connect();

  	} else if (response.status === 'not_authorized') {
  		console.log("Not authorized!");
		//document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
		if (window.location.href != "https://gntapps.com.br/corrida-food-truck/index.html") {
			window.location="index.html";	
		}
	} else {     	
		//document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
		console.log("Not logged into Facebook!");
		if (window.location.href != "https://gntapps.com.br/corrida-food-truck/index.html") {
			window.location="index.html";	
		}		
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
    appId      : '616038525165019', //Test app: 616404898461715 -> oficial = 616038525165019
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2', // use version 2.2
    frictionlessRequests: true,
    oauth: true
});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

  // Load the SDK asynchronously
  (function(d, s, id) {
  	var js, fjs = d.getElementsByTagName(s)[0];
  	if (d.getElementById(id)) return;
  	js = d.createElement(s); js.id = id;
  	js.src = 'https://connect.facebook.net/pt_BR/sdk.js';
  	fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function connect() {
  	console.log('Buscando informações do usuário.... ');
  	FB.api('/me', function(response) {
  		console.log('Logado para: ' + response.name);

  		$.ajax({
  			url: 'session.php',
  			data: {nome: response.name.replace("'","`"), id_fb: response.id},
  			type: 'POST',
  			context: jQuery('#resultado'),
  			success: function(data){
  				console.log("Sessão armazenada.");
  			}
  		});

  		$('.login-facebook').fadeOut();
  		$('.intro-bt-correr.not-logged').fadeIn();
  		setTimeout(function() {
  						$('.placa-bemvindo h3.name-user').html('Olá, '+response.name).fadeIn('slow');
  					}, 500);
  		


  	});
	//FB.api('/me/picture',  function(response) {
    //    document.getElementById('foto').src = response.data.url;
	//});
  best_score = 3000;
  read_best_score();

}

function webkitss(score) {
	$.ajax({
		url: 'session.php',
		data: {score: score},
		type: 'POST',
		context: jQuery('#resultado'),
		success: function(data){
						//console.log("Sessão ok: " + data);
						console.log("Sessão ok");
					}
				}); 
	if (best_score < score) {
		console.log("New score is higher than best score!");
	} else {
		console.log("New score is lower than best score, submiting!!!");
		FB.api("/me/scores", "POST", { "score": score },
			function (response) {
				if (response && !response.error) {
					/* handle the result */
					console.log(response)				
				} else {
					console.log(response.error)
				}
			}
			);
	}
}

var best_score = 3000;
function read_best_score() {
	console.log("Read score!");
	FB.api("/me/scores", function (response) {
		if (response && !response.error) {
			best_score = response.data[0].score;				
			
			liberar_opcoes(best_score);
			$('.box-melhor-tempo span').html(mask_score(best_score));




			$('.customize-box > p').html('Seu melhor tempo é de <span>'+mask_score(best_score)+'</span>! Você já pode customizar os seguintes itens do seu truck:');
			$('#fast_lap_time_value').html(mask_score(best_score));
		}
	}		
	);
}

function busca_nome() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
	read_best_score();
};

function conectar() {
	FB.init({
		appId      : '616038525165019', //Test app: 616404898461715 -> oficial = 616038525165019
		cookie     : true,  // enable cookies to allow the server to access the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2', // use version 2.2
		frictionlessRequests: true,
		oauth: true
	});

	// Load the SDK asynchronously
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = 'https://connect.facebook.net/pt_BR/sdk.js';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	busca_nome();
}

function liberar_opcoes(score) {
	console.log("Liberar opções!");

	if (score < 2300) {
		$('#cores-custom').hide();
		$('.tag-cores').fadeIn();
	}
	if (score < 2000) {
		$('#adesivo-custom').hide();
		$('.tag-adesivo').fadeIn();
	}
	if (score < 1450) {
		$('#plano-custom').hide();
		$('.tag-planos').fadeIn();
	}
	if (score < 1300) {
		$('#design-custom').hide();
		$('.tag-design').fadeIn();
	}
	if (score < 1200) {
		$('#tipocomida-custom').hide();
		$('.tag-tipo').fadeIn();
	}
}

function mask_score(score) {
	var ms = score.toString().substr(-1,1);
	var sec = score.toString().substr(-3,2);
	var min = score.toString().substr(0, score.toString().length-(sec.length+ms.length));
	return min+':'+sec+'.'+ms;
}

function webkitsss() {
	var session;
	$.ajaxSetup({cache: false})
	$.get('submit.php', function (data) {
		session = data;
		console.log('Sessão: ' + session);
	});
	
}

function desafiar(score) {
	FB.ui({
		method: 'feed',
		title: 'Corrida do Foodtruck!',
		summary: 'Venha correr com a gente!',
		link: 'https://gntapps.com.br/corrida-food-truck/',
		caption: 'Eu terminei a corrida em ' + score + '! Quero ver você bater meu tempo!'
	}, function(response){});
}

function convidar(score) {
	FB.ui({
		method: 'apprequests',
		message: 'Eu terminei a corrida em ' + score + "! Quero ver você bater meu tempo!",
    	//to: friend_ids
	}, 
	function(response, score){
        //handle result
        console.log('Tentativa de request:');
        console.log(response.to);
    }
    );
}
