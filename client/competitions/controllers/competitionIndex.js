angular.module('tweet-vote').controller('CompIndexController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
$scope.competitions = $meteor.collection(Competitions).subscribe('comps')
$scope.series = ['', '']
$scope.colours = ['#ead61c','#4d1b7b'];

$meteor.autorun($scope, function(){ 
$scope.data = [['tweel A'],['tweel B']]
arr = []

var graphData = $scope.getCollectionReactively('competitions')

// making unique graph data visualizations. 
var mostPopularComps = {
	names: [], // array of names for $scope.labels
	live: [], // number for $scope.data
  complete: [] // number for $scope.data
}



var mostPopularTweets = {}
// function getData(){
	
$scope.competitions.forEach(function(data){
// 	console.log(data.name)
	mostPopularComps.names.push(data.name); // graphs most popular competitions in application. 

	if (data.is_live == true) {
		mostPopularComps.live.push(data.key1.tweets.length + data.key2.tweets.length); 
		mostPopularComps.complete.push(0);

		if (mostPopularTweets[data.key1.word1]) {
			mostPopularTweets[data.key1.word1] += data.key1.tweets.length
		} else {
			mostPopularTweets[data.key1.word1] = data.key1.tweets.length
		}

		if (mostPopularTweets[data.key2.word2] = data.key2.tweets.length) {
			mostPopularTweets[data.key2.word2] += data.key2.tweets.length
		} else {
			mostPopularTweets[data.key2.word2] = data.key2.tweets.length
		}


	} else if (data.is_live == false){
		mostPopularComps.live.push(0);
		mostPopularComps.complete.push(data.key2.tweets.length + data.key1.tweets.length);
	} else {
		console.log("********* is_live property error ************")
	}

	arr = mostPopularComps.names
	$scope.data[0] = mostPopularComps.live
	$scope.data[1] = mostPopularComps.complete

})
// 	console.log("this is scope.data[0]: " + $scope.data[0])
// 	console.log("this is scope.data[1]: " + $scope.data[1])
// }

function graph() {
$scope.labels = arr;
console.log("this is scope.labels: " + $scope.labels)
}

var reactive = $scope.getCollectionReactively("competitions")
console.log($scope.competitions)

// getData()
graph()
})

}])