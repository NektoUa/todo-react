import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
    return (
        // <MuiThemeProvider theme={theme}>
        <Router>
            <div>
                <Switch>
                    {/* <Route exact path="/" component={home} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </div>
        </Router>
        // </MuiThemeProvider>
    );
}

export default App

