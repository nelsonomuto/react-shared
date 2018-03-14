// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by react-shared.js.
import { name as packageName } from "meteor/nomuto:react-shared";

// Write your tests here!
// Here is an example.
Tinytest.add('react-shared - example', function (test) {
  test.equal(packageName, "react-shared");
});
