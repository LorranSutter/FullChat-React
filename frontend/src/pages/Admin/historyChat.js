import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import styles from './styles.module.css';

import HistoryTable from './historyTable';

const HistoryChat = () => {
    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [historyList, setHistoryList] = useState([]);
    const [selectedUser, setSelectedUser] = useState('All users');
    const [selectedRoom, setSelectedRoom] = useState('All rooms');
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        api
            .get('admin', { withCredentials: true })
            .then((res) => {
                setUserList(res.data.userList);
                setRoomList(res.data.roomList);
                setHistoryList(res.data.historyList);
            });
    }, []);

    useEffect(() => {
        try {
            api
                .get('/admin/partialHistory',
                    {
                        params: {
                            user: selectedUser == 'All users' ? undefined : selectedUser,
                            roomId: selectedRoomId == 'All rooms' ? undefined : selectedRoomId
                        },
                        withCredentials: true
                    })
                .then(res => {
                    setHistoryList(res.data);
                });
        } catch (error) {
            alert('Fail to request! Try again.');
        }

    }, [selectedUser, selectedRoom]);

    function handleChangeRoom(e) {
        const selectedRoomIndex = e.target.options.selectedIndex;
        setSelectedRoomId(e.target.options[selectedRoomIndex].getAttribute('id'));
        setSelectedRoom(e.target.value);
    }

    return (
        <main className={styles.history_container}>
            <div className={styles.room_filter}>
                <select
                    name="user-list"
                    id="User-list"
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}>
                    <option key={0} value={undefined}>All users</option>
                    {userList.map((user, key) => (
                        <option key={key + 1} value={user}>{user}</option>
                    ))}
                </select>
                <select
                    name="Room-list"
                    id="Room-list"
                    value={selectedRoom}
                    onChange={handleChangeRoom}>
                    <option key={0} id={undefined} value={undefined}>All rooms</option>
                    {roomList.map(room => (
                        <option key={room._id} id={room._id} value={room.name}>{room.name}</option>
                    ))}
                </select>
            </div>
            <div id="history-container">
                <HistoryTable historyList={historyList}></HistoryTable>
            </div>
        </main>
    );
}

export default HistoryChat;