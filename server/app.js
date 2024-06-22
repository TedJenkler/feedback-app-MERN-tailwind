const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});