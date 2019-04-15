import React from 'react';
import { Box, Color } from 'ink';

const HelpHowTo = () => (
    <Box flexDirection="column" marginTop={1}>
        <Box>Get help for a specific command by running:</Box>
        <Color grey>eydia help [command]</Color>
        <Box marginTop={1}>For example:</Box>
        <Color grey>eydia help todo add</Color>
    </Box>
);

export default HelpHowTo;
