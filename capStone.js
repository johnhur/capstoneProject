Users = new Mongo.Collection('users');

if (Meteor.isClient) {

  angular.module('tweet-vote',['angular-meteor']);

  angular.module('tweet-vote').controller('CapStoneCtrl', ['$scope', '$meteor', 
    function($scope, $meteor) {
      $scope.tasks = [
      {text: 'controller working'}
      ];
      $scope.surfSpots;

  $scope.getSurf = function (){
  	$meteor.call('getSurf', '', function(err, response){
  		if (err){
  			console.log(err)
  		} else {
  		console.log(response);
  		$scope.surfSpots = response
  	}
  	})
	  }
  	// console.log($scope.surfSpots)
  
}]);

}
if (Meteor.isServer){
Meteor.methods({
	getSurf: function() {
		Meteor.http.call("GET", "http://api.spitcast.com/api/spot/all", function(err, response){
  		return response
  	});
	}
})

Meteor.startup(function(){
	// code to run on server at startup

	var Twit = Meteor.npmRequire('twit');

	var T = new Twit({
		consumer_key: "O8oj6DrDmnpfX3vnp22GGNha7",
		consumer_secret: "AbxCwN5OTVmD2TCnaW42dJnPddlhRXemQFO6Wp023ZFeNHi6Uq",
		access_token: "429220099-FqFX3lpEypyiiyfmQPOs1XTqw5DdFJwsJSN0kETn", 
		access_token_secret: "sC76qKyDXJ4XEsSdIGPpvR4oBa2Uox9WLSSoXe3YsGl0X"
	})

	T.get('search/tweets',
	      {
	          q: 'banana since:2015-01-01',
	          count: 100
	      },
	      function(err, data, response) {
	          console.log(data);
	      }
	  );

});
}