import React from 'react';

import './styles.css'
import Message from './message';

const Chat = () => {
    return (
        <>
            <header className="header-container">
                <h2>Room Name</h2>
                {/* TODO href="/rooms" */}
                <a href="#">
                    <button>Change Room</button>
                </a>
            </header>
            <main className="chat-container">
                <div className="chat-list-container">
                    {[1, 2, 3, 4, 5].map((x, key) => (
                        <Message
                            key={key}
                            user='Username'
                            msg='Message'
                            date='Some date'
                        ></Message>
                    ))}
                </div>
                <div className="input-msg-container">
                    <form action="#" id="chat-form" className="chat-form">
                        <input type="text" name="msg" id="msg" placeholder="Write your message..." autocomplete="off" />
                        <button>Send</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Chat;