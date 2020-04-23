import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import api from '../../services/api';
import socket from '../../services/socket';

import styles from './styles.module.css'
import Room from './room';

const Rooms = () => {

    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [rooms, setRooms] = useState([]);

    const [cookies, setCookie, removeCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.margin = "0";

        if (!cookies.username || !cookies.avatar) {
            history.push('/somethingWentWrong', { message: 'You must choose your user name first' });
            return function cleanup() { }
        }

        setUsername(cookies.username);
        setAvatar(cookies.avatar);

        try {
            api
                .get('rooms')
                .then(res => {
                    if (res.status === 200) {
                        setRooms(res.data.roomsList);
                    } else {
                        history.push('/somethingWentWrong');
                        return function cleanup() { }
                    }
                })
                .catch(err => {
                    history.push('/somethingWentWrong');
                    return function cleanup() { }
                });
        } catch (error) {
            alert('Fail to login! Try again.');
        }
    }, []);

    function handleClick(e) {
        e.preventDefault();

        socket.emit('disconnected', { username: username });

        removeCookie('username');
        removeCookie('avatar');

        history.push('/');
    }

    return (
        <>
            <header className={styles.header_container}>
                <div className={styles.avatar_container}>
                    <div className={styles.username_container}>
                        <h2>{username}</h2>
                        <button id="change-username" onClick={handleClick}>Change Username</button>
                    </div>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="avatar" id="avatarImg" />
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