import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css'
import openedDoor from '../../img/opened-door.png';

const Room = (props) => {

    const history = useHistory();

    function handleClick(e) {
        e.preventDefault();

        history.push(`/chat/${props.roomId}`);
    }

    return (
        <li>
            <div className={styles.room_data_container}>
                <h2>{props.name}</h2>
            </div>
            <div className={styles.door_button_container}>
                <button onClick={handleClick}>
                    <img src={openedDoor} alt="Get into the room" />
                    <span className={styles.Enter}>Enter</span>
                </button>
            </div>
        </li>
    );
}

export default Room;