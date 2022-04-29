import React, { useState, useEffect } from "react";
import Routes from "../routes/Index";
import Sentenses from "../containers/Sentenses/Index"

const App = () => {
  const text1= 'Apple is looking at buying U.K. startup for $1 billion. Apple'
  const entities1 =[ {text: 'Apple', type: 'ORG'},
    {text: 'U.K.', type: 'GPE'},
    {text: '$1 billion', type: 'MONEY'}
  ]
  const text2= 'Regional funds with exposure to United States and outperform equity market over 3 year'
  const entities2 =[
    {text: 'Regional funds', type: 'THEME'},
    {text: 'United States.', type: 'GPE'},
    {text: 'equity market', type: 'THEME'},
    {text: '3 year', type: 'TIME'}
  ]
  const response = [
    {sentense: text1, entities: entities1},
    {sentense: text2, entities: entities2}
  ]

  const [sentenses, setSentenses] = useState(response);

  useEffect(() => {
    // TODO call sentense from the backend
  }, [])

  return (
    <Sentenses
      sentenses={sentenses}
    />
  );
};

export default App;
