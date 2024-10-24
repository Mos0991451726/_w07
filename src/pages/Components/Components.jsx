import './Components.css'

import Counter from './Counter/counter'
import Add from './ADD/Add'
import Timer from './Timer/Timer'
import Temperatures from './Temperatures/Temperatures'

function Components() {
    return ( 
        <div className='components-container'>

        <h1>REACT COMPONENTS</h1>
  
          <div className='container'>
            <Counter />
            <Add aValue={10} bValue={20} className="container add"/>
            <Timer />
          </div>
          <div>
          <Temperatures />
          </div>
  
          <footer><span className='badge bg-dark'>นายภูวนาท ศรุตติ์ตานนทร์ 66065761</span></footer>
      </div>
  
     );
}

export default Components;