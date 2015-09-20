  angular.module('tweet-vote').controller('CompListController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
      // difference between the two?  
      // console.log("$meteor: " + $meteor)
      // console.log("Meteor: " + Meteor)
 $scope.cats = $meteor.collection(Cats).subscribe("kitties")
 $scope.dogs = $meteor.collection(Dogs).subscribe("doggies")

     $meteor.autorun($scope, function(){
      $scope.userId = Meteor.userId()

     $scope.getCollectionReactively("cats")
     $scope.getCollectionReactively("dogs")


        choice1Data = (Cats.find({user: $scope.userId, pollName: $scope.competitionName}).fetch()).length
        choice2Data = (Dogs.find({user: $scope.userId, pollName: $scope.competitionName}).fetch()).length

        $scope.choice1Info = (Cats.find({user: $scope.userId, pollName: $scope.competitionName}).fetch())
        $scope.choice2Info = (Dogs.find({user: $scope.userId, pollName: $scope.competitionName}).fetch())

        console.log("choice1Data: " + choice1Data)
        console.log("choice2Data: " + choice2Data)
        console.log("autorun")
        
      newScore1 = choice1Data
      newScore2 = choice2Data

// ******************* ON CLIENT ******************
// getting poll/user relevant tweet data and not all the tweets in the collections ******************
        // console.log('inside autorun')
        // choice1Data = (Cats.find({user: Meteor.userId(), pollName: $scope.competitionName}).fetch())
        // console.log("choice 1 data: " + choice1Data)
        // choice2Data = (Dogs.find({user: Meteor.userId(), pollName: $scope.competitionName}).fetch())
        // console.log("choice 2 data: " + choice2Data)
        // newScore1 = Competition.find({_id: $scope.myId}).fetch().key2.tweets.length
        //}
// ******************* ON CLIENT ******************
// getting poll/user relevant tweet data and not all the tweets in the collections ******************

        // newScore2 = data.key2.tweets.length
        // } else {

      $scope.labels = [$scope.userInput1, $scope.userInput2];
      $scope.data = [newScore1, newScore2]  
    })

  // modeling data with user id as a key with two different collections. 

  $scope.getTweets = function (userId, compName, word1, word2){
  	$meteor.call('getTweets', userId, compName, word1, word2)
	}

  $scope.stopStream = function(){
    $meteor.call('stopStream')
  }

}])