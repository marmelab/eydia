import React, { useReducer, useEffect } from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import Link from 'ink-link';

import UnknownCommand from '../../unknown-command';
import addTodo from '../../api/add-todo';

const initialState = {
    step: 'ask-title',
    title: '',
};

const getInitialState = args => ({
    ...initialState,
    step: args[0] ? 'saving-todo' : initialState.step,
    title: args[0] ? args[0] : initialState.title,
});

const todoReducer = (state, action) => {
    if (action.type === 'set-title') {
        return {
            ...state,
            title: action.payload,
        };
    }

    if (action.type === 'save-todo') {
        return {
            step: 'saving-todo',
        };
    }

    if (action.type === 'success') {
        return {
            step: 'exit',
            link: action.payload,
        };
    }

    return state;
};

const handleActions = async (state, dispatch, onExit) => {
    if (state.step === 'saving-todo') {
        const link = await addTodo(state.title);
        dispatch({
            type: 'success',
            payload: link,
        });
    }

    if (state.step === 'exit') {
        onExit();
    }
};

const AddTodo = ({ args, onExit }) => {
    const [state, dispatch] = useReducer(todoReducer, getInitialState(args));

    const handleSetTitle = value =>
        dispatch({ type: 'set-title', payload: value });

    const handleAddTodo = () => dispatch({ type: 'save-todo' });

    // You can't pass an async function directly to useEffect
    useEffect(() => {
        handleActions(state, dispatch, onExit);
    }, [state]);

    if (state.step === 'ask-title') {
        return (
            <Box flexDirection="column">
                <Box>Enter your todo title:</Box>

                <TextInput
                    value={state.title}
                    onChange={handleSetTitle}
                    onSubmit={handleAddTodo}
                />
            </Box>
        );
    }

    if (state.step === 'saving-todo') {
        return (
            <Box>
                <Color green>
                    <Spinner type="dots" />
                </Color>
                <Box paddingLeft={1}>Saving your todo item...</Box>
            </Box>
        );
    }

    if (state.step === 'exit') {
        return (
            <Box>
                <Color green>Todo saved!</Color> Open it now with this{' '}
                <Color cyan>
                    <Link url={state.link}>link</Link>
                </Color>
            </Box>
        );
    }

    return <UnknownCommand />;
};

export default AddTodo;
