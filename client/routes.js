app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/competitions', {
		templateUrl:'client/competitions/views/cap-stone.ng.html',
		controller: 'CompListController'
	})
	// .when('/competitions/:collectionId', {
	// 	templateUrl:'client/competitions/views/competitions-show.ng.html',
	// 	controller: 'homeController'
	// })
})