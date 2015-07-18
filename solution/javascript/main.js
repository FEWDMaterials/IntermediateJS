/* CURRENTLY IN: javascript/main.js */

/*
	var $bod = $('body').css();
*/

function add( a, b ) {
	return a + b;
}

function $() {
	return {

	};
}
//singleton pattern
/**

	VERSION 1

*/
// function $( selector ) {
// 	var _el = document.querySelectorAll( selector ); // this should store dom object of selector
// 	console.log( _el );
// 	return {
// 		_el: document.querySelectorAll( selector ),
// 		css: function( styleName, styleValue ) {
// 			// update the style property of _el
// 			_el[ 0 ].style[ styleName ] = styleValue;

// 			return this;
// 		}
// 	};
// }

// $bod = $('body');
// $div = $('div');
/**

	VERSION 2
*/
// function jQuery( selector ) {
// 	console.log( this );

// 	this._el = document.querySelectorAll( selector );
// 	this.css();
// }

// jQuery.prototype.css = function( styleName, styleValue ) {
// 	// update the style property of _el
// 	this._el[ 0 ].style[ styleName ] = styleValue;

// 	return this;
// }
// console.log( jQuery );
// var $bod = new jQuery('body');
// $bod.css('border', '10px solid black');
// console.log( $bod );


/**
	VERSION 3
		* be able to call like so: $('...')
		* use the prototype, but actually
		* we want private variables !
*/

function foo() {
	var hi;
}
function formValidator() {
	var name;
}

var $ = (function() { // protect the lemmings!

	// hoisting

	var version = '0.0.1';

	// STATIC FUNCTIONS
	_factory.getVersion = function() {
		return version;
	} // getVersion

	_factory.forEach = function( arr, cb ) {
		for ( var i = 0; i < arr.length; ++i ) {
			arr[ i ] = cb( arr[i], i ) || arr[ i ];
		}
	};

	_factory.fn = _factory.prototype;

	function _factory( selector ) {
		var _el;

		function jQuery( selector ) {

			// do a conditional check
			// if HTMLElement ( selector instancof HTMLElement ), then
			// set _el to HTMLElement
			// else, run a document.querySelectorAll

			if ( typeof selector === "string" ) {
				_el = document.querySelectorAll( selector ); 
			}
			else {
				_el = selector;
			}
			
		}

		jQuery.prototype = _factory.prototype;

		jQuery.prototype.css = function( styleName, styleValue ) {
			// update the style property of _el
			
			_factory.forEach( _el, function( currentElem ) {
				currentElem.style[ styleName ] = styleValue;
			});
			
			return this;
		};

		jQuery.prototype.addClass = function() {

			function onEachElement( currentEl ) {
				currentEl.classList.add( this );
			}

			function onEachArg( arg ) {
				_factory.forEach( _el, onEachElement.bind( arg ) );
			}

			_factory.forEach( arguments, onEachArg );

			// for( var i = 0; i < arguments.length; ++i ) {
			// 	console.log( arguments[i] );
			// 	_el[ 0 ].classList.add( arguments[i] );
			// }

			return this;
		}

		jQuery.prototype.click = function( callback ) {
			_el[ 0 ].addEventListener('click', callback );
		}


		return new jQuery( selector );
	}

	return _factory;

})();

$.fn.foo = function() {
	alert('bar');
}

$('body')
	.css('border', '2px solid red')
	.addClass('foo', 'bar', 'baz');
// console.log( $('body') );

$('.foo').css('height', '200px')
		 .css( 'width', '200px')
		 .css('background-color', 'green');

function onClicked() {
	this.bark();
	// console.log( this );
}

var Dog = {
	bark: function() {
		alert('hello');
	}
}
$('body').click( onClicked.bind(Dog) );
		

$(document.getElementsByTagName('body')).css('background-color', 'pink');


function each( arr, cb ) {
	for( var i = 0; i < arr.length; i++ ) {
		cb( arr[i], i, arr );
		console.log( 'arr[ ' + i + ' ] is: ', arr[ i ] );
		console.log( arr[ i ] );
	}
}

var arr = each( [1,2,3], function( el, idx, array ) {
	console.log( el );
	el += 10;
	console.log( el );
	// return el;
});
console.log( arr );

// var arr = [ 1,2,3,4,5 ];
// for( var i = 0; i < arr.length; ++i ) {
// 	arr[ i ] += 10;
// }

// arr = $.each( arr, function() {
// 	// somehow update each value of the array by 10

// });

// $.map();

// $(document.getElementByTagName('body')[0]).foo();

// console.log( $('body').css('border', '1px solid red') ); // { css: function() {} }


// $('body').css('border', '10px solid black')
// 		 .css( 'height', '100px' );

/*
var dog = {
	furColor: 'red'
	bark: function() {
		alert('bark bark');
	}
};

dog.bark();
*/



