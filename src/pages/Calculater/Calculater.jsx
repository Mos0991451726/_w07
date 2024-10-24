import { useState } from 'react';

import './Calculater.css'


function Calculator() {
    const [result, setResult] = useState(0)
    const [lastClick, setLastClick] = useState()
    const [currentValue, setCurrentValue] = useState(0)
    const [operator, setOperator] = useState(null)
    const [previousValue, setPreviousValue] = useState(null)

    let newResult;

    const clear = () => {
        if (currentValue > 0) {
            setCurrentValue(0)
        } else {
            setResult(0)
            setCurrentValue(0)
            setPreviousValue(null)
            setOperator(null)
            setLastClick()
        }
    };

    const handleNumberClick = (num) => {
        currentValue === 0 ? setCurrentValue(num) : setCurrentValue((prev) => prev + num)
    };

    const handleOperatorClick = (op) => {
        if (currentValue) {
            setPreviousValue(parseFloat(currentValue))
            setCurrentValue(0)
        }
        setOperator(op)
    }

    const calculate = () => {
        if (operator && previousValue != null && currentValue) {
            const curr = parseFloat(currentValue)
            if (operator === '+') {
                newResult = previousValue + curr

            } else if (operator === '-') {
                newResult = previousValue - curr
            }
            setResult(newResult)
            setCurrentValue(0)
            setPreviousValue(newResult)
            setOperator(null)
        }
    }


    return (
        <div className='calculator'>
            <div id="background">
                <div id="history">
                    <span style={{ fontSize: '40px', color: 'rgb(161, 161, 161' }} className="history span"></span>
                </div>
                <div id="total">
                    <span className="total">
                        {currentValue || result}
                    </span>
                </div>
                <div id="numpad">
                    <div id="row1">
                        <button className="gray button" onClick={() => clear()}>
                            {currentValue === 0 ? 'AC' : 'C'}
                        </button>
                        <button className="gray1 button">±</button>
                        <button className="gray1 button">%</button>
                        <button className="orange1 button">÷</button>
                    </div>
                    <div id="row2">
                        <button className="black button" onClick={() => { handleNumberClick('7') }}>7</button>
                        <button className="black button" onClick={() => { handleNumberClick('8') }}>8</button>
                        <button className="black button" onClick={() => { handleNumberClick('9') }}>9</button>
                        <button className="orange1 button">x</button>
                    </div>
                    <div id="row3">
                        <button className="black button" onClick={() => { handleNumberClick('4') }}>4</button>
                        <button className="black button" onClick={() => { handleNumberClick('5') }}>5</button>
                        <button className="black button" onClick={() => { handleNumberClick('6') }}>6</button>
                        <button className={(lastClick === '-' ? "lastclick" : "orange ") + " button"} onClick={() => {
                            setLastClick('-')
                            handleOperatorClick('-')
                        }}>
                            -
                        </button>
                    </div>
                    <div id="row4">
                        <button className="black button" onClick={() => { handleNumberClick('1') }}>1</button>
                        <button className="black button" onClick={() => { handleNumberClick('2') }}>2</button>
                        <button className="black button" onClick={() => { handleNumberClick('3') }}>3</button>
                        <button className={(lastClick === '+' ? "lastclick" : "orange ") + " button"} onClick={() => {
                            setLastClick('+')
                            handleOperatorClick('+')
                        }}>
                            +
                        </button>
                    </div>
                    <div id="row5">
                        <button className="zero button" onClick={() => { handleNumberClick('0') }}>0</button>
                        <button className="black1 button">.</button>
                        <button className="specialorange button" onClick={() => {
                            calculate()
                            setLastClick()
                        }}>
                            =
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Calculator;