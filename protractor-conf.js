// An example configuration file.
exports.config = {
  /*
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,

  // path to chromedriver
  chromeDriver: '../node_modules/chromedriver/bin/chromedriver',

  // to start selenium locally if it's not running already
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.42.0.jar',
  */
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['../tests/**/*.spec.js'],
  exclude: [],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
