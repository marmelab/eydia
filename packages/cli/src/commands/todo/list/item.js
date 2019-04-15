import React from 'react';
import { Box, Color } from 'ink';
import Link from 'ink-link';

const TodoItem = ({ todo }) => (
    <Box flexDirection="column" paddingTop={1}>
        <Box>
            <Color cyan>{todo.title}</Color>
        </Box>
        <Box paddingLeft={1}>
            <Link url={todo.url}>link</Link>
        </Box>
    </Box>
);

export default TodoItem;
