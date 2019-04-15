import React from 'react';
import { Box, Color } from 'ink';
import Spinner from 'ink-spinner';

const Loading = ({ children }) => (
    <Box>
        <Box marginRight={1}>
            <Color green>
                <Spinner type="dots" />
            </Color>
        </Box>
        {children}
    </Box>
);

export default Loading;
