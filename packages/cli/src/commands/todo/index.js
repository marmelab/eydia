import React from 'react';

import UnknownCommand from '../../unknown-command';
import AddTodo from './add';
import ListTodos from './list';

export const COMMAND_LIST = 'list';
export const COMMAND_ADD = 'add';

const Todo = ({ command = COMMAND_LIST, args, onExit }) => {
    if (command === COMMAND_ADD) {
        return <AddTodo args={args} onExit={onExit} />;
    }

    if (command === COMMAND_LIST) {
        return <ListTodos args={args} onExit={onExit} />;
    }

    return <UnknownCommand />;
};

export default Todo;
