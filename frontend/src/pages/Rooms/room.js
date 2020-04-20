import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import styles from './styles.module.css'
import openedDoor from '../../img/opened-door.png';

const Room = (props) => {

    const history = useHistory();

    function handleClick(e) {
        e.preventDefault();

        // api
        //     .get(`/chat/${props.roomId}`)
        //     .then(res => {
        //         console.log('chat response');
        //         console.log(res);
        //     })

        history.push(`/chat/${props.roomId}`);

        // console.log(props.roomId);
    }

    return (
        <li>
            <div className={styles.room_data_container}>
                <h2>{props.name}</h2>
            </div>
            <div className={styles.door_button_container}>
                {/* TODO href=`chat/${room.id}` */}
                <a onClick={handleClick}>
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