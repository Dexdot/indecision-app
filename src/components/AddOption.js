import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined
  };
  handleAddOption = e => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  };
  render() {
    const { state, handleAddOption } = this;
    return (
      <div className="add-option">
        {state.error && <p className="add-option__error">{state.error}</p>}
        <form className="add-option__form" onSubmit={handleAddOption}>
          <input
            className="add-option__input"
            autoFocus
            type="text"
            name="option"
          />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}
