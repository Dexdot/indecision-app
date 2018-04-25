class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      title: 'Visibility Toggle',
      text: 'Lorem ipsum dolor sit amet.',
      visible: false
    };
  }
  toggleVisibility() {
    this.setState(state => {
      return {
        visible: !state.visible
      };
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={this.toggleVisibility}>
          {this.state.visible ? 'Hide details' : 'Show details'}
        </button>
        {this.state.visible && this.state.text}
      </div>
    );
  }
}

ReactDOM.render(<Visibility />, document.querySelector('#app'));
