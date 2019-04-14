import { tmpdir } from 'os';
import getProjectName from './get-project-name';

describe('getProjectName', () => {
    it('Returns the name of the git repository if found', async () => {
        const name = await getProjectName();
        expect(name).toEqual('eydia');
    });

    it('Returns the name of the directory if no git repository is found', async () => {
        const root = tmpdir();
        const name = await getProjectName({
            cwd: root,
        });
        expect(name).toEqual('tmp');
    });

    it('Returns the name specified through flags', async () => {
        const name = await getProjectName({
            project: 'test',
        });
        expect(name).toEqual('test');
    });
});
