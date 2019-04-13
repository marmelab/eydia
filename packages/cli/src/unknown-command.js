import React from 'react';
import { Box, Color } from 'ink';

const UnknownCommand = ({ children, command }) => {
    const fullCommand = ['eydia', command].filter(Boolean).join(' ');

    return (
        <Box flexDirection="column">
            <Color red>Unknown command</Color>
            <Box marginTop={1}>
                Here{"'"}s how to use the <Color grey>{fullCommand}</Color>{' '}
                command
            </Box>
            {children}
        </Box>
    );
};

export default UnknownCommand;
