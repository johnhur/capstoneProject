Using one collection, I could more easily add additional parameters to the document being inserted into the collection. 

Competition.insert({
         name: compName,
         key1: {
           word: choiceUno, 
           tweets: [] 
         },
         key2: {
           word: choiceDos,
           tweets: [] 
         }
})

If I use two collections, I could insert the mongoid into both documents for each collection.. 
when searching for the data on the client side, I could use the competition name and the userId to return to me all the documents with those parameters.
to trigger the autorun, I could use the getCollectionReactively method for both collections..

    Choice1.insert({
          userid: "" ,
          compName: "" .
          name: user.name,
          text: user.text,
          choice: user.choice
    });

    Choice2.insert({
          userid: ,
          compName: "" .
          name: user.name,
          text: user.text,
          choice: user.choice
    });



animated bird. responsive based on incoming tweet. 

