import React from 'react';
import TodoHelp from './commands/todo/help';
import CommandHelp from './command-help';

const Help = () => (
    <>
        <CommandHelp commands={['eydia', 'eydia init']}>
            Initialize eydia for the current project
        </CommandHelp>
        <TodoHelp />
    </>
);

export default Help;
