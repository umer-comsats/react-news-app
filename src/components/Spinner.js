import React from 'react'
import styled, { keyframes } from "styled-components";


const Spinner = () => {
  const loadingStyle = {
    "--speed-of-animation": "0.9s",
    "--gap": "6px",
    "--first-color": "#4c86f9",
    "--second-color": "#49a84c",
    "--third-color": "#f6bb02",
    "--fourth-color": "#f6bb02",
    "--fifth-color": "#2196f3",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    width: "100px",
    gap: "6px",
    height: "40px"
  };

  const spanStyle = {
    width: "4px",
    height: "50px",
    animation: `scale var(--speed-of-animation) ease-in-out infinite`
  };

  const span2Style = {
    background: "var(--second-color)",
    animationDelay: "-0.8s"
  };

  const span3Style = {
    background: "var(--third-color)",
    animationDelay: "-0.7s"
  };

  const span4Style = {
    background: "var(--fourth-color)",
    animationDelay: "-0.6s"
  };

  const span5Style = {
    background: "var(--fifth-color)",
    animationDelay: "-0.5s"
  };

  const keyframesStyle = `
    @keyframes scale {
      0%, 40%, 100% {
        transform: scaleY(0.05);
      }
    
      20% {
        transform: scaleY(1);
      }
    }
  `;

  return (
    <LoadingContainer className="ml-auto mr-auto">
      <LoadingSpan />
      <SecondLoadingSpan />
      <ThirdLoadingSpan />
      <FourthLoadingSpan />
      <FifthLoadingSpan />
    </LoadingContainer>
    // <div className='text-center'>
    //     <img src={loading} alt="loading" style={{ width: '5rem', background: 'none' }}/>
    //   </div>
  )
}

export default Spinner

const LoadingContainer = styled.div`
  --speed-of-animation: 0.9s;
  --gap: 6px;
  --first-color: #4c86f9;
  --second-color: #49a84c;
  --third-color: #f6bb02;
  --fourth-color: #f6bb02;
  --fifth-color: #2196f3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  gap: var(--gap);
  height: 30px;
`;

const scaleAnimation = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.05);
  }

  20% {
    transform: scaleY(1);
  }
`;

const LoadingSpan = styled.span`
  width: 4px;
  height: 50px;
  background: var(--first-color);
  animation: ${scaleAnimation} var(--speed-of-animation) ease-in-out infinite;
`;

const SecondLoadingSpan = styled(LoadingSpan)`
  background: var(--second-color);
  animation-delay: -0.8s;
`;

const ThirdLoadingSpan = styled(LoadingSpan)`
  background: var(--third-color);
  animation-delay: -0.7s;
`;

const FourthLoadingSpan = styled(LoadingSpan)`
  background: var(--fourth-color);
  animation-delay: -0.6s;
`;

const FifthLoadingSpan = styled(LoadingSpan)`
  background: var(--fifth-color);
  animation-delay: -0.5s;
`;