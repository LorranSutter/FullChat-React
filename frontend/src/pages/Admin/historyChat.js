import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import styles from './styles.module.css';

import HistoryTable from './historyTable';
import Pagination from './pagination';

const HistoryChat = () => {
    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [countResults, setCountResults] = useState(0);
    const [historyList, setHistoryList] = useState([]);
    const [selectedUser, setSelectedUser] = useState('All users');
    const [selectedRoom, setSelectedRoom] = useState('All rooms');
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [page, setPage] = useState(0);

    const history = useHistory()

    useEffect(() => {
        api
            .get('admin', { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    setUserList(res.data.userList);
                    setRoomList(res.data.roomList);
                } else {
                    history.push('/somethingWentWrong');
                    return function cleanup() { }
                }
            })
            .catch(err => {
                history.push('/somethingWentWrong', { 'message': err });
                return function cleanup() { }
            });
    }, []);

    useEffect(() => {
        getData();
    }, [selectedUser, selectedRoom, selectedRoomId, page]);

    function getData() {
        try {
            api
                .get(`/admin/partialHistory?page=${page}`,
                    {
                        params: {
                            user: selectedUser === 'All users' ? undefined : selectedUser,
                            roomId: selectedRoomId === 'All rooms' ? undefined : selectedRoomId
                        },
                        withCredentials: true
                    })
                .then(res => {
                    if (res.status === 200) {
                        setCountResults(res.data.countHistoryList);
                        setHistoryList(res.data.historyList);
                    } else {
                        history.push('/somethingWentWrong');
                        return function cleanup() { }
                    }
                })
                .catch(err => {
                    history.push('/somethingWentWrong', { 'message': err });
                    return function cleanup() { }
                });
        } catch (error) {
            alert('Fail to request! Try again.');
        }
    }

    function handleChangeRoom(e) {
        const selectedRoomIndex = e.target.options.selectedIndex;
        setSelectedRoomId(e.target.options[selectedRoomIndex].getAttribute('id'));
        setSelectedRoom(e.target.value);
    }

    function handlePagination(command) {
        if (command === -1) {
            if (page > 0) {
                setPage(page => page - 1);
            }
        } else if (command === 1) {
            if ((page + 1) * 10 < countResults) {
                setPage(page => page + 1);
            }
        } else if (command === 'first') {
            setPage(0);
        } else if (command === 'last') {
            if (countResults % 10 === 0) {
                setPage(parseInt(countResults / 10) - 1);
            } else {
                setPage(parseInt(countResults / 10));
            }
        }
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
                <span>{countResults} results found</span>
            </div>
            <div id="history-container">
                <HistoryTable historyList={historyList}></HistoryTable>
                <Pagination handlePagination={handlePagination} />
            </div>
        </main>
    );
}

export default HistoryChat;