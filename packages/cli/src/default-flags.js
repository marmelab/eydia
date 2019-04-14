import React from 'react';
import CommandHelp from './command-help';

const DefaultFlags = () => (
    <>
        <CommandHelp.Flag name="cwd">
            Sets the directory into which to execute the command. Default is the
            current one.
        </CommandHelp.Flag>
        <CommandHelp.Flag name="project">
            Sets the project name. Default is the current gir repository if
            found or the current directory name.
        </CommandHelp.Flag>
    </>
);

export default DefaultFlags;
