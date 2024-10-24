import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './App.css'


import Home from './pages/Home/Home'
import Todo from './pages/Todo/Todo'
import Layout from './layout/Layout/Layout'
import Calculater from './pages/Calculater/Calculater'
import Components from './pages/Components/Components'
import Products from './pages/Products/Products'
import Carts from './pages/Carts/Carts'
import Animetion from './pages/Animetion/Animetion'
import Login from './pages/Login/Login'

import { fetchProducts } from './data/products'
import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'


//app --> layout --> navber 
//***
function App() {

  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => {
    setProducts(fetchProducts)
  }, [])

  useEffect(() => console.log(products), [products])

  const firstTab = 'home'
  const [tab, setTab] = useState('')

  useEffect(() => {
    setTab(firstTab)
  }, []) //first load

  if (token === '') {
    return <Login setToken={setToken} setRole={setRole} />
  } else {
    return (
      <div className='app-container'>
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} carts={carts} tab={tab} setTab={setTab}  setToken={setToken} role={role}/>}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/home'} element={<Home />} />
              <Route path={'/calculater'} element={<Calculater />} />
              <Route path={'/animetion'} element={<Animetion />} />
              <Route path={'/components'} element={<Components />} />
              <Route path={'/todo'} element={<Todo />} />
              <Route path={'/products'} element={<Products products={products} carts={carts} setCarts={setCarts} />} />
              <Route path={'/carts'} element={<Carts carts={carts} setCarts={setCarts}/>} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }

}

export default App
