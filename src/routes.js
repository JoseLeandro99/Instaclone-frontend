import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Pages
import Feed from './pages/feed';
import New from './pages/new';

export default function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/new" component={New} />
        </Switch>
    );
}