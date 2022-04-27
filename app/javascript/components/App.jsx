import React, { useState, useEffect } from "react";
import Routes from "../routes/Index";

const App = () => {
  const [sentence, setSentence] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    setSentence('Apple is looking at buying U.K. startup for $1 billion.')
    }, [])

  const handleClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  }

  return (
    <>
      <div
        className="container">
        <div
          className="alert alert-success"
          role="alert">
            {
              sentence.split(' ').map((word, index) => {
                return <span key={index} onClick={() => handleClick(word)}>
                  {word}&nbsp;
                </span>
              })
            }
        </div>
        <div
          className="success">
            {
              selectedWords.map((word, index) => {
                return <span key={index}>
                  {word}&nbsp;
                </span>
              })
            }
          <input type='text'/>
        </div>
        <div
          className="success">
            <button className='success'>
              create tag
            </button>
        </div>
      </div>
    </>
  );
};

export default App;
