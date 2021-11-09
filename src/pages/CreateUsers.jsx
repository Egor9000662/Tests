import React, { useState, useEffect } from "react";
import Disabled from "../components/Disabled/disabled";
import styles from "../styles/createusers.module.scss";
import { Users } from "../services/Users";


function CreateUsers({ sessionId }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [cards, setItemsCard] = useState([]);
  const [listUsers, setListUSers] = useState("");
  const [modals, setModals] = useState(false);
  const [deleteUsers, setDeleteUsers] = useState(false);


  useEffect(() => {
    setListUSers(JSON.parse(JSON.stringify(localStorage)));
  }, [deleteUsers, cards]);

  const getValueName = (event) => {
    const result = event.target.value;
    setName(result);
  };
  const getValueJob = (event) => {
    const result = event.target.value;
    setJob(result);
  };


  const classDisabledBtn =
    name == "" && job == ""
      ? `${styles.box_btn} ${styles.disabled} `
      : `${styles.box_btn} `;



  const addUsersBtn = async () => {
    const result = await Users.CreateUser(name, job);
    const date = result.data.createdAt.slice(0, 10);
    const itemsCards = {
      nameUser: name,
      jobUser: job,
      dataUser: date,
      idUser: result.data.id,
    };
    localStorage.setItem(
      `${itemsCards.idUser}`,
      `${itemsCards.nameUser},${itemsCards.jobUser}`
    );
    setItemsCard((prevState) => [...prevState, itemsCards]);
    setName("");
    setJob("");
  };


  const delItem = (index, idUser) => {
    setItemsCard(cards.filter((_, i) => i !== index));
    localStorage.removeItem(idUser);
  };

  const openlistUsers = () => {
    if (Object.keys(listUsers).length == 0) {
      setModals(false);
    } else {
      setModals(true);
      setListUSers(JSON.parse(JSON.stringify(localStorage)));
    }
  };


  const delAllElementsLocalStorage = ()=>{
    localStorage.clear()
    setModals(false);
  }

  const delELemLocalStorage = (key) => {
    localStorage.removeItem(key);
    setDeleteUsers((prevState) => !prevState);
    cards.map((item, index) => {
      if (item.idUser == key) {
        setItemsCard(cards.filter((_, i) => i !== index));
      }
    });

    
    if (Object.keys(listUsers).length == 1) {
      setModals(false);
    }
  };

  if (sessionId == "") {
    return <Disabled />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.box_create_users}>
          <div className={styles.user_name}>
            
            <input type="text" onChange={getValueName} placeholder='Enter your user name' value={name} />
          </div>
          <div className={styles.user_job}>
            <input type="text" onChange={getValueJob} placeholder='Enter the user place of work' value={job} />
          </div>
          <div className={styles.box_buttons}>
            <div className={classDisabledBtn} onClick={addUsersBtn}>
              Add user
            </div>
            <div className={styles.box_btn} onClick={openlistUsers}>
              List users
            </div>
          </div>
        </div>
        <div className={styles.box_users}>
          {cards.map((item, index) => {
            return (
              <div className={styles.item} key={item.idUser}>
                <div className={styles.item_string}>
                  name: <p>{item.nameUser}</p>
                </div>
                <div className={styles.item_string}>
                  job:<p>{item.jobUser}</p>
                </div>
                <div className={styles.item_string}>
                  date:<p>{item.dataUser}</p>
                </div>
                <div
                  className={styles.btn_delte}
                  onClick={() => {
                    delItem(index, item.idUser);
                  }}
                >
                  DELETE
                </div>
              </div>
            );
          })}
          {modals && (
            <div className={styles.modal_container}>
              <div className={styles.second_box_modal}>
                <div className={styles.box_clouse}>
                  <div
                    className={styles.btn_modal}
                    onClick={() => {
                      setModals(false);
                    }}
                  >
                    clouse modal folders
                  </div>
                </div>
                <div className={styles.modal_box}>
                  {Object.keys(listUsers).map((item, index) => {
                    return (
                      <div className={styles.madal_item_user} key={index}>
                        <p>{index+1}.{listUsers[item]}</p>
                        <div className={styles.btn_remove}>
                          <div className={styles.btn_remove_item} onClick={() => delELemLocalStorage(item)}>
                           remove
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.box_clouse}>
                <div className={styles.btn_modal} onClick={delAllElementsLocalStorage}>Delet all elements</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default CreateUsers;
