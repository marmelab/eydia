import React from 'react';
import TodoListHelp from './list/help';
import TodoAddHelp from './add/help';
import CommandHelp from '../../command-help';
import DefaultFlags from '../../default-flags';

const TodoHelp = ({ showDefaultFlags }) => (
    <>
        <TodoListHelp />
        <TodoAddHelp />
        {showDefaultFlags ? (
            <CommandHelp.Flags intro="All commands accept the following flags:">
                <DefaultFlags />
            </CommandHelp.Flags>
        ) : null}
    </>
);

export default TodoHelp;
