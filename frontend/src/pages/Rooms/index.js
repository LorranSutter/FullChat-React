import React from 'react';

import './styles.css'
import Room from './room';

const Login = () => {
    return (
        <>
            <header className="header-container">
                <div className="avatar-container">
                    <div className="username-container">
                        <h2>Username</h2>
                        {/* href="/" */}
                        <a href="#" id="change-username">
                            <button>Change Username</button>
                        </a>
                    </div>
                    <div className="avatar">
                        <img src="#" alt="avatar" id="avatarImg" />
                    </div>
                </div>
            </header>
            <main className="rooms-container">
                <ul className="rooms-list">
                    {[1, 2, 3, 4, 5].map((x,key) => (
                        <Room key={key} name="Room Name"></Room>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default Login;