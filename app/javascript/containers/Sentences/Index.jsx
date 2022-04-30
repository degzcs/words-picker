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
    {sentence: { text: text1, id: 1 }, entities: entities1},
    {sentence: { text: text2, id: 2 }, entities: entities2}
  ]

  const [sentences, setSentences] = useState(response);

  useEffect(() => {
    // TODO call sentence from the backend
    setMetaSentences(getMetaSentences(sentences));
  }, [])

  const onClickEdit = (id) => {
    setSentenceId(id)
  }

  const updateMSentences = (updatedSentence, updatedEntities) => {
    const sentenceIndex = sentences.findIndex(item => item.sentence.id == updatedSentence.id );
    sentences[sentenceIndex] = { sentence: updatedSentence, entities: updatedEntities };
    setMetaSentences(getMetaSentences(sentences));
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
