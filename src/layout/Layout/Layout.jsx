import { Outlet } from 'react-router';

import Navbar from '../Navber/Navbar';
import Footer from '../Footer/Footer';
import Headers from '../Header/Header';

import './Layout.css'

function Layout({ tab, setTab ,products, carts ,setToken}) {
    return ( 
        <div>
            <Headers />
            <Navbar tab={tab} setTab={setTab} products={products} carts={carts} setToken={setToken}/>
            <Outlet />
            <Footer />
        </div>
     );
}

export default Layout