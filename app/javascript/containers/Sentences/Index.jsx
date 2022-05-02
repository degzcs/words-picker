import React, { useState, useEffect } from "react";
import SentenceForm from "../../components/SentenceForm/Index.jsx"
import Sentence from "../../components/Sentence/Index.jsx"
import EntityForm from "../../components/EntityForm/Index.jsx"
import { Link } from "react-router-dom";
import { getMetaSentences } from "../../components/Utils.js"
import { BrowserRouter as Router} from "react-router-dom";

const Sentences = () => {
  const [metaSentences, setMetaSentences] = useState([]);
  const [sentenceId, setSentenceId] = useState(null);

  useEffect(() => {
    const getSentences = async () => {
      const sentencesFromServer = await fetchSentences();
      setMetaSentences(getMetaSentences(sentencesFromServer));
    };

    getSentences();
  }, []);

  const fetchSentences = async () => {
    const res = await fetch(
      `http://127.0.1:3000/api/v1/sentences.json`
    );
    const data = await res.json();

    return data;
  };

  const onClickEdit = (id) => {
    setSentenceId(id)
  }

  const updateMSentences = (updatedSentence, updatedEntities) => {
    const sentenceIndex = metaSentences.findIndex(item => item.sentence.id == updatedSentence.id );
    metaSentences[sentenceIndex] = { sentence: updatedSentence, entities: updatedEntities };
    setMetaSentences(getMetaSentences(metaSentences));
    setSentenceId(null)
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {
             metaSentences.map(({metaSentence, sentence, entities}, index) => {
               return(
                <div key={index} className="d-flex justify-content-between pb-2">
                  <div className="" >
                    <SentenceForm
                      metaSentence={metaSentence}
                      entities={entities}
                      editable={false}
                      />
                  </div>
                  <div className="" >
                    <button
                      className="btn btn-light shadow p-2 bg-body"
                      type="button" data-bs-toggle="modal" data-bs-target="#editForm"
                      onClick={() => onClickEdit(sentence.id)}
                    >
                        EDIT
                    </button>
                  </div>
                </div>
               )
            })
          }
          {
            sentenceId && ( <Sentence sentenceId={sentenceId} updateMSentences={updateMSentences} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Sentences;
