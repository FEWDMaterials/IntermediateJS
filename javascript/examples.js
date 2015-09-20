/* VERSION 1 */
(function() {	// protect the lemmings!
	/*
	stuff wrong with this code...

		1. lots of hardcoding
		2. can only have one slider...
		3. no generic way to start/stop
		4. everything is globally scoped

	*/

	$('.slider').wrapInner( '<div class="slider__slider"></div>' );

		// grab the slider__item el
	var $sliderItem = $('.slider__item'),
		// outerWidth gets us with width of sliderItem
		width = $sliderItem.outerWidth(),
		// get how many sliderItems we have
		length = $sliderItem.length,
		// compute width of the sliderSlider
		sliderSliderWidth = width * length,
		// select the slider__slider
		$sliderSlider = $('.slider__slider' ),
		shouldStop = false;

	// set the width of the $sliderSlider
	$sliderSlider
		.css('width', sliderSliderWidth + 'px' );

	tick( $sliderSlider, 1 );

	function tick( $el, currentIndex ) {
		console.log('HERE: ', shouldStop );
		$el.animate({
			left: -1 * currentIndex * width + 'px'
		}, {
			duration: 1000,
			easing: "linear",
			complete: function() {

				setTimeout(function() {
					// if ( $('body').attr('stop') === '1' ) return;
					if ( shouldStop === true ) return;

					if ( currentIndex === $sliderItem.length - 1 ) {
						currentIndex = -1;
					}

					tick( $el, ++currentIndex );
				}, 1000);
			}
		});
	}

	$('body').on('click', function() {
		// $( this ).attr('stop', 1 );
		shouldStop = true;
	});


})(); // IIFE

/* VERSION 2 */
// the (revealing) Module Pattern (fill in the blanks)
var Slider = (function() {
	var _slider = {};

	function tick() {
		console.log('yolo');
	}

	var _SOME_PRIVATE_THING_ = 6;

	_slider.init = function() {
		tick();
	};

	_slider.play = function() {
		tick();
	};

	return _slider;
})();

/* VERSION 3 */

var Slider = (function(){

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

	Slider.version = '0.0.1';
	Slider.getSliderTrackWidth = function() {
		console.log('#YOLO');
	}

	return function( options ) {
		return new Slider( options );
	}

})(); 

var s = Slider();




