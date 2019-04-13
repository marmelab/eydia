import React from 'react';
import CommandHelp from '../../../command-help';

const TodoAddHelp = () => (
    <CommandHelp
        commands={['eydia todo add', 'eydia todo add "My todo title"']}
    >
        Add a todo to the current project
    </CommandHelp>
);

export default TodoAddHelp;
