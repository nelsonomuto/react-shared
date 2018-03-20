// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See react-shared-tests.js for an example of importing.
export const name = 'react-shared';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    'react': '16.2.0',
    'react-dom': '16.2.0',    
    '@progress/kendo-react-grid': '0.4.0',
    '@progress/kendo-data-query': '1.2.1',
    '@progress/kendo-react-inputs': '0.4.0',
    '@progress/kendo-react-intl': '0.4.0',
    '@progress/kendo-react-dropdowns': '0.4.0'
}, 'nomuto:react-shared');

export const List = require('./src/List').default;