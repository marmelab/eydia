import React from 'react';
import { Box, Color } from 'ink';
import Link from 'ink-link';

const Success = ({ link }) => {
    return (
        <Box flexDirection="column">
            <Color green>Todo saved!</Color>
            <Link url={link}>link</Link>
        </Box>
    );
};

export default Success;
