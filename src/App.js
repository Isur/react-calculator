import React from 'react';
import './App.css';
import _ from 'lodash';


const Equal = (props) =>{
    return(<div>
      <button onClick={props.equal}> = </button>
      <p> {props.result}</p></div>
    );
}


const Operators = (props) =>{
  return(
    <div>
      <button onClick={() => props.setOperator("+")}> + </button>
      <button onClick={() => props.setOperator("-")}> - </button>
      <button onClick={() => props.setOperator("/")}> / </button>
      <button onClick={() => props.setOperator("*")}> * </button>
    </div>
  );
}

const Result = (props) =>{
  return(
    <h3> {props.firstNumber} {props.operator} {props.secondNumber} = {props.result} </h3>
  );
}

const Form = () =>{
  return(
    <form>
      <input placeholder="Input your number" />
    </form>
  );
}

const Numbers = (props) =>{
  return(
    <div className="Numbers"> 
    {_.range(1,10).map(i =>
       <button key={i} onClick={() => props.setNumber(i)}>{i}</button>
      )}
    </div>
  )
}

class App extends React.Component {
  state = {
    a: null,
    b: null,
    result: null,
    operator: null,
  }

  setNumber = (number) =>{
    this.setState(prevState => {
      if(prevState.a === null){
        return {a: number};
      }else if(prevState.operator !== null){
        return {b: number};
      }
    });
  }

  setOperator = (operator) =>{
    this.setState(prevState => {
      if(prevState.a === null){
        return;
      }
      return {operator: operator};
    });
  }
  calculate = () =>{
    this.setState(prevState => {
      if(prevState.operator !== null && prevState.a !== null && prevState.b !== null){
        if(prevState.operator === "+"){
          return{result: prevState.a + prevState.b}
        }
        if(prevState.operator === "-"){
          return{result: prevState.a - prevState.b}
        }
        if(prevState.operator === "*"){
          return{result: prevState.a * prevState.b}
        }
        if(prevState.operator === "/"){
          return{result: prevState.a / prevState.b}
        }
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Numbers 
            setNumber={this.setNumber} />
        <Form />
        <Operators setOperator={this.setOperator} />
        <Result 
            firstNumber={this.state.a} 
            secondNumber={this.state.b} 
            operator={this.state.operator} 
            result={this.state.result} />
            <Equal 
                result={this.state.result}
                equal={this.calculate} />
      </div>
    );
  }
}

export default App;
