process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const isCI = require('is-ci');

const args = process.argv.slice(2);

const watch =
    !isCI &&
    !args.includes('--no-watch') &&
    !args.includes('--coverage') &&
    !args.includes('--updateSnapshot')
        ? ['--watch']
        : [];

require('jest').run([...watch, ...args]);
