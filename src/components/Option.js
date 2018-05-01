import React from 'react';

export default class Option extends React.Component {
  state = {
    text: this.props.option.text,
    done: this.props.option.done
  };
  toggleDone = () => {
    this.setState(state => ({ done: !state.done }));
  };
  render() {
    const { state, props, toggleDone } = this;
    return (
      <li
        style={{ textDecoration: state.done ? 'line-through' : 'none' }}
        onClick={toggleDone}
      >
        {state.text}
        <button
          onClick={() => {
            props.handleDeleteOption(state.text);
          }}
        >
          Remove
        </button>
      </li>
    );
  }
}
