import React, { useState, useEffect } from "react";
import Routes from "../routes/Index";

const App = () => {
  const [sentence, setSentence] = useState('');
  const [tag, setTag] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [taggedWords, setTaggedWords] = useState({});

  useEffect(() => {
    setSentence('Apple is looking at buying U.K. startup for $1 billion.')
    }, [])

  const handleClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  }

  const tagWords = (words, tag) => {
    setTaggedWords({...taggedWords, [tag]: words});
    setTag('');
    setSelectedWords([]);
  }

  const onChangeTag = (e) => {
    setTag(e.target.value);
  };

  const highlightWords = () => {
    // TODO select tagged words and update their style
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
            <div className="form-group pt-5">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                name="tag"
                id="tag"
                className="form-control"
                value={tag}
                required
                onChange={(e) => onChangeTag(e)}
              />
            </div>
        </div>
        <div
          className="success">
            <button className='success' onClick={() => tagWords(selectedWords, tag)}>
              create tag
            </button>
        </div>
      </div>
    </>
  );
};

export default App;
