import React from 'react';
import { Redirect } from 'react-router';

import TodoHelp from './commands/todo/help';
import CommandHelp from './command-help';
import DefaultFlags from './default-flags';
import HelpHowTo from './help-how-to';
import { HELP_ROUTE } from './constants';

const Help = ({ match }) => {
    if (match.params.command) {
        /*
            Using the HELP_ROUTE allows us to accept commands such as `eydia add help`
            which will add a todo with title `help`

            All sub commands help routes should use this constant for their path
        */
        return <Redirect to={`/${match.params.command}/${HELP_ROUTE}`} />;
    }

    return (
        <>
            <CommandHelp commands={['eydia', 'eydia init']}>
                <CommandHelp.Description>
                    Initialize eydia for the current project
                </CommandHelp.Description>
            </CommandHelp>
            <TodoHelp />
            <CommandHelp.Flags intro="All commands accept the following flags:">
                <DefaultFlags />
            </CommandHelp.Flags>
            <HelpHowTo />
        </>
    );
};

export default Help;
