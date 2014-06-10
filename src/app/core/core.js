var ccFormModule = angular.module('ccForm.core', []);

ccFormModule.factory('cards', function() {

	var defaultFormat = /(\d{1,4})/g;
	var defaultInputFormat =  /(?:^|\s)(\d{4})$/;

	var cards = [{
		type : 'maestro',
		pattern : /^(5018|5020|5038|6304|6759|676[1-3])/,
		format : defaultFormat,
		length : [ 12, 13, 14, 15, 16, 17, 18, 19 ],
		cvcLength : [ 3 ],
		luhn : true
	}, {
		type : 'dinersclub',
		pattern : /^(36|38|30[0-5])/,
		format : defaultFormat,
		length : [ 14 ],
		cvcLength : [ 3 ],
		luhn : true
	}, {
		type : 'laser',
		pattern : /^(6706|6771|6709)/,
		format : defaultFormat,
		length : [ 16, 17, 18, 19 ],
		cvcLength : [ 3 ],
		luhn : true
	}, {
		type : 'jcb',
		pattern : /^35/,
		format : defaultFormat,
		length : [ 16 ],
		cvcLength : [ 3 ],
		luhn : true
	}, {
		type : 'unionpay',
		pattern : /^62/,
		format : defaultFormat,
		length : [ 16, 17, 18, 19 ],
		cvcLength : [ 3 ],
		luhn : false
	}, {
		type : 'discover',
		pattern : /^(6011|65|64[4-9]|622)/,
		format : defaultFormat,
		length : [ 16 ],
		cvcLength : [ 3 ],
		luhn : true
	}, {
		type : 'mastercard',
		pattern : /^5[1-5]/,
		format : defaultFormat,
		length : [ 16 ],
		cvcLength : [ 3 ],
		luhn : true
	}, {
		type : 'amex',
		pattern : /^3[47]/,
		format : /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		length : [ 15 ],
		cvcLength : [ 3, 4 ],
		luhn : true
	}, {
		type : 'visa',
		pattern : /^4/,
		format : defaultFormat,
		length : [ 13, 16 ],
		cvcLength : [ 3 ],
		luhn : true
	} ];

	function normalizeDigits(input){
		return (input + '').replace(/\D/g, '');
	}

	var proto = {};

	proto.getCardTypes = function(){
		var cardTypes = [];
		for(i = 0; i < cards.length; i++){
			cardTypes[i] = cards[i]['type'];
		}

		return cardTypes;
	};

	proto.cardFromNumber = function(num) {
		var card, _i, _len;
		num = normalizeDigits(num);
		for (_i = 0, _len = cards.length; _i < _len; _i++) {
			card = cards[_i];
			if (card.pattern.test(num)) {
				return card;
			}
		}
	};

	proto.cardFromType = function(type) {
		var card, _i, _len;
		for (_i = 0, _len = cards.length; _i < _len; _i++) {
			card = cards[_i];
			if (card.type === type) {
				return card;
			}
		}
	};

	proto.formatCardNumber = function(num) {
		var card, length, re, upperLength;

		num = normalizeDigits(num);
		card = proto.cardFromNumber(num);
		length = num.length;
		upperLength = card ? card.length[card.length.length - 1] : 16;

		if (($target.prop('selectionStart') != null)
				&& $target
						.prop('selectionStart') !== value.length) {
			return;
		}
		if (card && card.type === 'amex') {
			re = /^(\d{4}|\d{4}\s\d{6})$/;
		} else {
			re = /(?:^|\s)(\d{4})$/;
		}
		if (re.test(value)) {
			e.preventDefault();
			return $target.val(value + ' '
					+ digit);
		} else if (re.test(value + digit)) {
			e.preventDefault();
			return $target.val(value + digit
					+ ' ');
		}
	};

	proto.luhnCheck = function(num) {
		var digit, digits, odd, sum, _i, _len;
		odd = true;
		sum = 0;
		digits = (num + '').split('').reverse();
		for (_i = 0, _len = digits.length; _i < _len; _i++) {
			digit = digits[_i];
			digit = parseInt(digit, 10);
			if ((odd = !odd)) {
				digit *= 2;
			}
			if (digit > 9) {
				digit -= 9;
			}
			sum += digit;
		}
		return sum % 10 === 0;
	};

	return proto;
});

