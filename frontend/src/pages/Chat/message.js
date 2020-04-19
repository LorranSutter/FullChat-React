import React from 'react';

import styles from './styles.module.css';

const Message = (props) => {

    const avatarLink = `https://avatars.dicebear.com/v2/gridy/${props.user}.svg?options[width][]=500&options[height][]=500`;

    return (
        <div className={styles.chat_msg}>
            <img src={avatarLink} alt="Avatar" />
            <div className={styles.username_msg_wrapper}>
                <span className={styles.username_msg}>{props.user}</span>
                <span className={styles.msg}>{props.msg}</span>
            </div>
            <div className={styles.timestamp_msg}>
                {/* TODO Include moment format */}
                {/* moment(msg.date).format('MMM Do YY') */}
                <span>{props.date}</span>
                {/* moment(msg.date).format('hh:mm:ss a') */}
                <span>{props.date}</span>
            </div>
        </div>
    );
}

export default Message;