var Jasmine = require('jasmine');
var Reporter = require('jasmine-spec-reporter');
var testRunner = new Jasmine();
testRunner.loadConfigFile('tests/jasmine.json');
testRunner.addReporter(new Reporter({
    isVerbose: false,
    showColors: true,
    includeStackTrace: false
}));
testRunner.execute();
//# sourceMappingURL=run-tests.js.map