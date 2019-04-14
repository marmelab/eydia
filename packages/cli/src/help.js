import React from 'react';
import { Redirect } from 'react-router';

import TodoHelp from './commands/todo/help';
import CommandHelp from './command-help';
import DefaultFlags from './default-flags';
import HelpHowTo from './help-how-to';

const Help = ({ match }) => {
    if (match.params.command) {
        return <Redirect to={`/${match.params.command}/help`} />;
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
