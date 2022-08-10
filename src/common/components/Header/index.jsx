import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styles from "./style.module.css"

function Header() {
  const history = useHistory();

  const goToHome = () => {
    history.push("/")
  }

  return (
    <div className={styles.header}>
        <span onClick={goToHome} className={styles.logo}>CyberMovie</span>
        <nav className={styles.navbar}>
            <NavLink to="/" activeClassName={styles.active} exact>Home</NavLink>
            <NavLink to="/movies" activeClassName={styles.active}>Movies</NavLink>
            <NavLink to="/signin" activeClassName={styles.active}>Sign in</NavLink>
            <NavLink to="/signup" activeClassName={styles.active}>Sign up</NavLink>
        </nav>
    </div>
  )
}

export default Header