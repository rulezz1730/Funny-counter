import React from "react";
import {NavLink} from "react-router-dom";
import styles from '../CounterApp.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <NavLink className={navData => `${styles.linkStyle} ${navData.isActive? styles.activeLink : ''}`} to="/1">
                <p>Counter 1</p>
            </NavLink>
            <NavLink className={navData => `${styles.linkStyle} ${navData.isActive? styles.activeLink : ''}`} to="/2">
                <p>Counter 2</p>
            </NavLink>
        </header>
    )
}

export default Header