import React from "react";

const EntityForm = ({ selectedWords, type, onChangeType, addEntity }) => {
  return(
        <div className="d-flex justify-content-between">

          <div className="d-flex justify-content-start pt-3">
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
            <div className="mx-5">
              <span
                className="badge text-dark p-3 bg-info bg-gradient bg-opacity-50"
                key='selected-words'
              >
                {selectedWords.join(' ')}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <div className="">
              <button className="btn btn-light shadow p-2 bg-body"
                onClick={() => addEntity(selectedWords, type)}>
                ADD ENTITY
              </button>
            </div>
            <div className="mx-2">
              <button className="btn btn-success bg-opacity-25 shadow p-2 "
                onClick={ () => {} }>
                UPDATE
              </button>
            </div>
          </div>
        </div>

  );
}

export default EntityForm;
