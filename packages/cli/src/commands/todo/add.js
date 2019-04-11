import React, { useReducer, useEffect } from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import Link from 'ink-link';

import UnknownCommand from '../../unknown-command';
import addTodo from '../../api/add-todo';

const STEP_ASK_TITLE = 'ask-title';
const STEP_SAVING_TODO = 'saving-todo';
const STEP_EXIT = 'exit';

const ACTION_SET_TITLE = 'set-title';
const ACTION_SAVE_TODO = 'save-todo';
const ACTION_SET_SUCCESS = 'set-success';

const initialState = {
    step: STEP_ASK_TITLE,
    title: '',
};

const getInitialState = args => ({
    ...initialState,
    step: args[0] ? STEP_SAVING_TODO : initialState.step,
    title: args[0] ? args[0] : initialState.title,
});

const todoReducer = (state, action) => {
    if (action.type === ACTION_SET_TITLE) {
        return {
            ...state,
            title: action.payload,
        };
    }

    if (action.type === ACTION_SAVE_TODO) {
        return {
            step: STEP_SAVING_TODO,
        };
    }

    if (action.type === ACTION_SET_SUCCESS) {
        return {
            step: STEP_EXIT,
            link: action.payload,
        };
    }

    return state;
};

const handleActions = async (state, dispatch, onExit) => {
    switch (state.step) {
        case STEP_SAVING_TODO: {
            const link = await addTodo(state.title);
            dispatch({
                type: ACTION_SET_SUCCESS,
                payload: link,
            });
            return;
        }

        case STEP_EXIT: {
            onExit();
            return;
        }
    }
};

const AddTodo = ({ args, onExit }) => {
    const [state, dispatch] = useReducer(todoReducer, getInitialState(args));

    const handleSetTitle = value =>
        dispatch({ type: ACTION_SET_TITLE, payload: value });

    const handleAddTodo = () => dispatch({ type: ACTION_SAVE_TODO });

    // You can't pass an async function directly to useEffect
    useEffect(() => {
        handleActions(state, dispatch, onExit);
    }, [state]);

    switch (state.step) {
        case STEP_ASK_TITLE: {
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

        case STEP_SAVING_TODO: {
            return (
                <Box>
                    <Color green>
                        <Spinner type="dots" />
                    </Color>
                    <Box paddingLeft={1}>Saving your todo item...</Box>
                </Box>
            );
        }

        case STEP_EXIT: {
            return (
                <Box>
                    <Color green>Todo saved!</Color> Open it now with this{' '}
                    <Color cyan>
                        <Link url={state.link}>link</Link>
                    </Color>
                </Box>
            );
        }

        default: {
            return <UnknownCommand />;
        }
    }
};

export default AddTodo;
