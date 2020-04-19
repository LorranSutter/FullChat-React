import React from 'react';

import './styles.css';

const Message = (props) => {

    const avatarLink = `https://avatars.dicebear.com/v2/gridy/${props.user}.svg?options[width][]=500&options[height][]=500`;

    return (
        <div className="chat-msg">
            <img src={avatarLink} alt="Avatar" />
            <div className="username-msg-wrapper">
                <span className="username-msg">{props.user}</span>
                <span className="msg">{props.msg}</span>
            </div>
            <div className="timestamp-msg">
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