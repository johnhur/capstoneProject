angular.module('tweet-vote').controller('CompNewController', ['$scope', '$meteor',
  function($scope, $meteor) {
  
   $scope.competitions = $meteor.collection(Competitions).subscribe("comps")
   $scope.showWinner = false

   $meteor.autorun($scope, function(){
   $scope.userId = Meteor.userId()
   console.log('autorun')

   var data = $scope.getCollectionReactively("competitions") // REACTIVE VARIABLE
   choice1Data = (Competitions.find({_id: $scope.myId}).fetch())
   $scope.myComp = choice1Data

    if (choice1Data.length > 0){
    $scope.choice1Info = choice1Data[0].key1.tweets
    $scope.choice2Info = choice1Data[0].key2.tweets
  
    newScore1 = $scope.choice1Info.length
    newScore2 = $scope.choice2Info.length
    $scope.data = [newScore1, newScore2]  
    }

    $scope.labels = [$scope.userInput1, $scope.userInput2];
    $scope.colours = ['#ead61c','#4d1b7b'];   
    })

    $scope.stopToggle = false // used to show and hide the stop and play button.
    $scope.inputToggle = true

    $scope.createPoll = function(compName, choiceUno, choiceDos){
      $scope.inputToggle = !$scope.inputToggle

      Meteor.call('createPoll', compName, choiceUno, choiceDos, function(err, results){
        if(err) {
          console.log(err)
        } else {
          $scope.myId = results
        }
        console.log($scope.myId);
      })
     };

    $scope.getTweets = function (userId, compName, word1, word2){
      $scope.stopToggle = !$scope.stopToggle
      $meteor.call('getTweets', userId, compName, word1, word2)
    }

    $scope.stopStream = function(myId){
      $scope.showWinner = !$scope.showWinner
      $meteor.call('stopStream', myId)
    }

  }])