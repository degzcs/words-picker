import React, { useState, useEffect } from "react";
import SentenseForm from "components/SentenseForm/Index.jsx"
import EntityForm from "components/EntityForm/Index.jsx"
import { useParams, useHistory } from "react-router-dom";
import { getMetaSentenses, getMetaData } from "components/Utils.js";

const Sentense = () => {
  const [metaSentense, setMetaSentense] = useState([]);
  const [sentense, setSentense] = useState('');
  const [entities, setEntities] = useState([]);
  const [type, setType] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSentense = async () => {
      const sentenseFromServer = await fetchSentense(id);
      setSentense(sentenseFromServer.sentense.text);
      setEntities(sentenseFromServer.entities);
      setMetaSentense(getMetaData(sentenseFromServer.sentense.text, sentenseFromServer.entities));
    }

    getSentense(id);
  }, []);

  // Fetch Sentenses and Entities
  const fetchSentense= async (id) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const res = await fetch(
      `http://127.0.1:3000/api/v1/sentences/${id}.json`,
      {
        method: "GET",
        headers: {
          "X-CSRF-Token": token,
        }
      }
    ).catch((e) => {
      console.log(e);
    });

    if (!res) return;
    const data = await res.json();

    //return data;
    return {sentense: {text :'this is a test', id: 1}, entities: [{text: 'test', type: 'tag'}]};
  };

  // Events
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
    // TODO call backend to remove the entity
    updateSentense(newEntities)
  };

  const addEntity = (words, type) => {
    if(type == '') return
    if(words == []) return
    const newEntities = [...entities, { text: words.join(' '), type: type }];
    // TODO call backend to add the new entity
    updateSentense(newEntities)
    cleanFields()
  };

  const updateSentense = (newEntities) => {
    setEntities(newEntities);
    setMetaSentense(getMetaData(sentense, newEntities))
  };

  const cleanFields = () => {
    setType('');
    setSelectedWords([]);
  };

  const onChangeType = (e) => {
    setType(e.target.value.toUpperCase());
  };

  return(
    <>
    <div className="container">
      <div className="row pt-5" >
        <div className="col-md-12" >
          <SentenseForm
            metaSentense={metaSentense}
            onClickWord={onClickWord}
            removeEntity={removeEntity}
            entities={entities}
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
    </div>
    </>
  )
}

export default Sentense;
