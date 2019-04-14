import React, { useReducer, useEffect } from 'react';

import UnknownCommand from '../../../unknown-command';
import Loading from '../../loading';
import addTodo from '../../../api/add-todo';
import getProjectName from '../../get-project-name';
import AskTitle from './ask-title';
import Success from './success';

const AddTodo = ({ flags, title, onExit }) => {
    const [state, dispatch] = useReducer(todoReducer, getInitialState(title));

    const handleAddTodo = value =>
        dispatch({ type: ACTION_SAVE_TODO, payload: value });

    // You can't pass an async function directly to useEffect
    useEffect(() => {
        handleActions(state, dispatch, onExit, flags);
    }, [state]);

    switch (state.step) {
        case STEP_ASK_TITLE: {
            return <AskTitle onSubmit={handleAddTodo} />;
        }

        case STEP_SAVING_TODO: {
            return <Loading>Saving your todo item...</Loading>;
        }

        case STEP_EXIT: {
            return <Success link={state.link} />;
        }

        default: {
            return <UnknownCommand />;
        }
    }
};

export default AddTodo;

const STEP_ASK_TITLE = 'ask-title';
const STEP_SAVING_TODO = 'saving-todo';
const STEP_EXIT = 'exit';

const ACTION_SAVE_TODO = 'save-todo';
const ACTION_SET_SUCCESS = 'set-success';

const initialState = {
    step: STEP_ASK_TITLE,
    title: '',
};

const getInitialState = title => ({
    ...initialState,
    step: title ? STEP_SAVING_TODO : initialState.step,
    title: title ? title : initialState.title,
});

const todoReducer = (state, action) => {
    if (action.type === ACTION_SAVE_TODO) {
        return {
            step: STEP_SAVING_TODO,
            title: action.payload,
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

const handleActions = async (state, dispatch, onExit, flags) => {
    switch (state.step) {
        case STEP_SAVING_TODO: {
            const projectName = await getProjectName(flags);
            const link = await addTodo({ projectName, title: state.title });
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
