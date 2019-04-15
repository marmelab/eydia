import React from 'react';
import { render } from 'ink-testing-library';
import CommandHelp from './command-help';
import chalk from 'chalk';

describe('CommandHelp', () => {
    test('displays a single command correctly', async () => {
        const { lastFrame } = render(
            <CommandHelp commands={['eydia']}>An help text</CommandHelp>
        );

        expect(lastFrame()).toEqual(`
${chalk.grey('eydia')}
    An help text`);
    });

    test('displays multipe commands correctly', async () => {
        const { lastFrame } = render(
            <CommandHelp commands={['eydia', 'eydia init']}>
                An help text
            </CommandHelp>
        );

        expect(lastFrame()).toEqual(`
${chalk.grey('eydia')} or ${chalk.grey('eydia init')}
    An help text`);
    });
});
