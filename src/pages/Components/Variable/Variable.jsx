import { useState } from 'react'
import './Variable.css'

function Variable({type, name, value, setValue}) {

    //    read      write           initial
    // const [value, setValue] = useState(props.value || 0)
    // let _value = value || 0


    return (
        <div className="counter-container">
            <h3 className='title'>{name || 'VARIABLE'}</h3>
            <button className='btn btn-danger' onClick={() => setValue(value - 1)}>-</button>
            <span className='value'>{type && type === 'int' ? value : (typeof value === 'number' ? value.toFixed(2) : 'N/A')}</span>
            <button className='btn btn-success' onClick={() => setValue(value + 1)}>+</button>
        </div>
    );
}


export default Variable;
