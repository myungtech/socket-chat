import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input type="text" placeholder="NAME" className="joinInput" onChange={(e) => setName(e.target.value)} /></div>
                <div><input type="text" placeholder="ROOM" className="joinInput" onChange={(e) => setRoom(e.target.value)} /></div>
                <Link
                    onClick={(e) => { return (!name || !room) ? e.preventDefault() : null }}
                    to={{
                        pathname: "/chat",
                        search: `?name=${name}&room=${room}`,
                        hash: "",
                        state: {
                            name: `${name}`,
                            room: `${room}`
                        }
                    }}
                >
                    <button className="button" type="submit">로그인</button>
                </Link>
            </div>
        </div >
    )
}

export default Join;
