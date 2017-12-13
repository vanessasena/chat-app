const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public')
var app = express()
var port = process.env.PORT || 3000
app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//   res.sendFile('/index.html')
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
