import React, { useReducer, useEffect } from 'react';
import { Color } from 'ink';

import updateProject from '../../api/update-project';
import getProjectName from '../get-project-name';
import gatherDependencies from './gather-dependencies';
import Loading from '../loading';
import Success from './success';

const Init = ({ onExit, flags }) => {
    const [state, dispatch] = useReducer(initReducer, initialState);

    useEffect(handleSteps(dispatch, state, onExit, flags), [state]);

    if (state.step === STEP_WELCOME) {
        return <Loading>Initializing Eydia...</Loading>;
    }

    if (state.step === STEP_GATHERING_DEPENDENCIES) {
        return <Loading>Gathering the dependencies...</Loading>;
    }

    if (state.step === STEP_UPDATING_PROJECT) {
        return (
            <Loading>
                Updating project <Color cyan>{state.projectName}</Color>...
            </Loading>
        );
    }

    if (state.step === STEP_EXIT) {
        return <Success link={state.link} projectName={state.projectName} />;
    }
};

export default Init;

const STEP_WELCOME = 'welcome';
const STEP_GATHERING_DEPENDENCIES = 'gathering-dependencies';
const STEP_UPDATING_PROJECT = 'updating-project';
const STEP_EXIT = 'exit';

const ACTION_SET_PROJECT_NAME = 'set-project-name';
const ACTION_UPDATE_PROJECT = 'update-project';
const ACTION_SET_SUCCESS = 'set-success';

const initialState = {
    step: STEP_WELCOME,
    projectName: '',
    dependencies: [],
    link: '',
};

const initReducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_PROJECT_NAME: {
            return {
                ...state,
                step: STEP_GATHERING_DEPENDENCIES,
                projectName: action.payload,
            };
        }

        case ACTION_UPDATE_PROJECT: {
            return {
                ...state,
                step: STEP_UPDATING_PROJECT,
                dependencies: action.payload,
            };
        }

        case ACTION_SET_SUCCESS: {
            return {
                ...state,
                step: STEP_EXIT,
                link: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

const handleWelcomeStep = async (dispatch, flags) => {
    const projectName = getProjectName(flags);

    setTimeout(
        () => dispatch({ type: ACTION_SET_PROJECT_NAME, payload: projectName }),
        2000
    );
};

const handleGatherDependenciesStep = async (dispatch, flags) => {
    const dependencies = gatherDependencies(flags);
    setTimeout(
        () => dispatch({ type: ACTION_UPDATE_PROJECT, payload: dependencies }),
        2000
    );
};

const handleUpdateProjectStep = async (dispatch, projectName, dependencies) => {
    const link = await updateProject(projectName, dependencies);
    dispatch({
        type: ACTION_SET_SUCCESS,
        payload: link,
    });
};

const handleSteps = (
    dispatch,
    { step, projectName, dependencies },
    onExit,
    flags
) => () => {
    if (step === STEP_WELCOME) {
        handleWelcomeStep(dispatch, flags);
    }

    if (step === STEP_GATHERING_DEPENDENCIES) {
        handleGatherDependenciesStep(dispatch, flags);
    }

    if (step === STEP_UPDATING_PROJECT) {
        handleUpdateProjectStep(dispatch, projectName, dependencies);
    }

    if (step === STEP_EXIT) {
        onExit();
    }
};
