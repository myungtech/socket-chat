import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Join />
                </Route>
                <Route path="/chat" exact>
                    <Chat />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
