angular.module('tweet-vote').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'client/competitions/views/index.ng.html',
		controller: 'CompIndexController'
	})
	.when('/comps', {
		templateUrl:'client/competitions/views/cap-stone.ng.html',
		controller: 'CompListController'
	})
	.when('/new', {
		templateUrl:'client/competitions/views/new-collection.ng.html',
		controller: 'CompNewController'
	})
	.when('/competitions/:id',{
		templateUrl:'client/competitions/views/show-collection.ng.html',
		controller: 'competitionShowController'
	})
}])