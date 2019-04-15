import React from 'react';
import { Box, Color } from 'ink';

const Error = ({ error, text }) => (
    <Box flexDirection="column">
        <Color red>{text}</Color>
        <Color grey>{error}</Color>
    </Box>
);

export default Error;
