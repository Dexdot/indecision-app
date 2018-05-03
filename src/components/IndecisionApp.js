import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import OptionModal from './OptionModal';
import Action from './Action';
import Header from './Header';

export default class IndecisionApp extends React.Component {
  state = {
    subtitle: 'Звучит неплохо',
    options: [],
    selectedOption: undefined
  };
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({
          options: options
        }));
      }
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(state => ({ selectedOption: option.text }));
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
    const input = document.querySelector('.add-option__input');
    input.value = '';
    input.focus();
  };
  handleDeleteOption = optionToRemove => {
    this.setState(state => ({
      options: state.options.filter(option => optionToRemove !== option.text)
    }));
  };
  hasOption = (optionText = '', i = 0) => {
    if (this.state.options.length) {
      if (this.state.options[i].text === optionText) {
        return true;
      } else if (i < this.state.options.length - 1) {
        return this.hasOption(optionText, i + 1);
      } else {
        return false;
      }
    }
  };
  handleAddOption = option => {
    if (!option) {
      return 'Ага хуй тебе';
    } else if (this.hasOption(option)) {
      return 'Не повторяйся';
    } else {
      this.setState(state => ({
        options: [...state.options, { text: option, done: false }]
      }));
    }
  };
  render = () => (
    <div>
      <Header subtitle={this.state.subtitle} />
      <div className="container">
        <Action
          hasOptions={!!this.state.options.length}
          handlePick={this.handlePick}
        />
        <div className="widget">
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption handleAddOption={this.handleAddOption} />
        </div>
      </div>
      <OptionModal
        selectedOption={this.state.selectedOption}
        handleClearSelectedOption={this.handleClearSelectedOption}
      />
    </div>
  );
}
