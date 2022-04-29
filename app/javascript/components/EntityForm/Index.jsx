import React from "react";

const EntityForm = ({ selectedWords, type, onChangeType, addEntity }) => {
  return(
        <div className="">
          <div className="row">
            <div className="col-12">
              <span
                className="badge text-dark pt-3 pb-3 bg-info bg-gradient bg-opacity-50"
                key='selected-words'
              >
                {selectedWords.join(' ')}
              </span>
              {
                selectedWords.length == 0 && (
                  <span
                    className="badge text-muted pt-3 pb-3 bg-light bg-gradient bg-opacity-50"
                    key='selected-words-placeholder'
                  >
                    {'Pick some words ...'}
                  </span>
                )
              }
            </div>
          </div>

          <div className="d-flex justify-content-start">
            <div className="pt-1 me-2">
              <input
                type="text"
                placeholder="Type ..."
                name="type"
                id="type"
                className="form-control"
                value={type}
                required
                onChange={(e) => onChangeType(e)}
              />
            </div>
            <div className="">
              <button className="btn btn-light shadow p-2 bg-body"
                onClick={() => addEntity(selectedWords, type)}>
                ADD ENTITY
              </button>
            </div>
          </div>
        </div>

  );
}

export default EntityForm;
