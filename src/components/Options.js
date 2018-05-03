import React from 'react';
import Option from './Option';

const Options = props => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Твои задачки</h3>
      <button
        className="button button--link"
        onClick={props.handleDeleteOptions}
      >
        я всо сделяль
      </button>
    </div>
    {!props.options.length && (
      <p className="widget__message">Ну давай начнем</p>
    )}
    <ul className="options">
      {props.options.map((option, i) => (
        <Option
          option={option}
          key={option.text}
          count={i + 1}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </ul>
  </div>
);

export default Options;
