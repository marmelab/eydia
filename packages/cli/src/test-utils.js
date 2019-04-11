import { render } from 'ink';

// Fake process.stdout
class Stream {
    constructor({ columns }) {
        this.output = '';
        this.columns = columns || 100;
    }

    write(str) {
        this.output = str;
    }

    get() {
        return this.output;
    }
}

export const renderToString = (node, { columns } = {}) => {
    const stream = new Stream({ columns });

    render(node, {
        stdout: stream,
        debug: true,
    });

    return stream.get();
};

export const wait = timeout =>
    new Promise(resolve => setTimeout(resolve, timeout));
