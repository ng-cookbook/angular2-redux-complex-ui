"use strict";
require('core-js');
var routes_1 = require('./server/routes');
var portNum = process.env.PORT || 9988;
routes_1.app.listen(portNum, function () {
    console.log('Web application listening on port ' + portNum);
});
//# sourceMappingURL=server.js.map