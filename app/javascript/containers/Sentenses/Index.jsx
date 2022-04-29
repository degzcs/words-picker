import React, { useState, useEffect } from "react";
import SentenseForm from "../../components/SentenseForm/Index.jsx"
import EntityForm from "../../components/EntityForm/Index.jsx"

const Sentenses = ({ sentenses}) => {
  const [metaSentenses, setMetaSentenses] = useState([]);
  const [currentMSentense, setCurrentMSentense] = useState([]);
  const [currentEntities, setCurrentEntities] = useState([]);
  const [currentSentense, setCurrentSentense] = useState('');
  const [type, setType] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);


  useEffect(() => {
    setMetaSentenses(getMetaSentenses(sentenses));
    setCurrentItem(sentenses[0].sentense, sentenses[0].entities)
  }, [])

  const getMetaData = (fullText, entities) => {
    entities.map(({text, type},index)=>{
      fullText= fullText.replaceAll(text, '<index-'+index+'>')
    })

    return fullText.split(' ')
  }

  const getMetaSentenses = (group) => {
    var ms = []
    group.map(({sentense, entities}) => {
      ms = [...ms,
        {
          metaSentense: getMetaData(sentense, entities),
          sentense: sentense,
          entities: entities
        }
      ];
    })

    return ms;
  }

  const updateMetaSentenses = () => {
    //TODO find in the array of MSs by content
    // and then update the content

  }

  const setCurrentItem = (sentense, entities) => {
    setCurrentSentense(sentense)
    setCurrentEntities(entities)
    setCurrentMSentense(getMetaData(sentense, entities))
    console.log(currentMSentense)
  }

  const onClickWord = (word) => {
    // TODO select contigous words. Add index of the array to know this
    // TODO uniq words. use filter function here
    // TODO avoid selec <index-\d> elements
    setSelectedWords([...selectedWords, word]);
  };

  const removeEntity = (position) => {
    const newEntities = entities.filter((value, index, array) => {
      return index != position
    })
    setCurrentEntities(newEntities);
    setCurrentMSentense(getMetaData(sentense, newEntities))
  };

  const addEntity = (words, type) => {
    if(type == '') return
    if(words == []) return
    const newEntities = [...currentEntities, {text: words.join(' '), type: type }];
    setCurrentEntities(newEntities);
    setCurrentMSentense(getMetaData(currentSentense, newEntities))
    setType('');
    setSelectedWords([]);
  };

  const onChangeType = (e) => {
    setType(e.target.value.toUpperCase());
  };

  return(
    <div className="container">
      {
         metaSentenses.map(({metaSentense, sentense, entities}) => {
           return(
            <div className="d-flex justify-content-between pb-2">
              <div className="" >
                <SentenseForm
                  metaSentense={metaSentense}
                  onClickWord={onClickWord}
                  removeEntity={removeEntity}
                  entities={entities}
                  editable={false}
                  />
              </div>
              <div className="" >
                <button className="btn btn-light shadow p-2 bg-body"
                  onClick={() => setCurrentItem(sentense, entities)}>
                    EDIT
                </button>
              </div>
            </div>
           )
      })
    }{
      currentMSentense && (
        <>
          <div className="row pt-5" >
            <div className="col-md-12" >
            <SentenseForm
              metaSentense={currentMSentense}
              onClickWord={onClickWord}
              removeEntity={removeEntity}
              entities={currentEntities}
              editable={true}
              />
            </div>
          </div>
          <EntityForm
            selectedWords={selectedWords}
            type={type}
            onChangeType={onChangeType}
            addEntity={addEntity}
          />
        </>
      )
    }
  </div>
  )
}

export default Sentenses;
