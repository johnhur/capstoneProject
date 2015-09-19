 
Meteor.methods({
  createPoll: function(userId, compName, choiceUno, choiceDos){
  //   Choice1.insert({
  //         user: userId,
  //         pollName: compName,
  //         tweeter: "",
  //         text: "",
  //         choice: ""
  //   });
  //   Choice2.insert({
  //         user: userId,
  //         pollName: compName,
  //         tweeter: "",
  //         text: "",
  //         choice: ""
  //   });
  // }

// ******** Using 1 Competition Collection **********
    // s = Competition.insert({
    //      name: compName,
    //      key1: {
    //        word: choiceUno, 
    //        tweets: [] 
    //      },
    //      key2: {
    //        word: choiceDos,
    //        tweets: [] 
    //      }
    //    });
    // console.log(s)
  // console.log("this is s: " + s)
  // return s
  },
	getTweets: function(userId, compName, word1, word2) {

// ********* CODE FOR USING 1 (COMPETITION) COLLECTION ***********
    // Meteor.publish('graphData', function(){
    //               // console.log(Competition.find({_id: myId}))
    //      return Competition.find({_id: myId}).fetch()[0].
    //  })
// ********* CODE FOR USING 1 (COMPETITION) COLLECTION ***********

Meteor.publish('graphData1', function(userId, compName){
              // console.log(Competition.find({_id: myId})) 
     // return Cats.find({user: userId, pollName: compName})

       return Cats.find({}) // for testing reactivity of collection
 })

Meteor.publish('graphData2', function(userId, compName){
              // console.log(Competition.find({_id: myId}))
     return Dogs.find({})
 })

    console.log("******* GETTING TWEETS *****")
// ************** One Collection Code *******************
    // myComp = Competition.find({_id: myId}).fetch() // puts the mongo document into an array format.
// ************** One Collection Code (END) *******************
    // console.log(myComp[0].key1.word)
    // console.log(myComp.key1.word)

      
		    stream = T.stream('statuses/filter', { track: [word1, word2] }) // the search query for twitter's live streaming api. 

        stream.on('disconnect', function (disconnectMessage) {
          console.log("DISCONNECTED")
        })

        stream.on('limit', function (limitMessage) {
          console.log("limit message: " + limitMessage.message)
        })

        stream.on('error', function (error) {
          console.log("error message: " + error.message)
        })
        
        stream.on('tweet', Meteor.bindEnvironment(function (tweet) { // creating a separate scope for meteor to process callback functionality. 
          
          // console.log(tweet["entities"]["hashtags"][0].text);
          (tweet["entities"]["hashtags"]).forEach(function(hash){
            if("#" + hash.text == word1){
              Cats.insert({
                    user: userId,
                    pollName: compName,
                    tweeter: tweet["user"]["name"],
                    text: tweet["text"],
                    choice: hash.text
              });

// ************** Two Collection Code *******************

// ************** Two Collection Code *******************

// ************** One Collection Code *******************
              // var tempTweets = myComp[0].key1.tweets
              // var user = {}
              // user.name = tweet["user"]["name"]
              // user.text = tweet["text"]
              // user.choice = hash.text
              // tempTweets.push(user)

              // Competition.update(myId,{
              //   $set: { key1: {
              //       word: word1, 
              //       tweets: tempTweets
              //       } 
              //     }
              // })
              
              // myComp[0].key1.tweets.push(user)
              // console.log(myComp[0].key1.tweets)
 // ************** One Collection Code (END) *******************

            }
            else if("#" + hash.text == word2){
              Dogs.insert({
                    user: userId,
                    pollName: compName,
                    tweeter: tweet["user"]["name"],
                    text: tweet["text"],
                    choice: hash.text
              })
                //   key1: {
                //     word: "CAT", 
                //     tweets: ["savannah's are cute", "I love blue cats"] 
                //   },
                //   key2: {
                //     word: "dog",
                //     tweets: ["frenchy's rule", "dogs are smelly"]
                //   }
                // })
              }
              console.log(Cats.find({user: Meteor.userId(), pollName: compName}).fetch());
              })

              // Choice2.insert({
              //   name: user.name,
              //   text: user.text,
              //   choice: user.choice,
              //   owner: Meteor.userId()
              // });

              }))
            
          },
          //     Competition.insert({
          //       key1.tweets.push(hash.text)
          //     });
          //   }

                     //  Tweets.insert({
          //   competition_name: exampledId,
          //   word: "cat",
          //   phrase: "cats rule"
          // })
          
          // once I input new search parameters on client, 
          // the user.choice becomes null for all tweets in database. 

            // if(user.choice == null){

            // Choice1.insert({
            //   name: user.name,
            //   text: user.text,
            //   choice: user.choice
            // });
            // user = {}
            // }  
    stopStream: function() {
      stream.stop()
      console.log("stream stopped")
    }
  });



