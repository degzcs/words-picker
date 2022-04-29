import React, { useState, useEffect } from "react";
import SentenseForm from "../../components/SentenseForm/Index.jsx"
import EntityForm from "../../components/EntityForm/Index.jsx"
import { Link } from "react-router-dom";
import { getMetaSentenses } from "../../components/Utils.js"
import { BrowserRouter as Router} from "react-router-dom";

const Sentenses = () => {
  const [metaSentenses, setMetaSentenses] = useState([]);
  const [type, setType] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);

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
    {sentense: { text: text1, id: 1 }, entities: entities1},
    {sentense: { text: text2, id: 2 }, entities: entities2}
  ]

  const [sentenses, setSentenses] = useState(response);

  useEffect(() => {
    // TODO call sentense from the backend
    setMetaSentenses(getMetaSentenses(sentenses));
  }, [])

  return(
    <div className="container">
      {
         metaSentenses.map(({metaSentense, sentense, entities}) => {
           return(
            <div className="d-flex justify-content-between pb-2">
              <div className="" >
                <SentenseForm
                  metaSentense={metaSentense}
                  entities={entities}
                  editable={false}
                  />
              </div>
              <div className="" >
                <Link
                  className="btn btn-light shadow p-2 bg-body"
                  to={`/sentenses/${sentense.id}`}
                >
                    EDIT
                </Link>
              </div>
            </div>
           )
        })
      }
    </div>
  )
}

export default Sentenses;
