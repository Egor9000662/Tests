import React, { useState, useEffect } from "react";
import Disabled from "../components/Disabled/disabled";
import styles from "../styles/udateusers.module.scss";
import { Users } from "../services/Users";

function ListUsers(sessionId) {
  const [arrUser, setArrUser] = useState([]);
  const [cardUser, setCardUsers] = useState("");

  useEffect(() => {
    const listUser = async () => {
      const result = await Users.getUsersList();
      setArrUser(result.data.data);
      const defaultCards = await  Users.UsersCard(1)
      setCardUsers(defaultCards.data.data)
    };
    listUser();
  }, []);

  const hendleclick = async (id) => {
    const result = await Users.UsersCard(id);
    setCardUsers(result.data.data);
  };

  console.log(arrUser);
  if (sessionId == "") {
    return <Disabled />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.box_list_users}>
          {arrUser.map((item, index) => {
            return (
              <div
                className={styles.box_item}
                key={index}
                onClick={() => {
                  hendleclick(item.id);
                }}
              >
                <div className={styles.name_user}>
                  <span>{item.first_name} {item.last_name}</span>
                </div>
            
              </div>
            );
          })}
        </div>

        
          <div className={styles.carduser_users}>
            <img src={cardUser.avatar} alt="" />
            <div className={styles.contacts}>Contacts User</div>
            <div className={styles.box_contacts}>
              <div className={styles.email_user}>
                email: <p>{cardUser.email}</p>
              </div>
              <div className={styles.first_name_user}>
                First name: <p> {cardUser.first_name}</p>
              </div>
              <div className={styles.last_name_user}>
                Last name: <p> {cardUser.last_name}</p>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}
export default ListUsers;
