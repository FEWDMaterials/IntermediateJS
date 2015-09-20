/* CURRENTLY IN: javascript/main.js */

(function( $ ){
	var _DEFAULT_OPTIONS = {
		slideItems: '.slider__item',
		slideTrack: 'slider__slider',
		duration: 1000,
		pauseDuration: 1000,
		easing: 'linear'
		// ******** add an option for slidetrack
	};

	var _SLIDE_TRACK_STYLES = {
		'position': 'relative',
		'box-sizing': 'border-box',
		'left': '0'
	}

	function _setSlideTrack() {
		// ******** implement the slider_slider wrapping code again,
		// 			this time with the this variable stuff
		this.$el.wrapInner( '<div class="' + this.slideTrackLabel + '"></div>' );
		this.$slideTrack = this.$el.find( '.' + this.slideTrackLabel );
	}

	function _updateSlideTrack() {
		// this function will set the width of the slide track
		// also, it will update the length and width of the sliderItems
		var slideTrackStyles = $.extend({}, _SLIDE_TRACK_STYLES, {
			'width': this.getSliderTrackWidth() + 'px'
		});

		this.$slideTrack.css( slideTrackStyles );
	}

	function _tick() {
		this.$slideTrack.animate({
			left: -1 * this.currentIndex * this.getSlideItemsWidth() + 'px'
		}, {
			duration: this.options.duration,
			easing: this.options.easing,
			complete: function() {
				if ( this.shouldStop ) {
					return;
				}

				setTimeout(function() {

					if ( this.currentIndex === this.getSlideItemsLength() - 1 ) {
						this.currentIndex = -1;
					}

					++this.currentIndex;

					_tick.bind(this)();

				}.bind(this), this.options.pauseDuration)

			}.bind( this )
		});
	}

	function Slider( options ) {
		console.log( this );
		var options = this.options = $.extend({}, _DEFAULT_OPTIONS, options);

		if ( typeof options.el === 'undefined' ) {
			throw new Error('el selector not set!');
		}

		this.$el = $( options.el );
		this.$slideItems = this.$el.find( options.slideItems );
		this.slideTrackLabel = options.slideTrack;

		this.currentIndex = 1;
		this.shouldStop = false;

		_setSlideTrack.bind( this )();
		_updateSlideTrack.bind( this )();
		_tick.bind( this )();
	}

	Slider.prototype.getSlideItemsWidth = function() {
		this.slideItemsWidth = this.$slideItems.outerWidth();

		return this.slideItemsWidth;
	}

	Slider.prototype.getSlideItemsLength = function() {
		this.slideItemsLength = this.$slideItems.length;

		return this.slideItemsLength;
	}

	Slider.prototype.getSliderTrackWidth = function() {
		this.slideTrackWidth = this.getSlideItemsWidth() * this.getSlideItemsLength();
		
		return this.slideTrackWidth;
	}

	Slider.prototype.pause = function() {
		this.shouldStop = true;
	}

	Slider.prototype.play = function() {
		if ( this.shouldStop === false ) {
			return;
		}

		this.shouldStop = false;
		_tick.bind( this )();
	}

	Slider.prototype.restart = function() {
		this.currentIndex = 0;
	}

	Slider.prototype.goToSlide = function( n ) {
		this.pause();
		console.log( this.currentIndex );
		this.currentIndex = n;
		this.play();
	}

	Slider.version = '0.0.1';
	Slider.getSliderTrackWidth = function() {
		console.log('#YOLO');
	}

	$.fn.slider = function() {
		var args = [].slice.call( arguments );
		this.each(function(index, $el){
			$el = $( $el );

			if ( typeof args[0] !== "string" ) {
				// then we must create a slider

				var currentOpts = $.extend( {}, {
					el: $el
				}, args[0] );

				$el.data('slider', new Slider( currentOpts ) );
			}
			else {
				if ( typeof $el.data('slider') === "undefined" ) {
					return;
				}
				var methodName = args.shift(),
					sliderObj = $el.data('slider'),
					sliderMethod = sliderObj[ methodName ];

				sliderMethod.apply( sliderObj, args );
			}
		});
	}

})( jQuery );

$('.slider').slider({
	duration: 2000
});

setTimeout(function(){
	console.log('PAUSING YO')
	$('.slider:first-child').slider( 'goToSlide', 0 );	
}, 1500);

// $('.slider').slider( 'restart' );

// $('.slickster').slick('pause')

