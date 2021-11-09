import React from "react";
import styles from './styles.module.scss'
import { NavLink } from "react-router-dom";

function Disabled(){



    return(
        <div className={styles.box_title}>
         
           <NavLink  to='/main' activeClassName={styles.chosen}><p className={styles.title}>Please get the sessionID</p></NavLink>
               
              
        </div>
    )
    }

export default Disabled