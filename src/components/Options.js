import React from 'react';
import Option from './Option';

const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    {!props.options.length && <p>Please add an option to get started!</p>}
    <ul>
      {props.options.map(option => (
        <Option
          option={option}
          key={option.text}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </ul>
  </div>
);

export default Options;
