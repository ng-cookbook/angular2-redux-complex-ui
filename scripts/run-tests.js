
import Jasmine from 'jasmine'
import Reporter from 'jasmine-spec-reporter'

let jasmine = new Jasmine()
jasmine.loadConfigFile('tests/jasmine.json')
jasmine.addReporter(new Reporter({
  isVerbose: false,
  showColors: true,
  includeStackTrace: false
}))
jasmine.execute()
