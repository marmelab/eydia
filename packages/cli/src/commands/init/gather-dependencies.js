import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import getProjectRoot from '../get-project-root';

const gatherDependencies = flags => {
    const projectRoot = getProjectRoot(flags);
    const packageFiles = getPackageFiles(projectRoot, true);
    const dependencies = gatherAllDependencies(packageFiles);

    return dependencies;
};

export default gatherDependencies;

const getPackageFiles = (dir, isRoot = false) => {
    const subdirs = readdirSync(dir);
    let packageFile;
    if (subdirs.includes('package.json')) {
        packageFile = resolve(dir, 'package.json');

        if (!isRoot) {
            return packageFile;
        }
    }

    const files = subdirs.map(subdir => {
        const res = resolve(dir, subdir);
        return statSync(res).isDirectory() && !res.includes('node_modules')
            ? getPackageFiles(res)
            : [];
    });

    return Array.prototype.concat(...files, packageFile || []);
};

const gatherAllDependencies = packageFiles => {
    const dependencies = new Set();

    packageFiles.forEach(packageFile => {
        const packageDependencies = gatherPackageDependencies(packageFile);
        packageDependencies.forEach(dependencies.add.bind(dependencies));
    }, dependencies);

    return dependencies;
};

const gatherPackageDependencies = packageFile => {
    const json = require(packageFile);

    return Array.prototype.concat(
        ...Object.keys(json.dependencies || {}),
        ...Object.keys(json.devDependencies || {}),
        ...Object.keys(json.peerDependencies || {})
    );
};
