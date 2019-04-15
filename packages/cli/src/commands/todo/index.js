import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';
import ListTodos from './list';
import Help from './help';

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
        <Route
            path={`${match.url}/help`}
            render={() => (
                <UnknownCommand command="todo">
                    <Help />
                </UnknownCommand>
            )}
        />
        // No match
        <Redirect to={`${match.url}/help`} />
    </Switch>
);

export default Todo;
