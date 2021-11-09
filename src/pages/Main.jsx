
import React, { useState} from "react";
import Logo from "../images/logo.png";
import styles from "../styles/main.module.scss";
import { LoginUsers } from "../services/loginUser.js";


function Main({setSessionId}) {
const [login, setLogin] = useState("");
const [password, setPassword] = useState("");


 

const click = async (event) => {
    event.preventDefault()
     const result = await LoginUsers.LoginUser(login, password);
     const number = result.data.message;
     setSessionId(number)
    
  }

  const onLogin = (e) => {
    const { value } = e.target;
    setLogin(value);
  };
  const onPassword = (e) => {
    const { value } = e.target;
    setPassword(value);
 
  };

const  classNameBtn = login !== '' && password !== ''? `${styles.btn} `: `${styles.btn} ${styles.disabled}` 

  return (
    <div>
      <div className={styles.logotip_company}>
        <img src={Logo} className={styles.logo_img}/>
        <p className={styles.logo_text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nulla
          porro voluptates, cupiditate voluptatem quibusdam corporis repellat ab
          veniam ratione itaque atque ipsum!
        </p>
      </div>
      <div className={styles.box_title}>
        <p>Xiaomi cloud login</p>
      </div>
      <form action="" className={styles.form}>
        <div className={styles.form_box}>
          <div className={styles.box_form_email}>
            
            <input type="email" onChange={onLogin} placeholder='E-mail' value={login} />
          </div>
          <div className={styles.box_form_password}>
          
            <input type="password" placeholder='password' onChange={onPassword} value={password} />
          </div>
          <div className={styles.box_form_server}>
           
      
          </div>
          <div className="box_form_button">
            <button onClick={click} className={classNameBtn}>
            GET THE SESSION ID
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Main;
