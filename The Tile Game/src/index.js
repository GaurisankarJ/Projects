// "use strict";
// import React from "react";
// import ReactDOM from "react-dom";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { connect } from "react-redux";
// import "./style.scss";

// //Redux Store
// const HANDLE_NUMBERS = "HANDLE_NUMBERS";
// const HANDLE_DECIMAL = "HANDLE_DECIMAL";
// const HANDLE_OPERATORS =  "HANDLE_OPERATORS";
// const HANDLE_EVALUATE = "HANDLE_EVALUATE";
// const INITIALIZE = "INITIALIZE";
// const SET_VALUE = "SET_VALUE";
// const defaultState = {
//     formula: "0",
//     currentValue: "0",
//     previousValue: "",
//     lastClicked: "",
//     evaluated: false
// };
// const isOperator = /[x/+‑]/,
//     endsWithOperator = /[x+‑/]$/,
//     containsPeriod = /\w*\.\w*/,
//     endsWithPeriod = /\w*\./,
//     equalityCheck = /=/,
//     clearStyle = { 
//         background: '#ac3939' 
//     },
//     operatorStyle = { 
//         background: '#666666' 
//     },
//     equalsStyle = {
//         background: '#004466',
//         position: 'absolute',
//         height: 130,
//         bottom: 5
//     };
// const calculatorReducer = (state = defaultState, action) => {
//     switch(action.type) {
//         case HANDLE_NUMBERS: 
//             if(state.evaluated == true) {
//                 return Object.assign({}, defaultState, {
//                     currentValue: action.number,
//                     formula: action.number
//                 });
//             }
//             var number = "";
//             var formula = "";
//             if(state.currentValue == "0") {
//                 number = action.number;
//                 if(state.formula == "0") {
//                     formula = number;
//                 }
//             } else if(state.currentValue.length < 21) {
//                 number += state.currentValue + action.number;
//                 formula += state.formula + action.number;
//                 if(isOperator.test(state.lastClicked)) {
//                     number = action.number;
//                     formula = state.formula + action.number;
//                 }
//             } else {
//                 number = state.currentValue;
//                 formula = state.formula;
//             }
//             return Object.assign({}, state, { 
//                 currentValue: number,
//                 formula: formula,
//                 lastClicked: action.number
//             });
//         case HANDLE_DECIMAL:
//             if(state.evaluated == true) {
//                 return Object.assign({}, defaultState, {
//                     currentValue: "0.",
//                     formula: "0."
//                 });
//             }
//             var number = "";
//             var formula = "";
//             if(!containsPeriod.test(state.currentValue)) {
//                 if(state.currentValue.length < 21) {
//                     number += state.currentValue + ".";
//                     formula += state.formula + ".";
//                 }
//                 if(isOperator.test(state.lastClicked)) {
//                     number =  "0.";
//                     formula = state.formula + "0.";
//                 }
//             } else {
//                 number = state.currentValue;
//                 formula = state.formula;
//             }
//             return Object.assign({}, state, {
//                 currentValue: number,
//                 formula: formula,
//                 lastClicked: "."
//             });
//         case HANDLE_OPERATORS:
//             if(state.evaluated == true) {
//                 return Object.assign({}, state, (state = defaultState));
//             }
//             var operator = action.operator;
//             if(operator == "x") {
//                 operator = "*";
//             } else if(operator == "‑") {
//                 operator = "-";
//             }
//             var formula = state.formula + operator;
//             if(isOperator.test(state.lastClicked)) {
//                 formula = state.formula.slice(0, state.formula.length - 1) + operator; 
//             }
//             if(endsWithPeriod.test(state.lastClicked)) {
//                 formula = state.formula + "0" + operator;
//             }
//             if(state.currentValue == "0" && operator == "-") {
//                 formula = operator; 
//             }
//             return Object.assign({}, state, {
//                 currentValue: operator,
//                 formula: formula,
//                 lastClicked: action.operator
//             });
//         case HANDLE_EVALUATE:
//             var formula = state.formula;
//             var sum = "";
//             console.log(eval("+0.950+3"));
//             if(!equalityCheck.test(state.lastClicked)) {
//                 if(endsWithOperator.test(state.lastClicked) || endsWithPeriod.test(state.lastClicked)) {
//                     formula = state.formula.slice(0, state.formula.length - 1);
//                 } 
//                 sum = eval(formula).toString();
//                 formula = formula + "=" + sum;
//             } else {
//                 sum = state.currentValue;
//                 formula = state.formula
//             }
//             return Object.assign({}, state, {
//                 currentValue: sum,
//                 formula: formula,
//                 lastClicked: "=",
//                 evaluated: true
//             });
//         case INITIALIZE: 
//             return Object.assign({}, state, state = defaultState);
//         case SET_VALUE:
//             return Object.assign({}, state, action.state);
//         default:
//             return state;
//     }
// };
// const initializeAction = () => {
//     return {
//         type: INITIALIZE
//     };
// };
// const numbersAction = (event) => {
//     return {
//         type: HANDLE_NUMBERS,
//         number: event.target.value
//     };
// };
// const decimalAction = () => {
//     return {
//         type: HANDLE_DECIMAL
//     };
// };
// const operatorsAction = (event) => {
//     return {
//         type: HANDLE_OPERATORS,
//         operator: event.target.value
//     };
// };
// const evaluateAction = () => {
//     return {
//         type: HANDLE_EVALUATE
//     };
// };
// const setValueAction = (newState) => {
//     return {
//         type: SET_VALUE,
//         state: newState
//     };
// };
// const store = createStore(calculatorReducer);
// store.subscribe(() => console.log(store.getState()));

