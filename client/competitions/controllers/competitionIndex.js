angular.module('tweet-vote').controller('CompIndexController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
 $scope.competitions = $meteor.collection(Competitions)
$scope.series = ['Live', 'Complete']
$scope.colours = ['#ead61c','#4d1b7b'];

$meteor.autorun($scope, function(){ 
var reactive = $scope.getCollectionReactively("competitions")
console.log($scope.competitions)
$scope.data = [[],[]]
arr = []

function getData(){
	$scope.competitions.forEach(function(data){
	console.log(data.name)
	arr.push(data.name);

	if (data.is_live == true) {
		console.log("data is live!")
	$scope.data[0].push(data.key1.tweets.length + data.key2.tweets.length) 
	} else if (data.is_live == false){
		console.log("data is not live!")
	$scope.data[1].push(data.key2.tweets.length + data.key1.tweets.length)
	} else {
		console.log("********* is_live property error ************")
	}
})
	console.log("this is scope.data: " + $scope.data)
}

function graph() {
$scope.labels = arr;
console.log("this is scope.labels: " + $scope.labels)
}
getData()
graph()
})

}])