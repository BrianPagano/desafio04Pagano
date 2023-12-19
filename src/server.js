const express = require('express')
const router = require('./router/router')
const { port } = require('./configs/server.config')
const { createServer } = require("http");
const { Server } = require("socket.io");
const handlebars = require('express-handlebars')

const app = express()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

// Configura Express para servir archivos estáticos desde la carpeta 'node_modules/bootstrap/dist'
app.use('/bootstrap', express.static(process.cwd() + 'node_modules/bootstrap/dist'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

router(app)

const httpServer = createServer(app)
const io = new Server(httpServer)


app.listen(port, () => {
    console.log(`Server running at port ${port}`)
  })



