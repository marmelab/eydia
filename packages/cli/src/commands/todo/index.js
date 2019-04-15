import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';
import ListTodos from './list';
import Help from './help';
import TodoAddHelp from './add/help';
import TodoListHelp from './list/help';
import HelpHowTo from '../../help-how-to';
import { HELP_ROUTE } from '../../constants';

const Todo = ({ flags, match, onExit }) => (
    <Switch>
        {/*
            Using the HELP_ROUTE allows us to accept commands such as `eydia add help`
            which will add a todo with title `help`
        */}
        <Route
            path={`${match.url}/add/${HELP_ROUTE}`}
            render={() => <TodoAddHelp showFlags />}
        />
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
            path={`${match.url}/list/${HELP_ROUTE}`}
            render={() => <TodoListHelp showFlags />}
        />
        <Route
            path={`${match.url}/list`}
            render={() => <ListTodos onExit={onExit} flags={flags} />}
        />
        <Redirect from={`${match.url}/`} to={`${match.url}/list`} exact />
        <Route
            path={`${match.url}/${HELP_ROUTE}`}
            render={() => (
                <>
                    <Help showDefaultFlags />
                    <HelpHowTo />
                </>
            )}
        />
        // No match
        <Route
            render={() => (
                <UnknownCommand>
                    <Help />
                    <HelpHowTo />
                </UnknownCommand>
            )}
        />
    </Switch>
);

export default Todo;
