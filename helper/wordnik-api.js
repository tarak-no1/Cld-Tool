const request = require('request-json');
const conf = require('../config/conf');
const client = request.createClient(conf.api_url);
const token = conf.api_token;

module.exports = (function(){

    /*
    /* this function is used to get the wordnik api response
    */
    const getData = (path,callback)=>{
      client.get(path, (err, res, body)=>{
          if(err) return callback(err);
          if(res.statusCode === 200){
              return callback(null,body);
          }
          return callback(`Response StatusCode: ${res.statusCode}`,null);
      });
    };
    // require methods
    const wordnik = {
      getDefinition : (word,callback)=>{ // this method is used to get the definition
        let path = `word.json/${word}/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${token}`;
        getData(path,callback);
      },
      getSynonym : (word,callback)=>{ // this method is used to get the synonym
        let path = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${token}`;
        getData(path,callback);
      },
      getAntonym : (word,callback)=>{ // this method is used to get the antonym
        let path = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=${token}`;
        getData(path,callback);
      },
      getExamples : (word,callback)=>{ // this method is used to get the examples
        let path = `word.json/${word}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${token}`;
        getData(path,callback);
      },
      getWordOfTheDay : (date,callback)=>{ // this method is used to get the word of the day
        let path = `words.json/wordOfTheDay?date=${date}&api_key=${token}`;
        getData(path,callback);
      },
      getRandomWord : (callback)=>{ // this method is used to get the random word
        let path = `words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${token}`;
        getData(path,callback);
      }
    };
    return wordnik;
})();
