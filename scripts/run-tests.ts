
const Jasmine = require('jasmine')
const Reporter = require('jasmine-spec-reporter')

let testRunner = new Jasmine()
testRunner.loadConfigFile('tests/jasmine.json')
testRunner.addReporter(new Reporter({
  isVerbose: false,
  showColors: true,
  includeStackTrace: false
}))
testRunner.execute()
