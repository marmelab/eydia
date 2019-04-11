import React from 'react';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';
import ListTodos from './list';

const Todo = ({ command = 'list', args, onExit }) => {
    if (command === 'add') {
        return <AddTodo args={args} onExit={onExit} />;
    }

    if (command === 'list') {
        return <ListTodos args={args} onExit={onExit} />;
    }

    return <UnknownCommand />;
};

export default Todo;
