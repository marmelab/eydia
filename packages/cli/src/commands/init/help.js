import React from 'react';
import CommandHelp from '../../command-help';
import DefaultFlags from '../../default-flags';

const HelpInit = ({ showFlags }) => (
    <>
        <CommandHelp commands={['eydia', 'eydia init']}>
            <CommandHelp.Description>
                Initialize eydia for the current project
            </CommandHelp.Description>
        </CommandHelp>
        {showFlags ? (
            <CommandHelp.Flags>
                <DefaultFlags />
            </CommandHelp.Flags>
        ) : null}
    </>
);

export default HelpInit;
