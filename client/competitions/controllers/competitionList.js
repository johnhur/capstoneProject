  angular.module('tweet-vote').controller('CompListController', ['$scope', '$meteor',
    function($scope, $meteor) {
     
      // difference between the two?  
      // console.log("$meteor: " + $meteor)
      // console.log("Meteor: " + Meteor)
      $scope.userId = Meteor.userId()

      // $scope.competition = $meteor.collection(Competition)
      // remodeling the data..
      // var data3 = $scope.getCollectionReactively('competition')

      // $scope.myId = ""

      // $scope.testing = function(){
      //    console.log(Competition.find());
      // }
      // $scope.createPoll = function(compName, choiceUno, choiceDos){

      //   Meteor.call('createPoll', compName, choiceUno, choiceDos, function(err, results){
      //     if(err) {
      //       console.log(err)
      //     } else {
      //       $scope.myId = results
      //     }
      //     console.log($scope.myId);
      //   })
      //  };
 $scope.cats = $meteor.collection(Cats).subscribe("kitties")
 $scope.dogs = $meteor.collection(Dogs).subscribe("doggies")

     $meteor.autorun($scope, function(){
       // Meteor.subscribe('graphData1')
       // Meteor.subscribe('graphData2')

       // var data1 = $scope.getCollectionReactively("tweets1")
       // var data2 = $scope.getCollectionReactively("tweets2")

     $scope.getCollectionReactively("cats")
     $scope.getCollectionReactively("dogs")

        // owner key on competition
        // url = competition/:id

        choice1Data = (Cats.find({user: Meteor.userId(), pollName: $scope.competitionName}).fetch()).length
        choice2Data = (Dogs.find({user: Meteor.userId(), pollName: $scope.competitionName}).fetch()).length

        
        console.log("autorun")
        
      newScore1 = choice1Data
      newScore2 = choice2Data


        // if ($scope.competitionName !== null){  

        // $scope.competition = $meteor.collection(function(){
        //   console.log(Competition.find($scope.myId))
        //   return Competition.find($scope.myId, {
        //     key1: $scope.getReactively('key1'),
        //     key2: $scope.getReactively('key2')
        //   })
        // })

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