import React from 'react';
import { render, AppContext } from 'ink';
import BigBox from 'ink-box';
import meow from 'meow';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createMemoryHistory } from 'history';

import Init from './commands/init';
import HelpInit from './commands/init/help';
import Todo from './commands/todo';
import UnknownCommand from './unknown-command';
import Help from './help';
import { HELP_ROUTE } from './constants';

const cli = meow({
    flags: {
        debug: {
            type: 'boolean',
        },
    },
});

// It needs a leading backslash
// We simply join each commands with a backslash
// Example: eydia todo add
// initialRoute = /todo/add
const initialRoute = `/${cli.input.join('/')}`;

const history = createMemoryHistory({
    initialEntries: [initialRoute],
});

const Root = ({ onExit }) => {
    return (
        <>
            <BigBox
                borderStyle="round"
                borderColor="cyan"
                padding={1}
                width="100%"
            >
                Eydia - Share Knowledge without friction
            </BigBox>
            <Router history={history}>
                <Switch>
                    <Route
                        path="/todo"
                        render={({ match }) => (
                            <Todo
                                match={match}
                                onExit={onExit}
                                flags={cli.flags}
                            />
                        )}
                    />
                    <Route
                        path={`/init/${HELP_ROUTE}`}
                        render={() => <HelpInit showFlags />}
                    />
                    <Route
                        path="/init"
                        render={({ match }) => (
                            <Init
                                match={match}
                                onExit={onExit}
                                flags={cli.flags}
                            />
                        )}
                    />
                    <Route
                        path="/help/:command*"
                        render={({ match }) => <Help match={match} />}
                    />
                    <Redirect from="/" to="/init" exact />
                    // No match
                    <Route
                        render={() => (
                            <UnknownCommand>
                                <Help />
                            </UnknownCommand>
                        )}
                    />
                </Switch>
            </Router>
        </>
    );
};

render(
    <AppContext.Consumer>
        {({ exit }) => <Root onExit={exit} />}
    </AppContext.Consumer>,
    {
        debug: cli.flags.debug,
    }
);
