angular.module('tweet-vote').controller('competitionShowController', ['$scope', '$meteor', '$routeParams', '$location',
    function($scope, $meteor, $routeParams, $location) {
    compId = $routeParams.id
    $scope.competitions = $meteor.collection(Competitions).subscribe("comps")

    $meteor.autorun($scope, function(){
    graphData = (Competitions.find({_id: compId}).fetch())

       $scope.choice1Info = graphData[0].key1.tweets
       $scope.choice2Info = graphData[0].key2.tweets
        
      Score1 = $scope.choice1Info.length
      Score2 = $scope.choice2Info.length

      $scope.labels = [$scope.userInput1, $scope.userInput2];
      $scope.data = [Score1, Score2]  
    })
}])