const express = require('express');
const server = express();

function keepAlive() {
	server.get('/', (req, res) => {
		res.send("Server is on")
	})
	server.listen(3003, () => {
		console.log("server is ready")
	});
}
module.export = keepAlive();