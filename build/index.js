"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 3000;
var HOST = 'localhost';
app.get('/', function (req, res) {
  res.send('ESTAMOS ACTIVOS PAPI');
});
app.listen(PORT, HOST, function () {
  console.log("servidor escuchando en el puerto  : ".concat(PORT, " y host : ").concat(HOST));
});