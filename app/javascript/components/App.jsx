import React, { useState, useEffect } from "react";
import Routes from "../routes/Index";

const App = () => {
  const [sentense, setSentense] = useState('');
  const [metaSentense, setMetaSentense] = useState([]);
  const [type, setType] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    // TODO call sentense from the sentenses component or backend
    const sentense = 'Apple is looking at buying U.K. startup for $1 billion. Apple'
    const entities =[
      {text: 'Apple', type: 'ORG'},
      {text: 'U.K.', type: 'GPE'},
      {text: '$1 billion', type: 'MONEY'}
    ]
    setEntities(entities)
    setSentense(sentense)
    computeEntities(sentense, entities)
  }, [])

  const computeEntities = (sentense, entities) => {
    var tmpText = sentense
    entities.map(({text, type},index)=>{
      tmpText = tmpText.replaceAll(text, '<index-'+index+'>')
    })
    setMetaSentense(tmpText.split(' '));
  }

  const handleClick = (word) => {
    // TODO select contigous words. Add index of the array to know this
    // TODO uniq words. use filter function here
    setSelectedWords([...selectedWords, word]);
  }

  const removeEntity = (position) => {
    const newEntities = entities.filter((value, index, array) => {
      return index != position
    })
    computeEntities(sentense, newEntities)
    setEntities(newEntities);
  }

  const addEntity = (words, type) => {
    const newEntities = [...entities, {text: words.join(' '), type: type }];
    setEntities(newEntities);
    computeEntities(sentense, newEntities)
    setType('');
    setSelectedWords([]);
  }

  const onChangeTag = (e) => {
    setType(e.target.value);
  };

  return (
    <>
      <div
        className="container">
        <div className="row pt-5" >
          <div className="col-md-12" >
            {
              metaSentense.map((word, index) => {
                if(word.match(/<index-[0-9]+>/g)){
                  const position = word.match(/[0-9]+/)
                  const text = entities[position].text
                  const type = entities[position].type
                  return(
                    <>
                      <span
                        key={text + position}
                        className="badge text-dark p-3 bg-info bg-gradient bg-opacity-50"
                        onClick={() => handleClick(word)}
                      >
                      {text + ' ' + type}
                      </span>
                     <span className="position-relative me-3">
                        <span
                          key={type + position}
                          className="badge bg-secondary p-1 text-light bg-opacity-75 position-absolute top-0 start-50 translate-middle"
                          onClick={() => removeEntity(position)}
                        >
                         -
                        </span>
                     </span>
                    </>
                  )
                } else {
                  return(
                    <span
                      key={word + index}
                      className=""
                      onClick={() => handleClick(word)}
                    >
                    {word}&nbsp;
                  </span>
                  )
                }
              })
            }
          </div>
        </div>
        <div className="d-flex justify-content-between">

          <div className="d-flex justify-content-start pt-3">
            <div className="pt-1 me-2">
              <input
                type="text"
                placeholder="Type ..."
                name="type"
                id="type"
                className="form-control"
                value={type}
                required
                onChange={(e) => onChangeTag(e)}
              />
            </div>
            <div className="mx-5">
              <span
                className="badge text-dark p-3 bg-info bg-gradient bg-opacity-50"
                key='selected-words'
              >
                {selectedWords.join(' ')}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <div className="">
              <button className="btn btn-light shadow p-2 bg-body"
                onClick={() => addEntity(selectedWords, type)}>
                ADD ENTITY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
