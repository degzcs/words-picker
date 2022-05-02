import React, { useState, useEffect } from "react";
import SentenceForm from "components/SentenceForm/Index.jsx"
import EntityForm from "components/EntityForm/Index.jsx"
import { useParams } from "react-router-dom";
import { getMetaSentences, getMetaData } from "components/Utils.js";

const Sentence = ({ sentenceId, updateMSentences }) => {
  const [metaSentence, setMetaSentence] = useState([]);
  const [sentence, setSentence] = useState({text: null, id: null});
  const [entities, setEntities] = useState([]);
  const [type, setType] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSentence = async () => {
      const recordId = id || sentenceId
      const sentenceFromServer = await fetchSentence(recordId);
      setSentence(sentenceFromServer.sentence);
      setEntities(sentenceFromServer.entities);
      setMetaSentence(getMetaData(sentenceFromServer.sentence.text, sentenceFromServer.entities));
    }

    getSentence(id);
  }, []);

  // Fetch sentences and Entities
  const fetchSentence= async (id) => {
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

    return data;
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
    updateSentence(newEntities)
  };

  const addEntity = (words, type) => {
    if(type == '') return
    if(words == []) return
    const newEntities = [...entities, { text: words.join(' '), type: type }];
    // TODO call backend to add the new entity
    updateSentence(newEntities)
    cleanFields()
  };

  const updateSentence = (newEntities) => {
    setEntities(newEntities);
    setMetaSentence(getMetaData(sentence.text, newEntities))
  };

  const cleanFields = () => {
    setType('');
    setSelectedWords([]);
  };

  const onChangeType = (e) => {
    setType(e.target.value.toUpperCase());
  };

  const updateCall = async (id) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    const res = await fetch(
      `http://localhost:3000/api/v1/sentences/${id}/bulk-entities-update`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({ entities: entities }),
      }
    ).catch((e) => {
      console.log(e)
    });

    if (!res) return;
    const data = await res.json();
    return data;
  };
  const onClickUpdate = (id) => {
    const updateEntities = async (id) => {
      const entitiesFromServer = await updateCall(id);
      updateMSentences(sentence, entitiesFromServer.entities)
    }

    updateEntities(id);
  };

  return(
      <div className="modal fade" id="editForm" tabIndex="-1" aria-labelledby="editFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editFormLabel">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row pt-0" >
                <div className="col-md-12" >
                  <SentenceForm
                    metaSentence={metaSentence}
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() =>  onClickUpdate(sentence.id) }
              >
                  UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Sentence;
