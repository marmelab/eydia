import React from 'react';
import { render } from 'ink-testing-library';
import ListTodos from './';
import listTodos from '../../../api/list-todos';
import getProjectName from '../../get-project-name';
import { wait } from '../../../test-utils';
import chalk from 'chalk';

jest.mock('../../../api/list-todos');
jest.mock('../../get-project-name');

describe('Todo - list', () => {
    test('displays a list of todos', async () => {
        const todos = [
            {
                id: 'ef8bbf32-98e9-4acd-b8dd-521fd35aa351',
                title: 'My first todo',
                url: `https://eydia.marmelab.com/my-project/todos/ef8bbf32-98e9-4acd-b8dd-521fd35aa351`,
            },
            {
                id: '316e61c1-b6d1-4155-af04-9cd4cf611455',
                title: 'My second todo',
                url: `https://eydia.marmelab.com/my-project/todos/316e61c1-b6d1-4155-af04-9cd4cf611455`,
            },
            {
                id: '10daa5be-2b0c-4714-9219-406ca6a72d40',
                title: 'My third todo',
                url: `https://eydia.marmelab.com/my-project/todos/10daa5be-2b0c-4714-9219-406ca6a72d40`,
            },
        ];
        getProjectName.mockReturnValue('my-project');
        listTodos.mockResolvedValue(todos);

        // We can't use act yet
        // https://github.com/vadimdemedes/ink-testing-library/issues/3
        const { lastFrame } = render(<ListTodos onExit={jest.fn()} />);

        // Use a regex because of the spinner before the text
        expect(lastFrame()).toMatch(/.+Fetching todos.../);
        await wait(10);

        expect(getProjectName).toHaveBeenCalled();
        expect(listTodos).toHaveBeenCalledWith('my-project');

        expect(lastFrame()).toEqual(`
${chalk.cyan('My first todo')}
link (https://eydia.marmelab.com/my-project/todos/ef8bbf32-98e9-4acd-b8dd-521fd35aa351)

${chalk.cyan('My second todo')}
link (https://eydia.marmelab.com/my-project/todos/316e61c1-b6d1-4155-af04-9cd4cf611455)

${chalk.cyan('My third todo')}
link (https://eydia.marmelab.com/my-project/todos/10daa5be-2b0c-4714-9219-406ca6a72d40)`);
    });
});
