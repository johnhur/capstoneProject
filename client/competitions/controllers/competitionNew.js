angular.module('tweet-vote').controller('CompNewController', ['$scope', '$meteor', '$location', '$anchorScroll',
  function($scope, $meteor, $location, $anchorScroll) {

  
   $scope.competitions = $meteor.collection(Competitions).subscribe("comps")
   $scope.showWinner = false
 
   $scope.labels = [$scope.userInput1, $scope.userInput2];
   $scope.colours = ['#ead61c','#4d1b7b'];   

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
    })

    $scope.stopToggle = false // used to show and hide the stop and play button.
    $scope.inputToggle = true



    $scope.createPoll = function(compName, choiceUno, choiceDos){
      $scope.inputToggle = !$scope.inputToggle

      $("#step1").removeClass("active step")
      $("#step1").addClass("step")

      $("#step2").removeClass("disabled step")
      $("#step2").addClass("active step")


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
      $("#step2").removeClass("active step")
      $("#step2").addClass("step")

      $("#step3").removeClass("disabled step")
      $("#step3").addClass("active step")

      $scope.stopToggle = !$scope.stopToggle
      $meteor.call('getTweets', userId, compName, word1, word2)
    }

    $scope.stopStream = function(myId){

      $("#step1").removeClass("step")
      $("#step1").addClass("step")

      $("#step2").removeClass("step")
      $("#step2").addClass("step")

      $("#step3").removeClass("active step")
      $("#step3").addClass("step")

      $scope.showWinner = !$scope.showWinner
      $meteor.call('stopStream', myId)
      // $scope.gotoBottom()
    }

    // $scope.gotoBottom = function() {
    //   $location.hash('bottom');
    //   // $anchorScroll().yOffset = 50;
    // }

    $(".jumper").on("click", function( e ) {
        
        e.preventDefault();

        $("body, html").animate({ 
            scrollTop: $( $(this).attr('href') ).offset().top 
        }, 600);
        console.log("jumper")
    });

  }])