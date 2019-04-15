import debug from 'debug';

const listTodos = projectName =>
    new Promise(resolve => {
        debug('api.list-todo')(`Listing todos for project ${projectName}`);

        setTimeout(
            () =>
                resolve([
                    {
                        id: 'ef8bbf32-98e9-4acd-b8dd-521fd35aa351',
                        title: 'My first todo',
                        url: `https://eydia.marmelab.com/${projectName}/todos/ef8bbf32-98e9-4acd-b8dd-521fd35aa351`,
                    },
                    {
                        id: '316e61c1-b6d1-4155-af04-9cd4cf611455',
                        title: 'My second todo',
                        url: `https://eydia.marmelab.com/${projectName}/todos/316e61c1-b6d1-4155-af04-9cd4cf611455`,
                    },
                    {
                        id: '10daa5be-2b0c-4714-9219-406ca6a72d40',
                        title: 'My third todo',
                        url: `https://eydia.marmelab.com/${projectName}/todos/10daa5be-2b0c-4714-9219-406ca6a72d40`,
                    },
                ]),
            2000
        );
    });

export default listTodos;
