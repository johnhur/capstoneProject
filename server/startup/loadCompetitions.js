Meteor.startup(function(){
  // code to run on server at startup
  // ***** .env and .gitignore files ***** 
  Twit = Meteor.npmRequire('twit');
  T = new Twit({
    consumer_key: "O8oj6DrDmnpfX3vnp22GGNha7",
    consumer_secret: "AbxCwN5OTVmD2TCnaW42dJnPddlhRXemQFO6Wp023ZFeNHi6Uq",
    access_token: "429220099-FqFX3lpEypyiiyfmQPOs1XTqw5DdFJwsJSN0kETn",
    access_token_secret: "sC76qKyDXJ4XEsSdIGPpvR4oBa2Uox9WLSSoXe3YsGl0X"
  })
  console.log("*****CONNECTED TO TWITTER STREAM*****")
});
