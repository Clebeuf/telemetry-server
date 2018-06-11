// force better logging
process.on('unhandledRejection', r => console.log(r));

// create global for module path resolution
global.__base = __dirname;

const data_store = require('./storage').service.open_connection();

require('./express/expressService').init();

const express_app = require('./express/expressService').get_service();

require('./socket/socketService').init(express_app);
require('./mqtt/mqttService');

require('./socket/socketApi').activate();
require('./mqtt/mqttApi').activate();
