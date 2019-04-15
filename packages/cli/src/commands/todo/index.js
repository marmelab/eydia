import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';
import ListTodos from './list';

const Todo = ({ match, onExit }) => (
    <Switch>
        <Route
            path={`${match.url}/add/:title?`}
            render={({ match }) => (
                <AddTodo title={match.params.title} onExit={onExit} />
            )}
        />
        <Route
            path={`${match.url}/list`}
            render={() => <ListTodos onExit={onExit} />}
        />
        <Redirect from={`${match.url}/`} to={`${match.url}/list`} exact />
        <Route component={UnknownCommand} />
    </Switch>
);

export default Todo;
