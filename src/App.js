import React,{useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import styles from "./styles/app.module.scss"

import Main from "./pages/Main";
import ListUsers from "./pages/ListUsers";
import Timer from "./pages/Timer";
import CreateUsers from "./pages/CreateUsers";



function App() {
  const [sessionId,setSessionId] = useState('')
  const [flag,setflag] = useState(false)
 
useEffect(()=>{
  if(sessionId !== ''){
  return setflag(true)
  }
},[sessionId])

  return (
    <div className={styles.globla_container}>
      <Router>
       <div className={styles.container}>
        <header>
          <ul className={styles.navigation} >
            <li>
              <NavLink  to='/main' activeClassName={styles.chosen}  >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink to='/CreateUsers' activeClassName={styles.chosen}>
               Create users
              </NavLink>
            </li>
            <li>
              <NavLink to='/ListUsers' activeClassName={styles.chosen}>
              List Users
              </NavLink>
            </li>
            <li>
              <NavLink to='/Timer' activeClassName={styles.chosen}>
               Timer
              </NavLink>
            </li>
          </ul>
        </header>

        <main>
          <Switch>
             <Route exact path='/main' component={()=><Main setSessionId={setSessionId}  sessionId={sessionId} />} /> 
             <Route exact path='/CreateUsers' component={()=><CreateUsers sessionId={sessionId} />}/>
             <Route exact path='/ListUsers' component={()=><ListUsers sessionId={sessionId} />}/>
             <Route exact path='/Timer' component={() =><Timer sessionId={sessionId} />}/>
          </Switch>
        </main>
        </div>
      </Router>
      {flag && (
          <div className={styles.box_result}>
         
        <div className={styles.box_form_id_users}>
          <label>ID session</label>
          <input type="text" readOnly value={sessionId}  />
        </div>
        </div>
       
      )}


    </div>
   
  );
}

export default App;
