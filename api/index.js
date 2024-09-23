import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.get('/get', (req, res) => {
    res.send("You Got it!")
})
