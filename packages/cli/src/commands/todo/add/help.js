import React from 'react';
import CommandHelp from '../../../command-help';
import DefaultFlags from '../../../default-flags';

const TodoAddHelp = ({ showFlags }) => (
    <CommandHelp
        commands={['eydia todo add', 'eydia todo add "My todo title"']}
    >
        <CommandHelp.Description>
            Add a todo to the current project
        </CommandHelp.Description>
        {showFlags ? (
            <CommandHelp.Flags>
                <CommandHelp.Flag name="open" alias="o">
                    Open the new todo edition page in the default browser
                    immediately.
                </CommandHelp.Flag>
                <DefaultFlags />
            </CommandHelp.Flags>
        ) : null}
    </CommandHelp>
);

export default TodoAddHelp;
