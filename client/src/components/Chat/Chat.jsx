import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import './Chat.css';

let socket;
const ENDPOINT = 'http://localhost:5000';

const Chat = () => {

    const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');


    useEffect(() => {
        const { name, room } = location.state;

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);

        // join 이벤트 요청
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.state]);

    useEffect(() => {

        //message 이벤트 요청
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        //roomData 이벤트 요청
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [messages]);

    //function for sending messages
    const sendMessage = (e) => {

        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    )
}

export default Chat;
