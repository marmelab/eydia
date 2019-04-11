import React, { useReducer, useEffect } from 'react';
import { Box, Color } from 'ink';
import Spinner from 'ink-spinner';
import Link from 'ink-link';

import updateProject from '../../api/update-project';
import getProjectName from './get-project-name';
import gatherDependencies from './gather-dependencies';

const initialState = {
    step: 'welcome',
    projectName: '',
    dependencies: [],
    link: '',
};

const initReducer = (state, action) => {
    switch (action.type) {
        case 'set-project-name': {
            return {
                ...state,
                step: 'gathering-dependencies',
                projectName: action.payload,
            };
        }

        case 'update-project': {
            return {
                ...state,
                step: 'updating-project',
                dependencies: action.payload,
            };
        }

        case 'success': {
            return {
                ...state,
                step: 'exit',
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
        () => dispatch({ type: 'set-project-name', payload: projectName }),
        2000
    );
};

const handleGatherDependenciesStep = async (dispatch, projectRoot) => {
    const dependencies = gatherDependencies(projectRoot);
    setTimeout(
        () => dispatch({ type: 'update-project', payload: dependencies }),
        2000
    );
};

const handleUpdateProjectStep = async (dispatch, projectName, dependencies) => {
    const link = await updateProject(projectName, dependencies);
    dispatch({
        type: 'success',
        payload: link,
    });
};

const handleSteps = (
    dispatch,
    { step, projectName, dependencies },
    onExit,
    projectRoot
) => () => {
    if (step === 'welcome') {
        handleWelcomeStep(dispatch, projectRoot);
    }

    if (step === 'gathering-dependencies') {
        handleGatherDependenciesStep(dispatch, projectRoot);
    }

    if (step === 'updating-project') {
        handleUpdateProjectStep(dispatch, projectName, dependencies);
    }

    if (step === 'exit') {
        onExit();
    }
};

const Init = ({ onExit, projectRoot = process.cwd() }) => {
    const [state, dispatch] = useReducer(initReducer, initialState);

    useEffect(handleSteps(dispatch, state, onExit, projectRoot), [state]);

    if (state.step === 'welcome') {
        return (
            <Box>
                <Color green>
                    <Spinner type="dots" />
                </Color>
                <Box paddingLeft={1}>Initializing Eydia...</Box>
            </Box>
        );
    }

    if (state.step === 'gathering-dependencies') {
        return (
            <Box>
                <Color green>
                    <Spinner type="dots" />
                </Color>
                <Box paddingLeft={1}>Gathering the dependencies...</Box>
            </Box>
        );
    }

    if (state.step === 'updating-project') {
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

    if (state.step === 'exit') {
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
