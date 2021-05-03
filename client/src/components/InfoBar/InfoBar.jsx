import React from 'react';
import './InfoBar.css';
import { Link } from 'react-router-dom';

const closeIcon = '../../Icons/closeIcon.png';
const onlineIcon = '../../Icons/onlineIcon.png';

const InfoBar = ({ room }) => {
    return (
        <div className="infoBar">

            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="icon" className="onlineIcon" />
                <h3>{room}</h3>
            </div>

            <div className="rightInnerContainer">
                <Link to="/" >
                    <img src={closeIcon} alt="close" />
                </Link>
            </div>

        </div>
    )
}

export default InfoBar;
