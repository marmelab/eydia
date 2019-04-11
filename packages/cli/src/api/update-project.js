import debug from 'debug';

const updateProject = (projectName, dependencies) =>
    new Promise(resolve => {
        debug('api.update-project')(
            `Saving ${projectName} with ${dependencies.length} dependencies`
        );

        setTimeout(
            () => resolve(`https://eydia.marmelab.com/project/${projectName}`),
            2000
        );
    });

export default updateProject;
