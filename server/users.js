const users = []; //empty array

// ***************사용자 추가***************
const addUser = ({ id, name, room }) => {

    // trim()공백제거  toLowerCase()소문자로 변형
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // users 배열 안에 기존의 유저와 겹치는 유저가 있다면 
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return { error: 'UserName is taken' };
    }

    const user = { id, name, room };
    users.push(user);

    return { user }

}

// ***************사용자 제거***************
const removeUser = (id) => {

    // findIndex(callback) 아이디가 같은 사용자의 배열 번호를 가져옴
    // 없으면 -1

    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        // index에서 1개 요소 제거
        return users.splice(index, 1)[0];
    }
}

// ***************사용자 찾기***************
const getUser = (id) => {

    // find(callback)사용자 아이디가 같은 첫 번째 요소의 값. 사람을 찾는다 
    users.find((user) => user.id === id);

}

//***************
const getUsersInRoom = (room) => {

    // filter() room이 같은 사용자들을 모아 새로운 배열 생성
    users.filter((user) => user.room === room);

}

module.exports = {
    addUser, removeUser, getUser, getUsersInRoom
};