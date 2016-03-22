/**
 * Slider Calculator
 * Multiplier calculator controlled by slider
 * 
 * Usage example:
 *
 * (HTML)
 *
 * Multipliers
 * <div class="bar" data-uom="men"   data-range="1|200" data-out="food+9|chairs+1/2"></div>
 * <div class="bar" data-uom="women" data-range="1|200" data-out="food+5|chairs+1/2"></div>
 *
 * Multiplicands
 * <div id="food" data-uom="g|kg"></div>
 * <div id="chairs"></div>
 *
 * (JS)
 *
 * $('.bar').sliderCalculator();
 *
 *
 * @author Alejandro Moraga <moraga86@gmail.com>
 * @param {Object} options
 * @return {Object} jQuery chain
 */

 $.fn.sliderCalculator = function(options) {
	// Formatting for units of measurement
	var uomTbl = {
		'ml'	: 'm&#8467;',
		'l'		: '&#8467;',
		'm2'	: 'm<sup>2</sup>'
	};
	
	return this.each(function() {
		var settings = $.extend({
			decimal_point: ',',
			thousands_sep: '.',
			min: 0,
			max: 0,
			out: []
		}, options);
		
		var self = $(this);
		
		// Pega os dados de máximo e mínimo no campo "Data-range", de cada sliderCalculator
		if (rng = self.data('range')) {
			settings.min = parseInt(rng.substr(0, rng.indexOf('|')));
			settings.max = parseInt(rng.substr(rng.indexOf('|') + 1));
		}
		

		// Aqui são armazenados em variaveis os elementos do DOM que serão adicionados
		var range = $('<div class="sliderCalculatorRange"></div>').appendTo(self),
		handle = $('<div class="sliderCalculatorHandle"></div>').appendTo(range),
		num = $(''+
			'<div class="sliderCalculatorBarDisplay">'+
			'<div class="sliderCalculatorBarDisplayText">'+
			'<span class="sliderCalculatorBarDisplayCount">'+ settings.min +'</span> '+ (self.data('uom') || '') +
			'</div>'+
			'</div>'
			+'').appendTo(range);
		
		
		// Comeca a lidar com as infos de cada item
		if (self.data('out')) {
			var re = /([^+-]+)([+-][0-9.].*)/;
			
			// split multiplicands
			$.each(self.data('out').split('|'), function(k, v) {
				var matches = re.exec(v),
				o = $('#' + matches[1]);

				if (o.data('value') === undefined)
					o.data('value', 0);

				

				// function to update each multiplicand value
				// n = amount of items added or removed
				o.update = function(n) {

					var val = this.data('value') + eval(n + '*' + matches[2]),
					uom = this.data('uom');

					// the value is storage in data-value
					this.data('value', val);
					
					
					// Formatting
					// ceil
					val = Math.ceil(val);

					if($(this).hasClass('moreliquid')){
						this.html(parseFloat(val) + 250);
					}

					// applies the unit of measure
					if (uom) {
						for (uom = uom.split('|'), uoi=0; uom[uoi + 1] && val / 1000 >= 1; val /= 1000, uoi++);
							uom = ' '+ (uomTbl[uom = uom[uoi]] || uom);
					}
					
					val = (val + '').split('.');
					// thousands separator
					if (val[0].length > 3)
						val[0] = val[0].split('').reverse().join('').split(/(\d{3})/).slice(1).join('.').split('').reverse().join('');

					// separador decimal
					val = val.join(settings.decimal_point);
					
					// updates the element // Aqui entra o numeral em cada item
					// Nesse 'if' eu adiciono 7 brindes a cada criança que foi selecionada
					if ($(this).hasClass('addSeven')){
						this.html(parseFloat(val) + 7);
					} else {
						this.html(val + (uom || ''));
					}
				};
				
				// start
				if (settings.min)
					o.update(settings.min);
				
				settings.out.push(o);
			});
}

var
			// stores the last position
			// used to calculate the difference between positions
			lst = settings.min,
			
			// flag for detecting movement of the cursor
			dragging = false;

			self
			.on('mousedown', function() {
				dragging = true;
			})
			.on('mouseup mouseleave', function() {
				dragging = false;
			})
			.on('mousemove', function(event) {
				if (!dragging)
					return false;
				
				// percentage
				var per = (event.pageX - self.offset().left) / self.width();
				
				// sets zero by proximity
				if (per > 0 && per <= 0.004)
					per = 0;
				
				// amount
				var qt = Math.ceil(per * (settings.max - settings.min) + settings.min);
				
				// difference between positions (last and new)
				var c = qt - lst;
				
				// percentage cannot be negative or greater than 100%
				// and must have difference between last and new position
				if (per < 0 || per > 1 || !c)
					return;
				
				// updates the last position
				lst = qt;
				
				// updates the bar width
				range.width(per * 100 + '%');
				
				// updates the bar total quantity
				num.find('.sliderCalculatorBarDisplayCount').text(qt);
				
				$.each(settings.out, function(k, v) {
					v.update(c);
				});
			});
		});
};