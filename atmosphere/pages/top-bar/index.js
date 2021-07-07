import Image from 'next/image';
import Link from 'next/link';
import WordCloud from '../word-cloud/index';
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
  return (
    <div>
      <OpeningContainer>
        <OpeningText>{"What's the weather like today"}</OpeningText>
        <Link href="/word-cloud">
        <a>View Forecast</a>
        </Link>
      </OpeningContainer>
    </div>
  );
}
