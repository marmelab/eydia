import React, { useReducer, useEffect } from 'react';
import { Box, Color } from 'ink';
import Spinner from 'ink-spinner';
import Link from 'ink-link';

import updateProject from '../../api/update-project';
import getProjectName from '../get-project-name';
import gatherDependencies from './gather-dependencies';

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

const handleWelcomeStep = async (dispatch, projectRoot) => {
    const projectName = getProjectName(projectRoot);

    setTimeout(
        () => dispatch({ type: ACTION_SET_PROJECT_NAME, payload: projectName }),
        2000
    );
};

const handleGatherDependenciesStep = async (dispatch, projectRoot) => {
    const dependencies = gatherDependencies(projectRoot);
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
    projectRoot
) => () => {
    if (step === STEP_WELCOME) {
        handleWelcomeStep(dispatch, projectRoot);
    }

    if (step === STEP_GATHERING_DEPENDENCIES) {
        handleGatherDependenciesStep(dispatch, projectRoot);
    }

    if (step === STEP_UPDATING_PROJECT) {
        handleUpdateProjectStep(dispatch, projectName, dependencies);
    }

    if (step === STEP_EXIT) {
        onExit();
    }
};

const Init = ({ onExit, projectRoot = process.cwd() }) => {
    const [state, dispatch] = useReducer(initReducer, initialState);

    useEffect(handleSteps(dispatch, state, onExit, projectRoot), [state]);

    if (state.step === STEP_WELCOME) {
        return (
            <Box>
                <Color green>
                    <Spinner type="dots" />
                </Color>
                <Box paddingLeft={1}>Initializing Eydia...</Box>
            </Box>
        );
    }

    if (state.step === STEP_GATHERING_DEPENDENCIES) {
        return (
            <Box>
                <Color green>
                    <Spinner type="dots" />
                </Color>
                <Box paddingLeft={1}>Gathering the dependencies...</Box>
            </Box>
        );
    }

    if (state.step === STEP_UPDATING_PROJECT) {
        return (
            <Box>
                <Color green>
                    <Spinner type="dots" />
                </Color>
                <Box paddingLeft={1}>
                    Updating project <Color cyan>{state.projectName}</Color>...
                </Box>
            </Box>
        );
    }

    if (state.step === STEP_EXIT) {
        return (
            <Box flexDirection="column">
                <Color green>Project {state.projectName} saved!</Color>
                <Box>
                    Open its page now with this{' '}
                    <Color cyan>
                        <Link url={state.link}>link</Link>
                    </Color>
                </Box>
            </Box>
        );
    }
};

export default Init;
