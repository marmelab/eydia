import { basename, extname } from 'path';
import execa from 'execa';
import path from 'path';
import meow from 'meow';

const defaultCliParams = meow({
    flags: {
        project: {
            type: 'string',
        },
    },
});

const defaultCurrentPath = process.cwd();

const defaultParams = {
    currentPath: defaultCurrentPath,
    cliParams: defaultCliParams,
};

/*
 * If user has specified a project using the CLI flags, use this name.
 * If the current path (cwd) is inside a git repository, use the repository name
 * If the current path (cwd) is not inside a git repository, use the directory name
 */
const getProjectName = async ({
    currentPath = defaultCurrentPath,
    cliParams = defaultCliParams,
} = defaultParams) => {
    if (cliParams.flags.project) {
        return cliParams.flags.project;
    }

    // TODO: Detect other types of repository (mercurial, etc.)
    const candidates = await Promise.all([
        getProjectNameFromGitRepository(currentPath),
        getProjectNameFromDirectory(currentPath),
    ]);

    return candidates.find(candidate => Boolean(candidate));
};

export default getProjectName;

const getProjectNameFromDirectory = path => basename(path);

const getFileNameWithoutExtension = name => {
    const extension = extname(name);

    return name.replace(extension, '');
};

const getProjectNameFromGitRepository = async (
    currentPath = defaultCurrentPath
) => {
    const thisPath = path.isAbsolute(currentPath)
        ? currentPath
        : path.join(defaultCurrentPath, currentPath);

    try {
        const { stdout } = await execa(
            'git',
            ['config', '--get', 'remote.origin.url'],
            {
                cwd: thisPath,
            }
        );

        const result = basename(stdout);
        return getFileNameWithoutExtension(result);
    } catch (e) {
        return undefined;
    }
};
