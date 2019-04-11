import React from 'react';
import { render, AppContext } from 'ink';
import BigBox from 'ink-box';
import meow from 'meow';

import Init from './commands/init';
import Todo from './commands/todo';
import UnknownCommand from './unknown-command';

const cli = meow({
    flags: {
        debug: {
            type: 'boolean',
        },
    },
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
            {cli.input.length === 0 ? (
                <Init onExit={onExit} />
            ) : cli.input[0] === 'todo' ? (
                <Todo
                    command={cli.input[1]}
                    args={cli.input.slice(2)}
                    onExit={onExit}
                />
            ) : (
                <UnknownCommand />
            )}
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
