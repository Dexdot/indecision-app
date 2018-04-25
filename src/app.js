class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      title: 'Indecision',
      subtitle: 'Put your life in the hands of a computer',
      options: []
    };
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomNum]);
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) !== -1) {
      return 'This option already exists';
    } else {
      this.setState(state => {
        return {
          options: [...state.options, option]
        };
      });
    }
  }
  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <Action
          hasOptions={!!this.state.options.length}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>
        What should I do?
      </button>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <ol>
        <button onClick={this.props.handleDeleteOptions}>
          Remove All Options
        </button>
        {this.props.options.map((option, i) => (
          <Option option={option} key={i + 1} />
        ))}
      </ol>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.option}</li>;
  }
}

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
    e.target.elements.option.value = '';

    this.setState(() => {
      return { error };
    });
  }
  render() {
    return (
      <form onSubmit={this.handleAddOption}>
        {this.state.error && <p>{this.state.error}</p>}
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.querySelector('#app'));
