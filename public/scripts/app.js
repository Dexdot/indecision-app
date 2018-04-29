'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);

    _this.state = {
      subtitle: 'Put your life in the hands of a computer',
      options: []
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);
        if (options) {
          this.setState(function () {
            return {
              options: options
            };
          });
        }
      } catch (e) {}
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        localStorage.setItem('options', JSON.stringify(this.state.options));
      }
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      alert(this.state.options[randomNum]);
    }
  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (state) {
        return {
          options: state.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      if (!option) {
        return 'Enter valid value to add option';
      } else if (this.state.options.indexOf(option) !== -1) {
        return 'This option already exists';
      } else {
        this.setState(function (state) {
          return { options: [].concat(_toConsumableArray(state.options), [option]) };
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: this.state.subtitle }),
        React.createElement(Action, {
          hasOptions: !!this.state.options.length,
          handlePick: this.handlePick
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
  var title = props.title,
      subtitle = props.subtitle;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      title
    ),
    subtitle && React.createElement(
      'h2',
      null,
      subtitle
    )
  );
};
Header.defaultProps = {
  title: 'Indecision'
};

var Action = function Action(props) {
  var hasOptions = props.hasOptions,
      handlePick = props.handlePick;

  return React.createElement(
    'button',
    { disabled: !hasOptions, onClick: handlePick },
    'What should I do?'
  );
};

var Options = function Options(props) {
  var handleDeleteOption = props.handleDeleteOption,
      handleDeleteOptions = props.handleDeleteOptions,
      options = props.options;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleDeleteOptions },
      'Remove All'
    ),
    !options.length && React.createElement(
      'p',
      null,
      'Please add an option to get started!'
    ),
    React.createElement(
      'ol',
      null,
      options.map(function (option) {
        return React.createElement(Option, {
          option: option,
          key: option,
          handleDeleteOption: handleDeleteOption
        });
      })
    )
  );
};

var Option = function Option(props) {
  var option = props.option,
      handleDeleteOption = props.handleDeleteOption;

  return React.createElement(
    'li',
    null,
    option,
    React.createElement(
      'button',
      {
        onClick: function onClick() {
          handleDeleteOption(option);
        }
      },
      'Remove'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(e) {
      e.preventDefault();

      var option = e.target.elements.option.value.trim();
      var error = this.props.handleAddOption(option);

      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        e.target.elements.option.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state,
          handleAddOption = this.handleAddOption;

      return React.createElement(
        'form',
        { onSubmit: handleAddOption },
        state.error && React.createElement(
          'p',
          null,
          state.error
        ),
        React.createElement('input', { autoFocus: true, type: 'text', name: 'option' }),
        React.createElement(
          'button',
          null,
          'Add Option'
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.querySelector('#app'));
