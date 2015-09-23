Meteor.startup(function(){
  // code to run on server at startup
  // ***** .env and .gitignore files ***** 
  Twit = Meteor.npmRequire('twit');
  T = new Twit({
    consumer_key: Meteor.settings.consumer_key,
    consumer_secret: Meteor.settings.consumer_secret,
    access_token: Meteor.settings.access_token,
    access_token_secret: Meteor.settings.access_token_secret
  })
  console.log("*****CONNECTED TO TWITTER STREAM*****")
});
