angular.module('tweet-vote').controller('competitionShowController', ['$scope', '$meteor', '$routeParams',
    function($scope, $meteor, $routeParams) {
    compId = $routeParams.id
    $scope.competitions = $meteor.collection(Competitions).subscribe("comps")

    $scope.colors = ['#ead61c','#4d1b7b'];
    $scope.labels = [$scope.userInput1, $scope.userInput2];

    $meteor.autorun($scope, function(){
    graphData = (Competitions.find({_id: compId}).fetch())
    $scope.mycomp = graphData

      $scope.word1 = graphData[0].key1.word
      $scope.word2 = graphData[0].key2.word

      $scope.choice1Info = graphData[0].key1.tweets
      $scope.choice2Info = graphData[0].key2.tweets
        
      Score1 = $scope.choice1Info.length
      Score2 = $scope.choice2Info.length

      $scope.data = [Score1, Score2]  
      
      if (graphData[0].live == false) {
        if (Score1 > Score2) {
          $scope.winner = $scope.word1
        } else if (Score2 > Score1){
          $scope.winner = $scope.word2
        } else {
          $scope.winner = "DRAW"
        }
      }
    })
    
}])