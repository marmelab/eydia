import React from 'react';
import { Box } from 'ink';
import TodoItem from './item';

const List = ({ todos }) => (
    <Box flexDirection="column">
        {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
    </Box>
);

export default List;
