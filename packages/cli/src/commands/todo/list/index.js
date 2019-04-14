import React, { useEffect, useReducer } from 'react';

import getProjectName from '../../get-project-name';
import listTodos from '../../../api/list-todos';
import Loading from '../../loading';
import Error from '../../error';
import List from './list';

const ListTodos = ({ flags, onExit }) => {
    const [state, dispatch] = useReducer(listTodosReducer, initialState);

    // You can't pass an async function directly to useEffect
    useEffect(() => {
        handleListTodosSteps(state, dispatch, onExit, flags);
    }, [state]);

    switch (state.step) {
        case STEP_SHOW_TODOS: {
            return <List todos={state.todos} />;
        }

        case STEP_SHOW_ERROR: {
            return (
                <Error
                    error={state.error}
                    text="Error while fetching the todos"
                />
            );
        }

        default: {
            return <Loading>Fetching todos...</Loading>;
        }
    }
};

export default ListTodos;

const STEP_LOADING = 'loading';
const STEP_SHOW_TODOS = 'show-todos';
const STEP_SHOW_ERROR = 'show-error';

const ACTION_SET_TODOS = 'set-todos';
const ACTION_SET_ERROR = 'set-error';

const initialState = {
    step: STEP_LOADING,
    todos: [],
    error: undefined,
};

const listTodosReducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_TODOS: {
            return {
                ...state,
                step: STEP_SHOW_TODOS,
                todos: action.payload,
            };
        }
        case ACTION_SET_ERROR: {
            return {
                ...state,
                step: STEP_SHOW_ERROR,
                error: action.payload,
            };
        }
        default:
            return state;
    }
};

const handleListTodosSteps = async (state, dispatch, onExit, flags) => {
    switch (state.step) {
        case STEP_LOADING: {
            try {
                const projectName = await getProjectName(flags);
                const todos = await listTodos(projectName);
                dispatch({ type: ACTION_SET_TODOS, payload: todos });
            } catch (error) {
                dispatch({ type: ACTION_SET_ERROR, payload: error.message });
            }
            return;
        }

        default: {
            onExit();
            return;
        }
    }
};
