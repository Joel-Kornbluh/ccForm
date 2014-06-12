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

homeModule.factory('PaymentMethods', ['$resource', '$http', function($resource, $http){
	
	var paymentMethodsPath = 'http://127.0.0.1/temp/paymentMethods/';
	
	/*
	$http({
		url: paymentMethodsPath + 'user/god',
		method: 'GET',
		responseType: 'json',
		transformResponse: function(response){
			return [].concat(response || []);
		}
	}).success(function(response, a,b,c,d){
		console.log(response, a,b(),c,d);
	}).error(function(response, a,b,c,d){
		console.log(response, a,b(),c,d);
	});
	*/

	var get = {
		url: paymentMethodsPath + 'user/:user',
		method: 'GET',
		responseType: 'json',
		isArray: true,
		params: {user: 'god'},
		transformResponse: function(response){ 
			return angular.isArray(response) ? response : []; 
		}
	};

	return $resource(paymentMethodsPath, null, {get: get}, {stripTrailingSlashes: false});
}]);

homeModule.controller('HomeCtrl', ['$scope', 'PaymentMethods', function( $scope, PaymentMethods ){
	
	$scope.focused = function(evt){
		$scope.focusState = angular.element(evt.currentTarget).attr('name');
	};

	var username = 'god';

	$scope.currentCC = {
		/** @type {?string} */
		name: 'Reuven Rivlin',
		
		/** @type {?string} */
		number: '4134506738499560',

		/** @type {?string} */
		cid: '242',

		/** @type {date} */
		expires: '2019-03'
	};

	$scope.savePaymentMethod = function(e){
		
		alert('Thanks!');
		window.qwerty = angular.element(e.currentTarget);
	};

	$scope.savedPaymentMethods = PaymentMethods.get({user: username});
}]);

homeModule.directive('ccFocusState', function(){
	return {
		restrict: 'A',
		link: function(){
			console.log(arguments);
		}
	}
});

homeModule.directive('ccTestInputDir', function(){
	return {

	}
});
