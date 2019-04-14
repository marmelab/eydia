import React, { Fragment } from 'react';
import { Box, Color, Text } from 'ink';

const CommandHelp = ({ commands, children }) => (
    <Box flexDirection="column" marginTop={1}>
        <Box>
            {commands.map((command, index) => (
                <Fragment key={command}>
                    {index > 0 ? <> or </> : null}
                    <Color grey>{command}</Color>
                </Fragment>
            ))}
        </Box>
        <Box flexDirection="column" marginLeft={4}>
            {children}
        </Box>
    </Box>
);

const CommandHelpDescription = ({ children }) => <Text>{children}</Text>;
CommandHelp.Description = CommandHelpDescription;

const DefaultCommandDescriptionIntro =
    'This command accepts the following flags:';

const CommandFlags = ({ children, intro = DefaultCommandDescriptionIntro }) => (
    <Box flexDirection="column" marginTop={1}>
        <Text>{intro}</Text>
        {children}
    </Box>
);
CommandHelp.Flags = CommandFlags;

const CommandFlag = ({ name, alias, multiple, children }) => (
    <Box flexDirection="column" marginTop={1}>
        <Box>
            <Color grey>--{name}</Color>
            {alias ? (
                <>
                    {' '}
                    (<Color grey>-{alias}</Color>)
                </>
            ) : null}
            {multiple ? <>. Can be specified multiple times.</> : null}
        </Box>
        <Box marginLeft={4}>
            <Text>{children}</Text>
        </Box>
    </Box>
);
CommandHelp.Flag = CommandFlag;

export default CommandHelp;
