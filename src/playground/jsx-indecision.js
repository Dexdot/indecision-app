const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};
const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};
const onRemoveButtonClick = () => {
  app.options.length = 0;
  render();
};
const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const appRoot = document.querySelector('#app');
const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{`Number of options: ${app.options.length}`}</p>
      {app.options && app.options.length > 0 ? (
        <p>Here are your options:</p>
      ) : (
        <p>No options</p>
      )}
      <button disabled={!app.options.length} onClick={onMakeDecision}>
        What should I do?
      </button>
      <button onClick={onRemoveButtonClick}>Remove All</button>
      {app.options.length && (
        <ol>{app.options.map((option, i) => <li key={i + 1}>{option}</li>)}</ol>
      )}
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

render();
