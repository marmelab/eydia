const defaultCwd = process.cwd();

const defaultParams = {
    cwd: defaultCwd,
};

const getProjectRoot = ({ cwd = defaultCwd } = defaultParams) => {
    return cwd;
};

export default getProjectRoot;
