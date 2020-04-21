import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { socketUserDisconnected } from '../../services/socket';

import styles from './styles.module.css'
import Room from './room';

const Rooms = () => {

    const [rooms, setRooms] = useState([]);

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";

        try {
            api.get('rooms', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                //   'withCredentials':true
            }).then(res => {
                setRooms(res.data.roomsList);
            })
        } catch (error) {
            alert('Fail to login! Try again.');
        }
    }, []);

    // TODO emit socket.io change username
    // TODO clear cookies
    function handleClick(e) {
        e.preventDefault();

        socketUserDisconnected('Username Test');

        history.push('/');
    }

    return (
        <>
            <header className={styles.header_container}>
                <div className={styles.avatar_container}>
                    <div className={styles.username_container}>
                        <h2>Username</h2>
                        <a id="change-username" onClick={handleClick}>
                            <button>Change Username</button>
                        </a>
                    </div>
                    <div className={styles.avatar}>
                        <img src="#" alt="avatar" id="avatarImg" />
                    </div>
                </div>
            </header>
            <main className={styles.rooms_container}>
                <ul className={styles.rooms_list}>
                    {rooms.map(room => (
                        <Room key={room._id} name={room.name} roomId={room._id}></Room>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default Rooms;