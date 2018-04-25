const app = {
  title: 'Visibility Toggle',
  text: 'Lorem ipsum dolor sit amet.',
  visible: false
};

const toggleVisible = () => {
  app.visible = !app.visible;
  render();
};

const appRoot = document.querySelector('#app');

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <button onClick={toggleVisible}>
        {app.visible ? 'Hide details' : 'Show details'}
      </button>
      {app.visible && <p>{app.text}</p>}
    </div>
  );
  ReactDOM.render(template, appRoot);
};
render();