// //React Component
// class Buttons extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleMaxDigit = this.handleMaxDigit.bind(this);
//     }
//     handleMaxDigit() {
//         if(this.props.state.currentValue.length == 21) {
//             this.props.setValue(Object.assign({}, this.props.state, {
//                 previousValue: this.props.state.currentValue
//             }));
//             this.props.setValue(Object.assign({}, this.props.state, {
//                 currentValue: "LIMIT REACHED!"
//             }));
//             setTimeout(() => {
//                 this.props.setValue(Object.assign({}, this.props.state, {
//                     currentValue: this.props.state.previousValue
//                 }));
//             }, 200);
//         }
//     }
//     componentDidMount() {
//         document.addEventListener("click", this.handleMaxDigit);
//     }
//     render() {
//         return (
//             <div>
//                 <button id="clear" value='AC' onClick={this.props.initialize} className='jumbo' style={clearStyle}>AC</button>
//                 <button id="divide" value='/' onClick={this.props.operators} style={operatorStyle}>/</button>
//                 <button id="multiply" value='x' onClick={this.props.operators} style={operatorStyle}>x</button>
//                 <button id="seven" className="number" value='7' onClick={this.props.numbers}>7</button>
//                 <button id="eight" value='8' className="number" onClick={this.props.numbers}>8</button>
//                 <button id="nine" value='9' className="number" onClick={this.props.numbers}>9</button>
//                 <button id="subtract" value='‑' onClick={this.props.operators} style={operatorStyle}>-</button>
//                 <button id="four" value='4' onClick={this.props.numbers}>4</button>
//                 <button id="five" value='5' onClick={this.props.numbers}>5</button>
//                 <button id="six" value='6' onClick={this.props.numbers}>6</button>
//                 <button id="add" value='+' onClick={this.props.operators} style={operatorStyle}>+</button>
//                 <button id="one" value='1' onClick={this.props.numbers}>1</button>
//                 <button id="two" value='2' onClick={this.props.numbers}>2</button>
//                 <button id="three" value='3' onClick={this.props.numbers}>3</button>
//                 <button id="zero" value='0' onClick={this.props.numbers} className="jumbo">0</button>
//                 <button id="decimal" value='.' onClick={this.props.decimal}>.</button>
//                 <button id="equals" value='=' onClick={this.props.evaluate} style={equalsStyle}>=</button>
//             </div>
//         );
//     }
// }
// class Output extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div id="display" className="outputScreen">
//                 {this.props.state.currentValue}
//             </div>
//         );
//     }
// }
// class Formula extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div className="formulaScreen">
//                 {this.props.state.formula}
//             </div>
//         );
//     }
// };
// class Calculator extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//                 <div className='calculator'>
//                     <FormulaContainer />
//                     <OutputContainer />
//                     <ButtonsContainer />
//                 </div>
//                 <div className="author">
//                     Coded By <a target="_blank" href="https://github.com/GaurisankarJ/">Sankar</a>
//                 </div>
//             </div>
//         );
//     }
// }

// //Map state, dispatch to props
// const mapStateToProps = (state) => {
//     return {
//         state: state
//     };
// };
// const mapDispatchToProps = (dispatch) => {
//     return {
//         initialize: () => {
//             dispatch(initializeAction());
//         },
//         numbers: (event) => {
//             dispatch(numbersAction(event));
//         },
//         decimal: () => {
//             dispatch(decimalAction());
//         },
//         operators: (event) => {
//             dispatch(operatorsAction(event));
//         }, 
//         evaluate: () => {
//             dispatch(evaluateAction());
//         },
//         setValue: (state) => {
//             dispatch(setValueAction(state));
//         }
//     };
// };

// //Connect Redux to React
// const ButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(Buttons);
// const FormulaContainer = connect(mapStateToProps, mapDispatchToProps)(Formula);
// const OutputContainer = connect(mapStateToProps, mapDispatchToProps)(Output);
// const Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);

// class Presentation extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <Provider store={store}>
//                 <Container />
//             </Provider>
//         );
//     }
// }
// ReactDOM.render(
//     <Presentation />,
//     document.getElementById("app")
// );


import React from "react";
import ReactDOM from "react-dom";
import { Motion, spring } from "react-motion";
import { range } from "lodash";

const tilesStyle = {
  listStyle: "none",
  margin: "0 auto",
  padding: 5,
  position: "relative"
};

