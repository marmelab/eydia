import React from 'react';
import CommandHelp from '../../../command-help';

const TodoListHelp = () => (
    <CommandHelp commands={['eydia todo', 'eydia todo list']}>
        Show all the todos for the current project
    </CommandHelp>
);

export default TodoListHelp;
