import React from 'react';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';

const Todo = ({ command, args, onExit }) => {
    if (command === 'add') {
        return <AddTodo args={args} onExit={onExit} />;
    }

    return <UnknownCommand />;
};

export default Todo;
