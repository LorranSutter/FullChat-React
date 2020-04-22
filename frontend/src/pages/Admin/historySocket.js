import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import styles from './styles.module.css';

import HistoryTable from './historyTable';

const HistorySocket = () => {
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        try {
            api
                .get('/admin/socketEvents', { withCredentials: true })
                .then(res => {
                    setHistoryList(res.data);
                });
        } catch (error) {
            alert('Fail to request! Try again.');
        }

    }, []);

    return (
        <main className={styles.history_container}>
            <div id="history-container">
                <HistoryTable historyList={historyList}></HistoryTable>
            </div>
        </main>
    );
}

export default HistorySocket;