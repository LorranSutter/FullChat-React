import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import styles from './styles.module.css';

import HistoryTable from './historyTable';

const HistorySocket = () => {
    const [historyList, setHistoryList] = useState([]);

    const history = useHistory();

    useEffect(() => {
        try {
            api
                .get('/admin/socketEvents', { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        setHistoryList(res.data);
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