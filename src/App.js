// src/App.js
import React from 'react';
import Cart from './components/Cart';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const App = () => {
  return (
    <AppContainer>
      <Cart />
    </AppContainer>
  );
};

export default App;
