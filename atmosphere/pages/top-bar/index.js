import { useState } from 'react';
import Image from 'next/image';
import WordCloud from '../word-cloud/index';
import { useZafClient } from '../zafClient';
import customStopwords from '../customStopwords';
import settings from '../api/request';
import stopword from 'stopword';
import styled from 'styled-components';

// styling
const OpeningText = styled.p`
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 300;
  font-style: italic;
  size: 1.2em;
`;

const OpeningContainer = styled.div`
  text-align: center;
`;

export async function getServerSideProps({ query }) {
  console.log('query params', query);

  return {
    props: {},
  };
}

export default function TopBar() {
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
      },
      function(response) {
        console.error(response.responseText);
      }
    )
  };

  // OnClick function that triggers WordCloud to generate 
  const generateWordCloud = event => {
    event.preventDefault();
    getTickets();
  };

  return (
    <div>
      <OpeningContainer>
        <OpeningText>{"What's the weather like today"}</OpeningText>
        <button onClick={generateWordCloud}>View Forecast</button>
      </OpeningContainer>
    </div>
  );
}
