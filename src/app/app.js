angular.module( 'ccForm', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ccForm.home'
])
.config(['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ){
  $urlRouterProvider.otherwise( '/home' );
}])
.controller('AppCtrl', ['$scope', '$location', function( $scope, $location ){
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | CC Form' ;
    }
  });
}]);

