import {app} from './server/routes'

const portNum = process.env.PORT || 9988

app.listen(portNum, () => {
  console.log('Web application listening on port ' + portNum)
})
