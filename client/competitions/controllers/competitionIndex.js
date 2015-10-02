angular.module('tweet-vote').controller('CompIndexController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
$scope.competitionsIndex = $meteor.collection(Competitions)
$scope.series = ['Tweel A', 'Tweel B']
$scope.colours = ['#ead61c','#4d1b7b'];

 $meteor.autorun($scope, function(){ // not triggering when new tweet is pushed into array. 

		$scope.data = [[],[]]
		arr = []
		
		var competitionData = { // object for competition data visualization
			names: [], // array of names for $scope.labels
			choice1: [], // number for $scope.data
		  choice2: [] // number for $scope.data
		}
		// debugger: CAM'S RECOMMENDATION.. 
		var mostPopularTweets = {} // this is for graphing popular tweel choices  *** INCOMPLETE ***
		
		console.log("some change");
		
		var graphData = $scope.getCollectionReactively('competitionsIndex') // REACTIVE VARIABLE: whenever the collection is changed, meteor.autorun is triggered. 

		$scope.competitionsIndex.forEach(function(data){
			competitionData.names.push(data.name); // pushing into object to use for the results on the bar graph. 
			competitionData.choice1.push(data.key1.tweets.length);
			competitionData.choice2.push(data.key2.tweets.length);
			arr = competitionData.names
		})

		$scope.data[0] = competitionData.choice1
		$scope.data[1] = competitionData.choice2
		
		$scope.labels = arr;

 })
// ***************** Additional Graph Visualizations (INCOMPLETE) *********************
	// if (data.is_live == true) {
	// 	mostPopularComps.live.push(data.key1.tweets.length + data.key2.tweets.length); 
	// 	mostPopularComps.complete.push(0);

	// 	if (mostPopularTweets[data.key1.word1]) {
	// 		mostPopularTweets[data.key1.word1] += data.key1.tweets.length
	// 	} else {
	// 		mostPopularTweets[data.key1.word1] = data.key1.tweets.length
	// 	}

	// 	if (mostPopularTweets[data.key2.word2] = data.key2.tweets.length) {
	// 		mostPopularTweets[data.key2.word2] += data.key2.tweets.length
	// 	} else {
	// 		mostPopularTweets[data.key2.word2] = data.key2.tweets.length
	// 	}

	// } else if (data.is_live == false){
	// 	mostPopularComps.live.push(0);
	// 	mostPopularComps.complete.push(data.key2.tweets.length + data.key1.tweets.length);
	// } else {
	// 	console.log("********* is_live property error ************")
	// }

	// arr = mostPopularComps.names
	// $scope.data[0] = mostPopularComps.live
	// $scope.data[1] = mostPopularComps.complete

// 	console.log("this is scope.data[0]: " + $scope.data[0])
// 	console.log("this is scope.data[1]: " + $scope.data[1])
// }

}])