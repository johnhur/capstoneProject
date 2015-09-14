
Tweets = new Mongo.Collection('tweets');

// having a new instance collection, having name and hashes as parameters.. 

if (Meteor.isClient) {

  angular.module('tweet-vote',['angular-meteor']);

  angular.module('tweet-vote').controller('CapStoneCtrl', ['$scope', '$meteor', 
    function($scope, $meteor) {
      $scope.tasks = [
      {text: 'controller working'}
      ];

      $scope.tweets = $meteor.collection(Tweets);

  $scope.getTweets = function (word1, word2){
  	$meteor.call('getTweets', word1, word2, function(err, response){
  		if (err){
        console.log("RESPONSE INVALID")
  			console.log(err)
  		} else {
      console.log("RESPONSE VALID")
  		console.log(response);
  	}
  	});
	  }

  $scope.stopStream = function(){
    $meteor.call('stopStream')
  }

  // $scope.tweets = Session.get("live")
  	// console.log($scope.surfSpots)
}]);

}
if (Meteor.isServer){

Meteor.methods({
	getTweets: function(word1, word2) {
    console.log("******* GETTING TWEETS *****")
      var user = {}
		    stream = T.stream('statuses/filter', { track: [word1, word2] })
        stream.on('tweet', Meteor.bindEnvironment(function (tweet) {
          
          
          // console.log(tweet["entities"]["hashtags"][0].text);
          (tweet["entities"]["hashtags"]).forEach(function(hash){
            if("#" + hash.text == word1){
              user.choice = hash.text
              user.name = tweet["user"]["name"]
              user.text = tweet["text"]
            }
            else if("#" + hash.text == word2){

              user.choice = hash.text
              user.name = tweet["user"]["name"]
              user.text = tweet["text"]
            }
          })
          

          // once I input new search parameters on client, 
          // the user.choice becomes null for all tweets in database. 

            if(user.choice !== null){
            Tweets.insert({
              name: user.name,
              text: user.text,
              choice: user.choice
            });
            user = {}
            }



        }));
  	},
    stopStream: function() {
      stream.stop()
    }

  });

Meteor.startup(function(){
  // code to run on server at startup
  Twit = Meteor.npmRequire('twit');
  T = new Twit({
    consumer_key: "O8oj6DrDmnpfX3vnp22GGNha7",
    consumer_secret: "AbxCwN5OTVmD2TCnaW42dJnPddlhRXemQFO6Wp023ZFeNHi6Uq",
    access_token: "429220099-FqFX3lpEypyiiyfmQPOs1XTqw5DdFJwsJSN0kETn", 
    access_token_secret: "sC76qKyDXJ4XEsSdIGPpvR4oBa2Uox9WLSSoXe3YsGl0X"
  })
  console.log("*****CONNECTED TO TWITTER STREAM*****")
});

}



