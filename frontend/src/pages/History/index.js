import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import styles from './styles.module.css'

const Admin = () => {

    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    const [cookies, setCookie, removeCookie] = useCookies();

    const history = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.minWidth = "350px";
        document.body.style.minHeight = "475px";

        console.log('get request');
        console.log(cookies);
        api
            .get('admin', { withCredentials: true })
            .then((res) => {

                console.log('get response');
                console.log(res);

                setUserList(res.data.userList);
                setRoomList(res.data.roomList);
            })


    }, []);

    function handleClickLogout(e) {
        e.preventDefault();

        removeCookie('adminToken');

        history.push('/loginAdmin');
    }

    return (
        <>
            <header className={styles.header_container}>
                <h2>Admin Room</h2>
                <div>
                    {/* TODO href="/admin/socketEvents" */}
                    <a href="#">
                        <button>Socket Events</button>
                    </a>
                    <a onClick={handleClickLogout}>
                        <button>Logout</button>
                    </a>
                </div>
            </header>
            <main className={styles.history_container}>
                <div className={styles.room_filter}>
                    <select name="user-list" id="User-list">
                        <option key={0} value={undefined}>All users</option>
                        {userList.map((user, key) => (
                            <option key={key + 1} value={user}>{user}</option>
                        ))}
                    </select>
                    <select name="Room-list" id="Room-list">
                        <option key={0} value="All rooms">All rooms</option>
                        {roomList.map(room => (
                            <option key={room._id} value={room.name}>{room.name}</option>
                        ))}
                    </select>
                </div>
                <div id="history-container">
                </div>
            </main>
        </>
    );
}

export default Admin;