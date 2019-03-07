var Service = require('node-windows').Service;
var path = require('path');

// Create a new service object
var svc = new Service({
  name: 'Kim Ngan grocery',
  script: path.join(__dirname, 'dist/app.js')
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();
