import React from 'react';

import './styles.css'
import openedDoor from '../../img/opened-door.png';

const Room = (props) => {
    return (
        <li>
            <div className="room-data-container">
                <h2>{props.name}</h2>
            </div>
            <div className="door-button-container">
                {/* href=`chat/${room.id}` */}
                <a href="#">
                    <button>
                        <img src={openedDoor} alt="Get into the room" />
                        <span className="Enter">Enter</span>
                    </button>
                </a>
            </div>
        </li>
    );
}

export default Room;