import React, { useState, useEffect } from "react";

const SentenceForm = ({ metaSentence, entities, editable, onClickWord, removeEntity }) => {
  const isAMetaWord = (word) =>{
    return word.match(/<index-[0-9]+>/g)
  }

  const getIndexFrom = (word) => {
    return word.match(/[0-9]+/)
  }

  return(
        <div>
          {
            metaSentence.map((word, index) => {
              if(isAMetaWord(word)){
                let position = getIndexFrom(word)
                let text = entities[position].text
                let type = entities[position].type
                let color = entities[position].color
                return(
                  <span key={text + type + index}>
                    {
                      <span
                        key={text.toString()}
                        className={`badge text-dark p-3 ${color} bg-gradient bg-opacity-50"`}
                      >
                        {text + ' '}
                        <b
                          key={type.toString()}
                          className="px-2">{type}</b>
                      </span>
                    }{
                      editable && (
                      <span
                        key={position.toString()}
                        className="position-relative me-2 cursor-pointer">
                          <span
                            key={index.toString()}
                            className="badge bg-secondary p-1 text-light bg-opacity-75 position-absolute top-0 start-50 translate-middle"
                            onClick={() => removeEntity(position)}
                          >
                           -
                          </span>
                       </span>
                      )
                    }
                  </span>
                )
              } else {
                return(
                  <span
                    key={word.toString()}
                    className={ editable? "mx-1 cursor-pointer" : "mx-1" }
                    onClick={() => editable ? onClickWord(word) : {}}
                  >
                    {word + ' '}
                  </span>
                )
              }
            })
          }
      </div>
  );
};

export default SentenceForm;
