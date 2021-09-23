const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=> {
	res.send("Hello There");
})


app.listen(PORT, ()=> {
	console.log(`The server is being hosted on port ${PORT}`);
})
