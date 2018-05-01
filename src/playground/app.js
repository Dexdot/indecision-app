class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      subtitle: 'Put your life in the hands of a computer',
      options: []
    };
  }
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
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomNum]);
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState(state => ({
      options: state.options.filter(option => optionToRemove !== option)
    }));
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add option';
    } else if (this.state.options.indexOf(option) !== -1) {
      return 'This option already exists';
    } else {
      this.setState(state => ({ options: [...state.options, option] }));
    }
  }
  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <Action
          hasOptions={!!this.state.options.length}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => {
  const { title, subtitle } = props;
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
};
Header.defaultProps = {
  title: 'Indecision'
};

const Action = props => {
  const { hasOptions, handlePick } = props;
  return (
    <button disabled={!hasOptions} onClick={handlePick}>
      What should I do?
    </button>
  );
};

const Options = props => {
  const { handleDeleteOption, handleDeleteOptions, options } = props;
  return (
    <div>
      <button onClick={handleDeleteOptions}>Remove All</button>
      {!options.length && <p>Please add an option to get started!</p>}
      <ol>
        {options.map(option => (
          <Option
            option={option}
            key={option}
            handleDeleteOption={handleDeleteOption}
          />
        ))}
      </ol>
    </div>
  );
};

const Option = props => {
  const { option, handleDeleteOption } = props;
  return (
    <li>
      {option}
      <button
        onClick={() => {
          handleDeleteOption(option);
        }}
      >
        Remove
      </button>
    </li>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }
  render() {
    const { state, handleAddOption } = this;
    return (
      <form onSubmit={handleAddOption}>
        {state.error && <p>{state.error}</p>}
        <input autoFocus type="text" name="option" />
        <button>Add Option</button>
      </form>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.querySelector('#app'));
