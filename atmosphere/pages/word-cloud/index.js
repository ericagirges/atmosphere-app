import styled from 'styled-components';

const CloudText = styled.h2`
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
`;

export default function WordCloud() {
    return (
        <div>
            <CloudText>☁️ I am a Word Cloud! ☁️</CloudText>
        </div>
    )
}