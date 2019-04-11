import React from 'react';
import { Box, Color } from 'ink';
import Spinner from 'ink-spinner';

const Loading = ({ children }) => (
    <Box>
        <Color green>
            <Spinner type="dots" />
        </Color>
        <Box paddingLeft={1}>{children}</Box>
    </Box>
);

export default Loading;
