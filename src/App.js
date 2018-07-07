import React from 'react';
import './App.css';

const Button = (props) => {
  return(
    <button onClick={props.function} className={props.cl} id={props.id}>{props.value}</button>
  );
}

const Buttons = (props) => {
  return(
    <div className="Buttons">
      <Button cl="ButtonNumbers" value="7" id="button_7" function={() => props.number(7)} />
      <Button cl="ButtonNumbers" value="8" id="button_8" function={() => props.number(8)} />
      <Button cl="ButtonNumbers" value="9" id="button_9" function={() => props.number(9)} />
      <Button cl="ButtonNumbers" value="+" id="button_+" function={() => props.operator("+")}/>
      <Button cl="ButtonNumbers" value="4" id="button_4" function={() => props.number(4)} />
      <Button cl="ButtonNumbers" value="5" id="button_5" function={() => props.number(5)} />
      <Button cl="ButtonNumbers" value="6" id="button_6" function={() => props.number(6)} />
      <Button cl="ButtonNumbers" value="-" id="button_-" function={() => props.operator("-")}/>
      <Button cl="ButtonNumbers" value="1" id="button_1" function={() => props.number(1)} />
      <Button cl="ButtonNumbers" value="2" id="button_2" function={() => props.number(2)} />
      <Button cl="ButtonNumbers" value="3" id="button_3" function={() => props.number(3)} />
      <Button cl="ButtonNumbers" value="*" id="button_*" function={() => props.operator("*")}/>
      <Button cl="ButtonNumbers" value="C" id="button_C" function={props.clear}/>
      <Button cl="ButtonNumbers" value="0" id="button_0" function={() => props.number(0)} />
      <Button cl="ButtonNumbers" value="=" id="button_=" function={props.equal}/>
      <Button cl="ButtonNumbers" value="/" id="button_/" function={() => props.operator("/")}/>
    </div>
  );
}

const Text = (props) => {
  return(
    <div className="Result">
      <p className="ResultText">{props.firstNumber} {props.operator} {props.secondNumber} {props.resultNumber && `=`} {props.resultNumber}</p>
    </div>
  )
}

class App extends React.Component{
constructor(props){
  super(props);
  this.state ={
    firstNumber: null,
    secondNumber: null,
    operator: null,
    resultNumber: null
  }
}

  number = (num) => {
    if(this.state.firstNumber === null){
      this.setState(() => {
       if(num !== 0) return({ firstNumber: num })
      });
    }else if(this.state.operator === null){
      this.setState(prevState => ({
        firstNumber: parseFloat(`${prevState.firstNumber}${num}`)
      }));
    }else if(this.state.operator !== null && this.state.resultNumber === null){
      if(this.state.secondNumber === null){
        this.setState(() => {
          if(num !== 0) return({ secondNumber: num })
         });
      }else{
        this.setState(prevState => ({
          secondNumber: parseFloat(`${prevState.secondNumber}${num}`)
        }));
      }
    }else if(this.state.resultNumber !== null){
      if(num === 0) return;
      this.setState({
        firstNumber: num,
        secondNumber: null,
        operator: null,
        resultNumber: null,
      })
    }
    
  }
  operator = (op) => {
    if(this.state.firstNumber !== null && this.state.secondNumber === null){
      this.setState({
        operator: op
      })
    }else if(this.state.resultNumber !== null){
      this.setState(prevState => ({
        firstNumber: prevState.resultNumber,
        secondNumber: null,
        operator: op,
        resultNumber: null
      }));
    }else if(this.state.firstNumber !== null && this.state.secondNumber !== null && this.state.resultNumber === null){
      this.setState({
        operator: op
      });
    }

  }
  equal = () => {
    if(this.state.firstNumber !== null && this.state.secondNumber !== null && this.state.operator !== null){
      this.setState(prevState => {
        switch(prevState.operator){
          case "+":
            return ({resultNumber: prevState.firstNumber + prevState.secondNumber});
          break;
          case "-":
          return ({resultNumber: prevState.firstNumber - prevState.secondNumber});
          break;
          case "*":
          return ({resultNumber: prevState.firstNumber * prevState.secondNumber});
          break;
          case "/":
          return ({resultNumber: prevState.firstNumber / prevState.secondNumber});
          break;
        }
      });
    }
  }
  clear = () => {
    this.setState({
      firstNumber: null,
      secondNumber: null,
      operator: null,
      resultNumber: null
    })
  }
  render(){
    return(
        <div className="Calculator">
          <Text 
          firstNumber={this.state.firstNumber}
          secondNumber={this.state.secondNumber}
          resultNumber={this.state.resultNumber}
          operator={this.state.operator}
          />
          <Buttons 
          number={this.number} 
          operator={this.operator}
          equal={this.equal}
          clear={this.clear}
          />
        </div>
    );
  };
}

export default App;
