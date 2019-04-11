import React from 'react';
import { render } from 'ink-testing-library';
import AddTodo from './add';

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Todo - add', () => {
    test('directly adds the todo if already specified', async () => {
        const { lastFrame } = render(
            <AddTodo args={['test']} onExit={jest.fn()} />
        );
        expect(lastFrame()).toMatch(/.*Saving your todo item.../);
        await wait(2100);
        expect(lastFrame()).toMatch(/Todo saved!.+/);
    });
});
