import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar({ tab , setTab , products, carts, setToken}) {
    return ( 
        <div className='navbar-container'>


            <Link to={'/home'}>
            <button 
                className={
                'btn ' + (tab === 'home' ? 'btn-primary' : 
                'btn-outline-primary')
                }
                onClick={() => setTab('home')}
                >
                    Home
                </button>
            </Link>

            <Link to={'/components'}>
            <button className={
                'btn ' + (tab === 'components' ? 'btn-primary' : 
                'btn-outline-primary')}
                onClick={() => setTab('components')}
                >
                    Components
                </button>
            </Link>    

            <Link to={'/calculater'}>
            <button className={
                'btn ' + (tab === 'calculater' ? 'btn-primary' : 
                'btn-outline-primary')}
                onClick={() => setTab('calculater')}
                >
                    Calculater
                </button>
            </Link>

            <Link to={'/animetion'}>
            <button className={
                'btn ' + (tab === 'animetion' ? 'btn-primary' : 
                'btn-outline-primary')}
                onClick={() => setTab('animetion')}
                >
                    Animetion
                </button>
            </Link>
                    
            <Link to={'/todo'}>
            <button className={
                'btn ' + (tab === 'todo' ? 'btn-primary' : 
                'btn-outline-primary')}
                onClick={() => setTab('todo')}
                >
                    Todo
                </button>
            </Link>


            <Link to={'/products'}>
            <button className={
                'btn ' + (tab === 'products' ? 'btn-primary' : 
                'btn-outline-primary')}
                onClick={() => setTab('products')}
                >
                    Products ({products.length})
                </button>
            </Link>

            <Link to={'/carts'}>
            <button className={
                'btn ' + (tab === 'carts' ? 'btn-primary' : 
                'btn-outline-primary')}
                onClick={() => setTab('carts')}
                >
                    Carts ({carts.length})
                </button>
            </Link>

            <button className='btn btn-outline-danger' style={{marginLeft:'1rem'}} 
            onClick={() => {setToken('')}}>Logout'</button>

        </div>
     );
}

export default Navbar;