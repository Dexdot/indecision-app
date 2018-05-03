import React from 'react';

export default class Option extends React.Component {
  state = {
    text: this.props.option.text,
    done: this.props.option.done,
    count: this.props.count
  };
  toggleDone = () => {
    this.setState(state => ({ done: !state.done }));
  };
  render() {
    const { state, props, toggleDone } = this;
    return (
      <div className={`option ${state.done ? 'option--done' : ''}`}>
        <li>
          <p className="option__text">
            {/* {state.count}. {state.text} */}
            {state.text}
          </p>
        </li>
        <button
          className="button button--link"
          onClick={() => {
            props.handleDeleteOption(state.text);
          }}
        >
          я сделяль
        </button>
      </div>
    );
  }
}
