var homeModule = angular.module( 'ccForm.home', [
	'ui.router',
	'ccForm.core',
	'ngResource'
]);

homeModule.config(['$stateProvider', function( $stateProvider ){
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
}]);

homeModule.factory('PaymentMethods', ['$resource', function($resource){
	
	var paymentMethodUrl = 'http://127.0.0.1/temp/paymentMethods/user/:user';

	return $resource(paymentMethodUrl, {name: 'god'}, null, {stripTrailingSlashes: false});
}]);

homeModule.controller('HomeCtrl', ['$scope', 'PaymentMethods', function( $scope, PaymentMethods ){
	
	$scope.ccInfo = {
		/** @type {?string} */
		cardholderName: 'test',
		
		/** @type {?string} */
		cardNumber: null,

		/** @type {date} */
		expires: '2019-03-12'
	};
}]);