const tileStyle = {
  backgroundColor: "grey",
  boxShadow: "inset 0 0 1px 0 black",
  boxSizing: "border-box",
  display: "block",
  padding: 6,
  position: "absolute"
};

const holeStyle = {
  opacity: 0
};

const buttonStyle = {
  display: "block",
  margin: "16px auto",
  padding: "8px 16px"
};

// Checks if the puzzle can be solved.
//
// Examples:
//   isSolvable([3, 7, 6, 0, 5, 1, 2, 4, 8], 3, 3) // => false
//   isSolvable([6, 4, 5, 0, 1, 2, 3, 7, 8], 3, 3) // => true
function isSolvable(numbers, rows, cols) {
  let product = 1;
  for (let i = 1, l = rows * cols - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (numbers[i - 1] - numbers[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

// Checks if the puzzle is solved.
//
// Examples:
//   isSolved([6, 4, 5, 0, 1, 2, 3, 7, 8]) // => false
//   isSolved([0, 1, 2, 3, 4, 5, 6, 7, 8]) // => true
function isSolved(numbers) {
  for (let i = 0, l = numbers.length; i < l; i++) {
    if (numbers[i] !== i) {
      return false;
    }
  }
  return true;
}

// Get the linear index from a row/col pair.
function getLinearPosition({ row, col }, rows, cols) {
  return parseInt(row, 10) * cols + parseInt(col, 10);
}

// Get the row/col pair from a linear index.
function getMatrixPosition(index, rows, cols) {
  return {
    row: Math.floor(index / cols),
    col: index % cols
  };
}

function getVisualPosition({ row, col }, width, height) {
  return {
    x: col * width,
    y: row * height
  };
}

function shuffle(numbers, hole, rows, cols) {
  do {
    numbers = _.shuffle(_.without(numbers, hole)).concat(hole);
  } while (isSolved(numbers) || !isSolvable(numbers, rows, cols));
  return numbers;
}

function canSwap(src, dest, rows, cols) {
  const { row: srcRow, col: srcCol } = getMatrixPosition(src, rows, cols);
  const { row: destRow, col: destCol } = getMatrixPosition(dest, rows, cols);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

function swap(numbers, src, dest) {
  numbers = _.clone(numbers);
  [numbers[src], numbers[dest]] = [numbers[dest], numbers[src]];
  return numbers;
}

class Tile extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { index } = this.props;
    this.props.onClick(index);
  }

  render() {
    const { hole, number, index, rows, cols, width, height } = this.props;
    const matrixPos = getMatrixPosition(index, rows, cols);
    const visualPos = getVisualPosition(matrixPos, width, height);
    const motionStyle = {
      translateX: spring(visualPos.x),
      translateY: spring(visualPos.y)
    };
    const style = {
      ...tileStyle,
      ...(number === hole ? holeStyle : {}),
      width,
      height
    };

    return (
      <Motion style={motionStyle}>
        {({ translateX, translateY }) => (
          <li
            style={{
              ...style,
              transform: `translate3d(${translateX}px, ${translateY}px, 0)`
            }}
            onClick={this.handleClick}
          >
            {number}
          </li>
        )}
      </Motion>
    );
  }
}

class Tiles extends React.Component {
  constructor(props) {
    super(props);

    const { rows, cols } = props;
    this.state = { numbers: _.range(0, rows * cols) };

    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleTileClick(index) {
    this.swap(index);
  }

  handleButtonClick() {
    this.shuffle();
  }

  shuffle() {
    const { hole, rows, cols } = this.props;
    const { numbers } = this.state;
    const shuffledNumbers = shuffle(numbers, hole, rows, cols);
    this.setState({ numbers: shuffledNumbers });
  }

  swap(tileIndex) {
    const { hole, rows, cols } = this.props;
    const { numbers } = this.state;
    const holeIndex = numbers.indexOf(hole);
    if (canSwap(tileIndex, holeIndex, rows, cols)) {
      const newNumbers = swap(numbers, tileIndex, holeIndex);
      this.setState({ numbers: newNumbers });
    }
  }

  render() {
    const { rows, cols, width, height } = this.props;
    const { numbers } = this.state;
    const solved = isSolved(numbers);
    const pieceWidth = Math.round(width / cols);
    const pieceHeight = Math.round(height / rows);
    const style = {
      ...tilesStyle,
      width,
      height
    };

    return (
      <div>
        <ul style={style}>
          {numbers.map((number, index) => (
            <Tile
              {...this.props}
              index={index}
              number={number}
              key={number}
              width={pieceWidth}
              height={pieceHeight}
              onClick={this.handleTileClick}
            />
          ))}
        </ul>
        <button style={buttonStyle} onClick={this.handleButtonClick}>
          {solved ? "Start" : "Restart"}
        </button>
      </div>
    );
  }
}

class Puzzle extends React.Component {
    render() {
        return (
          <div id="home">
            <div id="playground">
              <Tiles rows={3} cols={3} hole={8} width={300} height={300} />;
            </div>
          </div>
        );
    }
}

ReactDOM.render(<Puzzle />, document.getElementById("app"));
