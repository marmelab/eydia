import React from 'react';
import CommandHelp from '../../../command-help';
import DefaultFlags from '../../../default-flags';

const TodoListHelp = ({ showFlags = false }) => (
    <CommandHelp commands={['eydia todo', 'eydia todo list']}>
        <CommandHelp.Description>
            Show all the todos for the current project
        </CommandHelp.Description>
        {showFlags ? (
            <CommandHelp.Flags>
                <DefaultFlags />
            </CommandHelp.Flags>
        ) : null}
    </CommandHelp>
);

export default TodoListHelp;
