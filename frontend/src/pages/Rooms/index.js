import React from 'react';

import './styles.css'
import openedDoor from '../../img/opened-door.png';

const Login = () => {
    return (
        <>
            <header className="header-container">
                <div className="avatar-container">
                    <div className="username-container">
                        <h2>Username</h2>
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
                    {[1, 2, 3, 4, 5].map(x => (
                        <li>
                            <div className="room-data-container">
                                <h2>Room Name</h2>
                            </div>
                            <div className="door-button-container">
                                <a href="#">
                                    <button>
                                        <img src={openedDoor} alt="Get into the room" />
                                        <span className="Enter">Enter</span>
                                    </button>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default Login;