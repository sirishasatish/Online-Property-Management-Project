import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/favorites/:userId" exact component={Home} />
                <Route path="/properties/:propertyId" exact component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;