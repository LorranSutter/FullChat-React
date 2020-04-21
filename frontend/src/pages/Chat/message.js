import React from 'react';
import moment from 'moment';

import styles from './styles.module.css';

const Message = (props) => {

    let msgOutput;

    if (props.joinLeftMsg) {
        msgOutput = (
            <span className={styles.user_join_left}>{`${props.user} ${props.msg}`}</span>
        );
    } else {

        const avatarLink = `https://avatars.dicebear.com/v2/gridy/${props.user}.svg?options[width][]=500&options[height][]=500`;

        msgOutput = (
            <div className={styles.chat_msg}>
                <img src={avatarLink} alt="Avatar" />
                <div className={styles.username_msg_wrapper}>
                    <span className={styles.username_msg}>{props.user}</span>
                    <span className={styles.msg}>{props.msg}</span>
                </div>
                <div className={styles.timestamp_msg}>
                    <span>{moment(props.date).format('MMM Do YY')}</span>
                    <span>{moment(props.date).format('hh:mm:ss a')}</span>
                </div>
            </div>
        );

    }

    return (
        <>
        { msgOutput }
        </>
    );
}

export default Message;