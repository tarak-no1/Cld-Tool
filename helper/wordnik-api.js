'use strict';
const request = require('request-json');
const conf = require('../config/conf');
const client = request.createClient(conf.use);
const token = conf.token;

module.exports = (function(){
    const getData = function(path,callback){
      client.get(path, (err, res, body)=>{
          if(err) return callback(err);
          if(res.statusCode === 200){
              return callback(null,body);
          }
          return callback(`Response StatusCode: ${res.statusCode}`,null);
      });
    };
    //public methods
    const needed_functions = {
      getDefinition : function(word,callback){
        let path = `word.json/${word}/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${token}`;
        getData(path,callback);
      },
      getSynonym : function(word,callback){
        let path = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${token}`;
        getData(path,callback);
      },
      getAntonym : function(word,callback){
        let path = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=${token}`;
        getData(path,callback);
      },
      getExamples : function(word,callback){
        let path = `word.json/${word}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${token}`;
        getData(path,callback);
      },
      getWordOfTheDay : function(date,callback){
        let path = `words.json/wordOfTheDay?date=${date}&api_key=${token}`;
        getData(path,callback);
      },
      getRandomWord : function(callback){
        let path = `words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${token}`;
        getData(path,callback);
      }
    };
    return needed_functions;
})();
