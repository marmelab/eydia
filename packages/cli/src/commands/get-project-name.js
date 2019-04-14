import { basename, extname } from 'path';
import execa from 'execa';
import getProjectRoot from './get-project-root';

/*
 * If user has specified a project using the CLI flags, use this name.
 * If the current path (cwd) is inside a git repository, use the repository name
 * If the current path (cwd) is not inside a git repository, use the directory name
 */
const getProjectName = async (flags = {}) => {
    if (flags.project) {
        return flags.project;
    }

    const projectRoot = getProjectRoot(flags);
    // TODO: Detect other types of repository (mercurial, etc.)
    const candidates = await Promise.all([
        getProjectNameFromGitRepository(projectRoot),
        getProjectNameFromDirectory(projectRoot),
    ]);

    return candidates.find(candidate => Boolean(candidate));
};

export default getProjectName;

const getProjectNameFromDirectory = path => basename(path);

const getFileNameWithoutExtension = name => {
    const extension = extname(name);

    return name.replace(extension, '');
};

const getProjectNameFromGitRepository = async projectRoot => {
    try {
        const { stdout } = await execa(
            'git',
            ['config', '--get', 'remote.origin.url'],
            {
                cwd: projectRoot,
            }
        );

        const result = basename(stdout);
        return getFileNameWithoutExtension(result);
    } catch (e) {
        return undefined;
    }
};
