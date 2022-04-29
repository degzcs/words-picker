import React, { useState, useEffect } from "react";

const SentenceForm = ({ metaSentence, entities, editable, onClickWord, removeEntity }) => {
  const isAMetaWord = (word) =>{
    return word.match(/<index-[0-9]+>/g)
  }

  const getIndexFrom = (word) => {
    return word.match(/[0-9]+/)
  }

  return(
        <>
          {
            metaSentence.map((word, index) => {
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
                      <b
                        key={'type_' + text + position}
                        className="px-2">{type}</b>
                    </span>
                    {
                      editable && (
                      <span
                        key={'wrapper_' + type + position}
                        className="position-relative me-2 cursor-pointer">
                          <span
                            key={type + position}
                            className="badge bg-secondary p-1 text-light bg-opacity-75 position-absolute top-0 start-50 translate-middle"
                            onClick={() => removeEntity(position)}
                          >
                           -
                          </span>
                       </span>
                      )
                    }
                  </>
                )
              } else {
                return(
                  <span
                    key={word + index}
                    className={ editable? "mx-1 cursor-pointer" : "mx-1" }
                    onClick={() => editable ? onClickWord(word) : {}}
                  >
                    {word + ' '}
                  </span>
                )
              }
            })
          }
      </>
  );
};

export default SentenceForm;
