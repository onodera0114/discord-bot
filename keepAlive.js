const http = require("http");

http.createServer((req, res) => {
  res.write("起動中");
  res.end();
}).listen(process.env.PORT || 4000);