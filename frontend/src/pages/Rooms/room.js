import React from 'react';

import styles from './styles.module.css'
import openedDoor from '../../img/opened-door.png';

const Room = (props) => {
    return (
        <li>
            <div className={styles.room_data_container}>
                <h2>{props.name}</h2>
            </div>
            <div className={styles.door_button_container}>
                {/* TODO href=`chat/${room.id}` */}
                <a href="#">
                    <button>
                        <img src={openedDoor} alt="Get into the room" />
                        <span className={styles.Enter}>Enter</span>
                    </button>
                </a>
            </div>
        </li>
    );
}

export default Room;