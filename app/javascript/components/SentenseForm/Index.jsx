import React, { useState, useEffect } from "react";

const SentenseForm = ({ metaSentense, entities, onClickWord, removeEntity, editable }) => {
  const isAMetaWord = (word) =>{
    return word.match(/<index-[0-9]+>/g)
  }

  const getIndexFrom = (word) => {
    return word.match(/[0-9]+/)
  }

  return(
        <>
          {
            metaSentense.map((word, index) => {
              if(isAMetaWord(word)){
                const position = getIndexFrom(word)
                const text = entities[position].text
                const type = entities[position].type
                return(
                  <>
                    <span
                      key={text + position}
                      className="badge text-dark p-3 bg-info bg-gradient bg-opacity-50"
                    >
                      {text + ' '}
                      <b className="px-2">{type}</b>
                    </span>
                    {
                      editable &&
                      <span className="position-relative me-2 cursor-pointer">
                          <span
                            key={type + position}
                            className="badge bg-secondary p-1 text-light bg-opacity-75 position-absolute top-0 start-50 translate-middle"
                            onClick={() => removeEntity(position)}
                          >
                           -
                          </span>
                       </span>
                    }
                  </>
                )
              } else {
                return(
                  <span
                    key={word + index}
                    className="mx-1 cursor-pointer"
                    onClick={() => onClickWord(word)}
                  >
                  {word}&nbsp;
                </span>
                )
              }
            })
          }
    </>

  );
}

export default SentenseForm;
