import {Link} from 'react-router-dom'

import Container from './Container'
import styles from './Navbar.module.css'

import logo from '../../img/costs_logo.png'

export default function Navbar(){
    return(
        <Container>
        <nav className={styles.navbar}>
          <Link to="/">
            <img src={logo} alt="Costs"/>
          </Link>
          <ui className={styles.list}>
            <li className={styles.item}>
          <Link to="/">Home</Link>
            </li>
            <li className={styles.item}>
          <Link to="/projects">Projects</Link>
            </li>
            <li className={styles.item}>
          <Link to="/company">Company</Link>  
            </li>
            <li className={styles.item}>
          <Link to="/contact">Contact</Link>
            </li>
          </ui>
        </nav>
        </Container>
    )
}