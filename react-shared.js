// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See react-shared-tests.js for an example of importing.
export const name = 'react-shared';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    'react': '16.x'
}, 'nomuto:react-shared');

export const List = require('./src/List').default;