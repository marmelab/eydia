import { v4 as newUuid } from 'uuid';
import debug from 'debug';

const addTodo = title =>
    new Promise(resolve => {
        debug('api.add-todo')(`Saving ${title}`);

        setTimeout(
            () => resolve(`https://eydia.marmelab.com/todo/${newUuid()}`),
            2000
        );
    });

export default addTodo;
