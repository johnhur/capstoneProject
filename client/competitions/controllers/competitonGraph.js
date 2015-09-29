angular.module('tweet-vote').controller('CompGraphController', ['$scope', '$meteor',
      function($scope, $meteor) {
       
   $scope.competitions = $meteor.collection(Competitions).subscribe("comps")
       $meteor.autorun($scope, function(){
       $scope.userId = Meteor.userId()

       var data = $scope.getCollectionReactively("competitions")

          choice1Data = (Competitions.find({_id: $scope.myId}).fetch())

          if (choice1Data.length > 0){
          $scope.choice1Info = choice1Data[0].key1.tweets
          $scope.choice2Info = choice1Data[0].key2.tweets
                
          newScore1 = $scope.choice1Info.length
          newScore2 = $scope.choice2Info.length
  
          $scope.labels = [$scope.userInput1, $scope.userInput2];
          $scope.data = [newScore1, newScore2]  
          $scope.colours = ['#ead61c','#4d1b7b'];
      }
      })

    // modeling data with user id as a key with two different collections. 

    $scope.createPoll = function(compName, choiceUno, choiceDos){
      Meteor.call('createPoll', compName, choiceUno, choiceDos, function(err, results){
        if(err) {
          console.log(err)
        } else {
          $scope.myId = results
        }
        console.log($scope.myId);
      })
     };

    $scope.getTweetsC = function (userId, compName, word1, word2){
      $meteor.call('getTweetsC', userId, compName, word1, word2)
    }

    $scope.stopStreamC = function(myId){
      $meteor.call('stopStreamC', myId)
    }

  }])