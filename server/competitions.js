    // Meteor.publish("kitties", function(){
    //  return Cats.find();
    // })
    // Meteor.publish("doggies", function(){
    //  return Dogs.find();
    // })
    // Meteor.publish("comps", function(){
    //  return Competitions.find();
    // })

Meteor.methods({
  createPoll: function(compName, choiceUno, choiceDos){
    competitionId = Competitions.insert({
         name: compName,
         is_live: true,
         createdAt: new Date(),
         owner: Meteor.userId(),
         count: 0,
         key1: {
           word: choiceUno, 
           tweets: [] 
         },
         key2: {
           word: choiceDos,
           tweets: [] 
         }
       });
  console.log("this is the competition ID: " + competitionId)
  return competitionId
  },

  getTweets: function(myId, compName, word1, word2) {
    console.log("******* GETTING TWEETS *****")
     myComp = Competitions.find({_id: myId}).fetch() 
     // console.log(myComp) // puts the mongo document into an array format.       
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
         
           var arr2 = []
           var arr = []
           if("#" + hash.text == word1){
             var tempTweets = myComp[0].key1.tweets
             var user = {}

             user.name = tweet["user"]["name"]
             user.text = tweet["text"]
             user.choice = hash.text
             tempTweets.push(user)
              
             tempTweets.forEach(function(t){
               console.log(JSON.stringify(t, null, 4)) // to see object returned..
               console.log("this is word1: " + word1) 
               if ("#" + t.choice == word1){
                 arr.push(t)
               } else {
                 console.log("found a problem")
               }
             })

             if (Competitions.find({_id: myId}).is_live == false){
               return
             } else {
               Competitions.update(myId,{
                 $set: { key1: {
                     count: Math.random(),
                     word: word1, 
                     tweets: arr
                     } 
                   }
               })
             }
             } else if("#" + hash.text == word2){

             var tempTweets2 = myComp[0].key2.tweets
             var user2 = {}
             user2.name = tweet["user"]["name"]
             user2.text = tweet["text"]
             user2.choice = hash.text
             tempTweets2.push(user2)

             tempTweets2.forEach(function(t){
               if("#" + t.choice == word2){
                 arr2.push(t)
               } else {
                 console.log("found a problem")
               }
             })

             if (Competitions.find({_id: myId}).is_live == false){
               return
             } else {
               Competitions.update(myId,{
                 $set: { key2: {
                     count: Math.random(),
                     word: word2, 
                     tweets: arr2
                     } 
                 }
               })
             }
           }
       })
     }))
   },
   
   stopStream: function(myId) {
     stream.stop()
     console.log("stream stopped")
     Competitions.update(myId, {
       $set: { 
         is_live: false
       }
     })
   }

  });



