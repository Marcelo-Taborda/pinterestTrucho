import { useState } from 'react'
import { NavLink as NavLinkReactRouter, Link, Route, Routes } from 'react-router-dom'
import './assets/styles/global.css'
import estilos from './assets/styles/header.module.scss'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Favoritos from './components/pages/Favoritos'
import Aleatorio from './components/pages/Aleatorio'
import Directorio from './components/pages/Directorio'
import Images from './components/pages/Images'
import axios from 'axios'
axios.defaults.withCredentials = true;

function App() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const NavLink = ({ children, to, ...props }) => {
    return (
      <NavLinkReactRouter
        {...props}
        to={to}
        className={({ isActive }) => isActive ? estilos.active : undefined}
      >{children}
      </NavLinkReactRouter>
    )
  }

  return (
    <>
      <header className={`${estilos.header} ${active ? estilos.activeMenu : ""}`} >
        <section className={estilos.mobileMode} >
          <h2>
              <Link to="/">
                  <div>Nombre<span>PRUEBA</span></div>
                  <label>solo lo mejor</label>
              </Link>
          </h2>
          <div className='right'>
            <Link className='bLogin' to={"/login"} >LOGIN</Link>
            <div className={`${estilos.menuButton} ${active ? estilos.active : ""}`} onClick={handleClick} >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>
        <nav className={estilos.navigation}>
          <NavLink to="/" onClick={handleClick}>INICIO</NavLink>
          <NavLink to="/directorio" onClick={handleClick}>FAVORITOS</NavLink>
          <NavLink to="/favoritos" onClick={handleClick}>MI PERFIL</NavLink>
          <NavLink to="/aleatorio" onClick={handleClick}>SUBIR</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/aleatorio" element={<Aleatorio /> } />
        <Route path="/directorio" element={<Directorio /> } />
        <Route path="/images/:id" element={<Images /> } />
      </Routes>
    </>
  )
}

export default App
