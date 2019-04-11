import { resolve } from 'path';

const getProjectName = (projectRoot = process.cwd()) => {
    const packageJson = require(resolve(projectRoot, 'package.json'));

    return packageJson.name;
};

export default getProjectName;
