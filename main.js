var webApp = require("./app");
var port = 3000;
var http = require("http");

webApp.set('port', port);

var server = http.createServer(webApp);

server.listen(port);

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL("http://localhost:" + port);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
