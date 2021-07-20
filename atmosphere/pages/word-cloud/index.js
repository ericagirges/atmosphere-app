import { useState, useEffect } from 'react';
import { useZafClient } from '../zafClient';
import customStopwords from '../customStopwords';
import randomColor from 'randomcolor';

import settings from '../api/request';
import stopword from 'stopword';
import { TagCloud } from 'react-tagcloud';


export default function WordCloud() {
  const [wordCloud, setWordCloud] = useState([]);
  const client = useZafClient();
  console.log("Go: ", client)

  // When page has mounted - will trigger api call and word cloud generation
  useEffect(() => {
    // GET request to incremental exports API to return all open tickets
    client.request(settings).then(function (data) {
      // will store all instances of words
      const wordObj = {};
      const wordArr = [];

      // return all active ticket descriptions and turn into a single string
      const words = data.tickets
        .filter(
          (ticket) => ticket.status !== 'closed' && ticket.status !== 'solved'
        )
        .map((ticket) => ticket.description)
        .join('')
        .split(' ')
        .map((word) => word.toLowerCase());

      console.log('wordslength', words.length);
      
      // remove most articles/prepositions that we don't want to count
      const cleanedWords = stopword.removeStopwords(words, [
        ...stopword.en,
        ...customStopwords,
      ]);
      console.log(cleanedWords);
      console.log('cleanedwordslength', cleanedWords.length);

      for (const word of cleanedWords) {
        wordObj[word] = (wordObj[word] || 0) + 1;
      }

      for (const word in wordObj) {
        if(wordObj[word] > 10) {
          wordArr.push({
            value: word,
            count: wordObj[word],
          })
        }
      }

      setWordCloud(wordArr)

      console.log(wordArr)
    });
  }, [client]);

  if(!wordCloud) {
    return <p>Word Cloud loading...</p>
  }

  // color scheme
  const colorScheme = {
    luminosity: 'bright',
    format: 'rgb'
  };


  return (
    <div className='h-screen'>
      <TagCloud minSize={12}
    maxSize={35}
    tags={wordCloud}
    colorOptions={colorScheme}
    style={{ width: 400, textAlign: 'center' }}
    className="simple-cloud px-4 py-5"/>
    <button>Select a Group</button>
    <div>
      {/* map over agents groups in dropdown selection */}
      <a href="#">{}</a>
    </div>
    </div>
  );
}
