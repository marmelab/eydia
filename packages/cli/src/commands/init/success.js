import React from 'react';
import { Box, Color } from 'ink';
import Link from 'ink-link';

const Success = ({ projectName, link }) => (
    <Box flexDirection="column">
        <Color green>Project {projectName} saved!</Color>
        <Box>
            Open its page now with this{' '}
            <Color cyan>
                <Link url={link}>link</Link>
            </Color>
        </Box>
    </Box>
);

export default Success;
