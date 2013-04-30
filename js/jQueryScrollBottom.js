/**
* jQuaryScrollBottom.js
* Plugin Example File
*
* @class ScrollBottom
* @author Keitarou
* @date 2013.4.30
* @constructor
* @param {Array} options
*/
;(function($) {
	$.fn.ScrollBottom = function(options) {
		
		/**
		* @property defaults 
		* @type Object
		*/
		$.fn.ScrollBottom.defaults = {
			lock   : false,
			percent: 0.01,
			limit  : 3,
			count  : 0
		};

		/**
		* @property elements 
		* @type Object
		*/
		var elements = this;

		/**
		* @property options 
		* @type Object
		*/
		var options = $.extend({}, $.fn.ScrollBottom.defaults, options);

		/**
		 * method getOptions
		 *
		 * @method getOptions
		 * @return Object
		 */
		this.getOptions = function(){
			return options;
		}

		/**
		 * method lock
		 * loadng lock!
		 *
		 * @method lock
		 * @return boolean true
		 */
		this.lock = function(){
			return options.lock = true;
		}

		/**
		 * method unlock
		 * loadng unlock!
		 *
		 * @method unlock
		 * @return boolean false
		 */
		this.unlock = function(){
			return options.lock = false;
		}

		elements.each(function() {

			/**
			 * event scroll
			 * Call Event "bottom"
			 *
			 * @event scroll
			 */
			$(this).scroll(function(e){
				
				height = $(this).children().height();
				position = $(this).height() + $(this).scrollTop();
				
				if((height - position) / height <= options.percent){
					if(!options.lock && (!options.limit || options.limit > options.count)){
						$(this).trigger('bottom');
					}
				}
			});

			/**
			 * event bottom
			 *
			 * @event bottom
			 */
			$(this).bind("bottom", function(){
				options.lock = true;
				options.count++;
				if(options.count == options.limit){
					$(this).trigger('final');
				}
			});

			/**
			 * event final
			 *
			 * @event final
			 */
			$(this).bind("final", function(){
			});

		});

		return this;
	};

})(jQuery);