ccFormModule.provider('test', function(){
	console.log('provider init...');
	
	var SumClass = function(){
		console.log('service init...');
		var sum = 0;

		this.add = function(num){
			return (sum += (parseInt(num) || 1));
		}
	}

	return {
		$get: function(){
			console.log('injector is calling...');
			return new SumClass();
		}
	}
		
});

ccFormModule.directive('ccTestTest', ['cards', 'test', function(cards, test) {
	console.log(test.add(1));
	return {

	};
}]);

ccFormModule.directive('ccCardNumber', ['cards', function(cards) {

	return {
		restrict : 'A',
		require : 'ngModel',
		link : function(scope, element, attrs, ngModel) {

			var cardTypes = cards.getCardTypes();
			console.log(cardTypes);
			scope.currentCardType = '';
			scope.cardClasses = {
				identified: false,
				flipped: false
			};

			scope.$watch('currentCC.number', function(val, old){
				
				var card = cards.cardFromNumber(val);
				var type = card ? card.type : '';
				//console.log(val, old, card, type);
				
				if(type !== scope.currentCardType){
					for(i = 0; i < cardTypes.length; i++){
						scope.cardClasses[cardTypes[i]] = false;
					}

					scope.currentCardType = type;
					scope.cardClasses.identified = type ? true : false;
					if(type){
						scope.cardClasses[type] = true;
					}
				}
			});

			/*
			ngModel.$parsers.push(function(input) {
				console.log(input ? input.replace(/\D/g, '') : '');
				return input;
			});

			ngModel.$formatters.push(function(data) {
				console.log(data);
				return data;
				//return data + 'oops...';
			});
			*/

			hasTextSelected = function($target) {
				var _ref;
				if (($target.prop('selectionStart') != null)
						&& $target
								.prop('selectionStart') !== $target
								.prop('selectionEnd')) {
					return true;
				}
				if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref
						.createRange().text
						: void 0
						: void 0
						: void 0) {
					return true;
				}
				return false;
			};

			reFormatCardNumber = function(e) {
				return setTimeout((function(_this) {
					return function() {
						var $target, value;
						$target = $(e.currentTarget);
						value = $target.val();
						value = $.payment.formatCardNumber(value);
						return $target.val(value);
					};
				})(this));
			};

			formatCardNumber = function(e) {
				var $target, card, digit, length, re, upperLength, value;
				digit = String.fromCharCode(e.which);
				if (!/^\d+$/.test(digit)) {
					return;
				}
				$target = $(e.currentTarget);
				value = $target.val();
				card = cardFromNumber(value + digit);
				length = (value.replace(/\D/g, '') + digit).length;
				upperLength = 16;
				if (card) {
					upperLength = card.length[card.length.length - 1];
				}
				if (length >= upperLength) {
					return;
				}
				if (($target.prop('selectionStart') != null)
						&& $target
								.prop('selectionStart') !== value.length) {
					return;
				}
				if (card && card.type === 'amex') {
					re = /^(\d{4}|\d{4}\s\d{6})$/;
				} else {
					re = /(?:^|\s)(\d{4})$/;
				}
				if (re.test(value)) {
					e.preventDefault();
					return $target.val(value + ' '
							+ digit);
				} else if (re.test(value + digit)) {
					e.preventDefault();
					return $target.val(value + digit
							+ ' ');
				}
			};

			formatBackCardNumber = function(e) {
				var $target = $(e.currentTarget),
					value = $target.val();

				if (e.meta) {
					return;
				}

				if (e.which !== 8) {
					return;
				}

				if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
					return;
				}

				if (/\d\s$/.test(value)) {
					e.preventDefault();
					return $target.val(value.replace(/\d\s$/, ''));
				} else if (/\s\d?$/.test(value)) {
					e.preventDefault();
					return $target.val(value.replace(/\s\d?$/, ''));
				}
			};

			formatExpiry = function(e) {
				var $target, digit, val;
				digit = String.fromCharCode(e.which);
				
				if (!/^\d+$/.test(digit)) {
					return;
				}
				
				$target = $(e.currentTarget);
				val = $target.val() + digit;
				
				if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
					e.preventDefault();
					return $target.val("0" + val + " / ");
				} else if (/^\d\d$/.test(val)) {
					e.preventDefault();
					return $target.val("" + val + " / ");
				}
			};

			formatForwardExpiry = function(e) {
				var $target, digit, val;
				digit = String.fromCharCode(e.which);
				
				if (!/^\d+$/.test(digit)) {
					return;
				}
				
				$target = $(e.currentTarget);
				val = $target.val();
				
				if (/^\d\d$/.test(val)) {
					return $target.val("" + val + " / ");
				}
			};

			formatForwardSlash = function(e) {
				var $target, slash, val;
				slash = String.fromCharCode(e.which);
				if (slash !== '/') {
					return;
				}
				$target = $(e.currentTarget);
				val = $target.val();
				if (/^\d$/.test(val) && val !== '0') {
					return $target.val("0" + val + " / ");
				}
			};

			formatBackExpiry = function(e) {
				var $target, value;
				if (e.meta) {
					return;
				}
				$target = $(e.currentTarget);
				value = $target.val();

				if (e.which !== 8) {
					return;
				}

				if (($target.prop('selectionStart') != null)
						&& $target
								.prop('selectionStart') !== value.length) {
					return;
				}

				if (/\d(\s|\/)+$/.test(value)) {
					e.preventDefault();
					return $target.val(value.replace(/\d(\s|\/)*$/, ''));
				} else if (/\s\/\s?\d?$/.test(value)) {
					e.preventDefault();
					return $target.val(value.replace(/\s\/\s?\d?$/, ''));
				}
			};

			restrictNumeric = function(e) {
				var input;
				if (e.metaKey || e.ctrlKey) {
					return true;
				}
				if (e.which === 32) {
					return false;
				}
				if (e.which === 0) {
					return true;
				}
				if (e.which < 33) {
					return true;
				}
				input = String.fromCharCode(e.which);
				return !!/[\d\s]/.test(input);
			};

			restrictCardNumber = function(e) {
				var $target, card, digit, value;
				$target = $(e.currentTarget);
				digit = String.fromCharCode(e.which);
				
				if (!/^\d+$/.test(digit)) {
					return;
				}

				if (hasTextSelected($target)) {
					return;
				}

				value = ($target.val() + digit).replace(/\D/g, '');
				card = cardFromNumber(value);
				
				if (card) {
					return value.length <= card.length[card.length.length - 1];
				} else {
					return value.length <= 16;
				}
			};

			restrictExpiry = function(e) {
				var $target, digit, value;
				$target = $(e.currentTarget);
				digit = String.fromCharCode(e.which);
				
				if (!/^\d+$/.test(digit)) {
					return;
				}
				
				if (hasTextSelected($target)) {
					return;
				}
				value = $target.val() + digit;
				value = value.replace(/\D/g, '');
				
				if (value.length > 6) {
					return false;
				}
			};

			restrictCVC = function(e) {
				var $target, digit, val;
				$target = $(e.currentTarget);
				digit = String.fromCharCode(e.which);
				if (!/^\d+$/.test(digit)) {
					return;
				}
				if (hasTextSelected($target)) {
					return;
				}
				val = $target.val() + digit;
				return val.length <= 4;
			};

		}
	};
}]);

ccFormModule.directive('ccCard', ['cards', function(cards) {

	return {
		restrict : 'A',
		templateUrl: 'core/card.tpl.html'
	}
}]);

ccFormModule.filter('cardNumber', ['cards', function(cards){

	return function(input){
		if(!input) return '&#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022;';
		return input.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ');
	}
}]);

ccFormModule.filter('cidNumber', function(){
	return function(input){
		return input; //'&#x2022;&#x2022;&#x2022&#x2022;;';
	}
});

ccFormModule.filter('expirationDate', function(){
	return function(input){
		return input;//'&#x2022;&#x2022; / &#x2022;&#x2022;';
	}
});