import React from 'react';
import { render } from 'ink-testing-library';
import AddTodo from './';
import addTodo from '../../../api/add-todo';
import getProjectName from '../../get-project-name';
import { renderToString, wait } from '../../../test-utils';
import Loading from '../../loading';
import Success from './success';

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
            <AddTodo args={['test']} onExit={jest.fn()} />
        );
        const expected1 = renderToString(
            <Loading>Saving your todo item...</Loading>
        );
        expect(lastFrame()).toEqual(expected1);
        await wait(10);
        const expected2 = renderToString(
            <Success
                link={
                    'https://eydia.marmelab.com/my-project/todos/18224f21-73e5-4d3a-8715-6e10ae855643'
                }
            />
        );
        expect(lastFrame()).toEqual(expected2);
    });
});
