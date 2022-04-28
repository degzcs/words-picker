import React, { useState, useEffect } from "react";

const SentenseForm = ({ metaSentense, entities, onClickWord, removeEntity  }) => {
  return(
        <>
          {
            metaSentense.map((word, index) => {
              if(word.match(/<index-[0-9]+>/g)){
                const position = word.match(/[0-9]+/)
                const text = entities[position].text
                const type = entities[position].type
                return(
                  <>
                    <span
                      key={text + position}
                      className="badge text-dark p-3 bg-info bg-gradient bg-opacity-50"
                      onClick={() => onClickWord(word)}
                    >
                    {text + ' ' + type}
                    </span>
                   <span className="position-relative me-3">
                      <span
                        key={type + position}
                        className="badge bg-secondary p-1 text-light bg-opacity-75 position-absolute top-0 start-50 translate-middle"
                        onClick={() => removeEntity(position)}
                      >
                       -
                      </span>
                   </span>
                  </>
                )
              } else {
                return(
                  <span
                    key={word + index}
                    className=""
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
