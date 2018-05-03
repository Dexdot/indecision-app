import React from 'react';

const Action = props => (
  <button
    className="big-button"
    disabled={!props.hasOptions}
    onClick={props.handlePick}
  >
    Че?
  </button>
);

export default Action;
