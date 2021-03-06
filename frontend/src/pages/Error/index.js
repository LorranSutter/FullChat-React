import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import avatarWrong from '../../img/avatarWrong.png';

const SomethingWentWrong = (props) => {

    const history = useHistory();

    let message;

    if (props.location.state) {
        message = props.location.state.message
    } else {
        message = 'Something Went Wrong'
    }

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#e5e5e5";
        document.body.style.margin = "0";
    }, []);

    function handleClick(e) {
        history.push('/');
    }

    return (
        <div className={styles.container}>
            <img src={avatarWrong} alt="Wrong" />
            <h1>{message}</h1>
            <button onClick={handleClick}>Go to initial page</button>
        </div>
    );
}

export default SomethingWentWrong;