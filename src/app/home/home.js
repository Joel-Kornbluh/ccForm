angular.module( 'ccForm.home', [
  'ui.router'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      'main': {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})
.controller( 'HomeCtrl', function HomeController( $scope ) {

})
.controller( 'CCFormCtrl', function( $scope ) {
	
	$scope.cards = [
		{
			type: 'maestro',
			pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
			format: defaultFormat,
			length: [12, 13, 14, 15, 16, 17, 18, 19],
			cvcLength: [3],
			luhn: true
		}, {
			type: 'dinersclub',
			pattern: /^(36|38|30[0-5])/,
			format: defaultFormat,
			length: [14],
			cvcLength: [3],
			luhn: true
		}, {
			type: 'laser',
			pattern: /^(6706|6771|6709)/,
			format: defaultFormat,
			length: [16, 17, 18, 19],
			cvcLength: [3],
			luhn: true
		}, {
			type: 'jcb',
			pattern: /^35/,
			format: defaultFormat,
			length: [16],
			cvcLength: [3],
			luhn: true
		}, {
			type: 'unionpay',
			pattern: /^62/,
			format: defaultFormat,
			length: [16, 17, 18, 19],
			cvcLength: [3],
			luhn: false
		}, {
			type: 'discover',
			pattern: /^(6011|65|64[4-9]|622)/,
			format: defaultFormat,
			length: [16],
			cvcLength: [3],
			luhn: true
		}, {
			type: 'mastercard',
			pattern: /^5[1-5]/,
			format: defaultFormat,
			length: [16],
			cvcLength: [3],
			luhn: true
		}, {
			type: 'amex',
			pattern: /^3[47]/,
			format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
			length: [15],
			cvcLength: [3, 4],
			luhn: true
		}, {
			type: 'visa',
			pattern: /^4/,
			format: defaultFormat,
			length: [13, 16],
			cvcLength: [3],
			luhn: true
		}
	];
	
	$scope.cardFromNumber = function(num) {
		var card, _i, _len;
		num = (num + '').replace(/\D/g, '');
		for (_i = 0, _len = cards.length; _i < _len; _i++) {
			card = cards[_i];
			if (card.pattern.test(num)) {
				return card;
			}
		}
	};

	$scope.cardFromType = function(type) {
		var card, _i, _len;
		for (_i = 0, _len = cards.length; _i < _len; _i++) {
			card = cards[_i];
			if (card.type === type) {
				return card;
			}
		}
	};

	$scope.luhnCheck = function(num) {
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
	
});
