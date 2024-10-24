import React, { useState } from 'react'
import './Temperatures.css';
import Variable from '../Variable/variable';
function Temperatures() {
    const [celsius, setCelsius] = useState(25.00);
    const [fahrenheit, setFahrenheit] = useState(75.00);
    const [kelvin, setKelvin] = useState(298.15);

    function setCelsiusValue(value) {
        setCelsius(value);
        setFahrenheit((value * 9 / 5) + 32);
        setKelvin(value + 273.15);
    }

    function setFahrenheitValue(value) {
        setFahrenheit(value);
        setCelsius((value - 32) * 5 / 9);
        setKelvin(((value - 32) * 5 / 9) + 273.15);
    }

    function setKelvinValue(value) {
        setKelvin(value);
        setCelsius((value - 273.15) * 9 / 5 + 32);
        setFahrenheit(((value - 273.15) * 9 / 5) + 32);
    }

    return (
        <div className='temperatures-container'>
            <h3 className='temperatures-title'>Temperatures</h3>
            <h3><span className='badge bg-primary'>{celsius}</span> 
                <span className='badge bg-primary'>{fahrenheit}</span>
                <span className='badge bg-primary'>{kelvin}</span>
                </h3>
            <div className='temperatures-variables'>
                <Variable name={"Celsius"} value={celsius} setValue={setCelsiusValue}/>
                <Variable name={"Fahrenheit"} value={fahrenheit} setValue={setFahrenheitValue}/>
                <Variable name={"Kelvin"} value={kelvin} setValue={setKelvinValue}/>
            </div>
        </div>
    );
}

export default Temperatures;