const express = require("express");
const apiai = require("apiai");
const ai = apiai("<enter your API-CLIENT-KEY HERE");
const app = express();
const mustacheExpress = require("mustache-express");
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("home");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
});

io.on("connection", function(socket) {
	socket.on("chat message", function(msg) {
		console.log(msg);
		let request = ai.textRequest(msg, {
			sessionId: "12"
		});
		request.on("response", function(response) {
			io.emit("reply message", response.result.fulfillment.speech);
		});
		request.end();
	});
});

app.set("port", 3000);

http.listen(app.get("port"), () => {
	console.log("Your app has started, sir.");
});
