import React, { Fragment } from 'react';
import { Box, Color, Text } from 'ink';

const CommandHelp = ({ commands, children }) => (
    <Box flexDirection="column" paddingTop={1}>
        <Box>
            {commands.map((command, index) => (
                <Fragment key={command}>
                    {index > 0 ? <> or </> : null}
                    <Color grey>{command}</Color>
                </Fragment>
            ))}
        </Box>
        <Text>{children}</Text>
    </Box>
);

export default CommandHelp;
