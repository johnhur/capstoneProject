app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl:
		controller:
	})
	.when('/comps', {
		templateUrl:'client/competitions/views/cap-stone.ng.html',
		controller: 'CompListController'
	})
	.when('/competitions', {
		templateUrl:'client/competitions/views/one-collection.ng.html',
		controller: 'CompGraphController'
	})
})