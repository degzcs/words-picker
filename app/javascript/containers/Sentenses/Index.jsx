import React, { useState, useEffect } from "react";
import SentenseForm from "../../components/SentenseForm/Index.jsx"
import EntityForm from "../../components/EntityForm/Index.jsx"

const Sentenses = () => {
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

  const onClickWord = (word) => {
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

  const onChangeType = (e) => {
    setType(e.target.value);
  };
  return(
    <>
      <div
        className="container">
        <div className="row pt-5" >
          <div className="col-md-12" >
          <SentenseForm
            metaSentense={metaSentense}
            onClickWord={onClickWord}
            removeEntity={removeEntity}
            entities={entities}
            />
          </div>
        </div>
        <EntityForm
          selectedWords={selectedWords}
          type={type}
          onChangeType={onChangeType}
          addEntity={addEntity}
        />
      </div>
    </>
  )
}

export default Sentenses;
