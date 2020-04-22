import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import avatarWrong from '../../img/avatarWrong.png';

const SomethingWentWrong = () => {

    const history = useHistory();

    function handleClick(e) {
        history.push('/');
    }

    return (
        <div className={styles.container}>
            <img src={avatarWrong} alt="Wrong" />
            <h1>Something Went Wrong</h1>
            <button onClick={handleClick}>Go to initial page</button>
        </div>
    );
}

export default SomethingWentWrong;