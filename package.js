Package.describe({
  name: 'nomuto:react-shared',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'reusable react components and utilities for Meteor@1.6',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:nelsonomuto/react-shared.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');
  api.use('ecmascript');
  console.log('nomuto:shared log onUse');
  api.mainModule('react-shared.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('nomuto:react-shared');
  api.mainModule('react-shared-tests.js');
});
