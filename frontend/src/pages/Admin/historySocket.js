import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import styles from './styles.module.css';

import HistoryTable from './historyTable';
import Pagination from './pagination';

const HistorySocket = React.memo(() => {
    const [historyList, setHistoryList] = useState([]);
    const [page, setPage] = useState(0);
    const [countResults, setCountResults] = useState(0);

    const history = useHistory();

    useEffect(() => {
        try {
            api
                .get(`/admin/socketEvents?page=${page}`, { withCredentials: true })
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

    }, [page]);

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
            <span>{countResults} results found</span>
            <div id="history-container">
                <HistoryTable historyList={historyList}></HistoryTable>
                <Pagination handlePagination={handlePagination} />
            </div>
        </main>
    );
})

export default HistorySocket;