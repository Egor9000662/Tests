import React, { useState, useCallback, useRef } from "react";
import Disabled from "../components/Disabled/disabled";
import styles from "../styles/random.module.scss";
import { Users } from "../services/Users";

function RandomUsers({sessionId}) {
  const [openModal, setOpenModal] = useState(false);
  const [numbersUser, setNumberUser] = useState("");
  const [listuser, setListUser] = useState("");
  const [randomuser, setRandomUser] = useState("");
  const timerRef = useRef(null);

  const onChange = (e) => {
    setNumberUser(e.target.value);
  };

  const getAllusers = async () => {
    const result = await Users.RandomUser(20);
    const data = result.data.results;
    setListUser(data);
    setOpenModal(null);
  };
  const getNumberUsers = async () => {
    const result = await Users.RandomUser(numbersUser);
    const data = result.data.results;
    setListUser(data);
    setNumberUser("");
    setOpenModal(false);
  };

  const addLocaStorage = (email, firstName, lastName, id) => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    if (id != null) {
      localStorage.setItem(`${id}`, `${lastName},${firstName},${email}`);
    } else {
      id = getRandomInt(1000);
      localStorage.setItem(`${id}`, `${lastName},${firstName},${email}`);
    }
  };

  const getRandomUser = useCallback(() => {
    setListUser('')
    const randomApi = async () => {
      const result = await Users.RandomUsers();
      setRandomUser(result.data.results);
    };

    timerRef.current = setInterval(randomApi, 2000);
  }, []);
  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const getOpenModal = () => {
    setOpenModal(true);
    stop()
    setRandomUser(null)
  };

  const stopRandomUsers =()=>{
    stop()
  }
 
  if (sessionId === "") {
    return <Disabled />;
  } else {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.get_btn} onClick={getOpenModal}>
          All users
        </div>
        <div className={styles.get_btn} onClick={getRandomUser}>
          Random user
        </div>
      </div>
      {openModal && (
        <div className={styles.modal_container}>
          <div className={styles.modal}>
            <div className={styles.box}>
              <div className={styles.btn_all_users_list} onClick={getAllusers}>
              Show all available users
              </div>
              <div className={styles.get_numbers}>
                <input
                  value={numbersUser}
                  onChange={onChange}
                  type="numbers"
                  placeholder="Enter the number of users"
                  className={styles.numbers_users}
                />
                <div onClick={getNumberUsers} className={styles.btn_send}>
                  send
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.main}>
        {listuser &&
          listuser.map((item, index) => {
            return (
              <div
                className={styles.item_box}
                key={index}
                onClick={() => {
                  addLocaStorage(
                    item.email,
                    item.name.first,
                    item.name.last,
                    item.id.value
                  );
                }}
              >
                <div className={styles.addlocalStorage}> <span>Add LocaStorage</span>
                </div>
                <img src={item.picture.large} alt="avatar" />
                <div className={styles.contacts}>Contacts</div>
                <div className={styles.box_contacts}>
                  <div className={styles.phone}>phone:{item.cell}</div>
                  <div className={styles.email}>{item.email}</div>
                  <div className={styles.last_name}>
                    name:{item.name.last} {item.name.first}({item.dob.age})
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.container_randomusers}>
        {randomuser && (
          <div className={styles.container_random_cards}>
          <div className={styles.random_cards}>
            <img src={randomuser[0].picture.large} alt="" />
            <div className={styles.contacts}>Contacts</div>
            <div className={styles.box_contacts}>
            <div className={styles.phone}>phone:{randomuser[0].cell}</div>
            <div className={styles.email}>{randomuser[0].email}</div>
            <div className={styles.last_name}>
              name:{randomuser[0].name.last} {randomuser[0].name.first}
             <p>age: {randomuser[0].dob.age}</p>
            </div>
            </div>
          </div>
          <div className={styles.box_btn}>
          <div className={styles.btn}
           onClick={() => {
            addLocaStorage(
              randomuser[0].email,
              randomuser[0].name.first,
              randomuser[0].name.last,
              randomuser[0].id.value
            );
          }}  >ADD</div>
          <div className={styles.btn} onClick={stopRandomUsers} >STOP</div>
          </div>
          </div>

        )}
      </div>
    </div>
  );
        }
}
export default RandomUsers;
