import React from 'react';
import { render } from 'ink-testing-library';
import AddTodo from './';
import addTodo from '../../../api/add-todo';
import getProjectName from '../../get-project-name';
import { wait } from '../../../test-utils';
import chalk from 'chalk';

jest.mock('../../../api/add-todo');
jest.mock('../../get-project-name');

describe('Todo - add', () => {
    test('directly adds the todo if already specified', async () => {
        getProjectName.mockReturnValue('my-project');
        addTodo.mockResolvedValue(
            'https://eydia.marmelab.com/my-project/todos/18224f21-73e5-4d3a-8715-6e10ae855643'
        );

        // We can't use act yet
        // https://github.com/vadimdemedes/ink-testing-library/issues/3
        const { lastFrame } = render(
            <AddTodo title="test" onExit={jest.fn()} />
        );

        // Use a regex because of the spinner before the text
        expect(lastFrame()).toMatch(/.+Saving your todo item.../);
        await wait(10);
        expect(lastFrame()).toEqual(`${chalk.green('Todo saved!')}
link (https://eydia.marmelab.com/my-project/todos/18224f21-73e5-4d3a-8715-6e10ae855643)`);
    });
});
