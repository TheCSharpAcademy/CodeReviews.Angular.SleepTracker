const TARGET = {
    "target": "https://localhost:7028",
    "secure": false
  };
  
  const PROXY_CONFIG = {
    "/api": TARGET,
    "/manage/info": TARGET,
    "/login": TARGET,
    "/logout": TARGET,
    "/register": TARGET,
    "/role" : TARGET
  };
  
  module.exports = PROXY_CONFIG;