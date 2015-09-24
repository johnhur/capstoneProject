  angular.module('tweet-vote', ['angular-meteor', 'chart.js', 'ngRoute']);

  function onReady() {
      angular.bootstrap(document, ['tweet-vote']);
    }
   
    if (Meteor.isCordova)
      angular.element(document).on('deviceready', onReady);
    else
      angular.element(document).ready(onReady);
  
  Accounts.ui.config({
     passwordSignupFields: "USERNAME_ONLY"
   });
  