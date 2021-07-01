import { useState } from 'react';
import { useZafClient } from '../zafClient';
import customStopwords from '../customStopwords';
import settings from '../api/request';
import stopword from 'stopword';
import styled from 'styled-components';

const CloudText = styled.h2`
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
`;

export default function WordCloud() {
    const [ wordMap, setWordMap ] = useState();
    const client = useZafClient();
  
    // GET request to incremental exports API to return all open tickets
    const getTickets = () => {
      client.request(settings).then(
        function(data) {
          const wordMap = {};
  
          const words = data.tickets
            .filter(ticket => ticket.status !== 'closed' && ticket.status !== 'solved')
            .map(ticket => ticket.description)
            .join('')
            .split(' ')
            .map(word => word.toLowerCase());
  
          console.log('wordslength', words.length);
          
          const cleanedWords = stopword.removeStopwords(words, [...stopword.en, ...customStopwords]);
          console.log(cleanedWords)
          console.log('cleanedwordslength', cleanedWords.length)
  
          for (const word of cleanedWords) {
            wordMap[word] = (wordMap[word] || 0) + 1;
          }
  
          setWordMap(wordMap)
  
          console.log(wordMap)
  
        }
      )
    };
  
    // function that generates word cloud
    const generateWordCloud = event => {
      event.preventDefault();
      getTickets();
    };
    return (
        <div>
            <CloudText>☁️ I am a Word Cloud! ☁️</CloudText>
        </div>
    )
}