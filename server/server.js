const express = require('express')
const app  = express();
const PORT = process.env.PORT || 4000

app.get('/react', (req, res) => {
    res.send({ react: 'react start'})
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`)
})