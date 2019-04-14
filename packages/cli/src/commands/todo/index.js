import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';
import ListTodos from './list';

const Todo = ({ flags, match, onExit }) => (
    <Switch>
        <Route
            path={`${match.url}/add/:title?`}
            render={({ match }) => (
                <AddTodo
                    title={match.params.title}
                    onExit={onExit}
                    flags={flags}
                />
            )}
        />
        <Route
            path={`${match.url}/list`}
            render={() => <ListTodos onExit={onExit} flags={flags} />}
        />
        <Redirect from={`${match.url}/`} to={`${match.url}/list`} exact />
        <Route component={UnknownCommand} />
    </Switch>
);

export default Todo;
