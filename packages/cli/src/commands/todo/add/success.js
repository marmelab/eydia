import React from 'react';
import { Box, Color } from 'ink';
import Link from 'ink-link';

const Success = ({ link }) => {
    return (
        <Box>
            <Color green>Todo saved!</Color> Open it now with this{' '}
            <Color cyan>
                <Link url={link}>link</Link>
            </Color>
        </Box>
    );
};

export default Success;
