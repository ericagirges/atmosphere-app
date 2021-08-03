import { useState, useEffect } from 'react';
import { useZafClient } from '../../utils/zafClient';
import customStopwords from '../../utils/customStopwords';

import settings from '../api/request';
import stopword from 'stopword';
import { TagCloud } from 'react-tagcloud';


export default function WordCloud() {
  const [wordCloud, setWordCloud] = useState([]);
  const client = useZafClient();
  console.log("Go: ", client)

  // When page has mounted - will call to client and trigger word cloud generation
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
        .map((word) => word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));

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
        // need to actually only take the highest words in case we have more than a max of 35
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

  // word cloud color scheme
  const colorScheme = {
    luminosity: 'bright',
    hue: 'blue',
  };

  const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        animation: 'blinker 4s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size/10}em`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: `${color}`,
      }}
    >
      {tag.value}
    </span>
  )
  
  return (
    <div className='h-screen'>
      <TagCloud minSize={12}
    maxSize={20}
    tags={wordCloud}
    colorOptions={colorScheme}
    style={{ width: 600, textAlign: 'center', margin: '0 auto'}}
    className="simple-cloud px-6 py-10"
    renderer={customRenderer}/>
    </div>
  );
}
