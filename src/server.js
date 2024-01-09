const express = require('express')
const router = require('./router/router')
const { port } = require('./configs/server.config')
const { Server } = require("socket.io")
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))
// Configurar body-parser para manejar datos JSON
app.use(bodyParser.json());

// Configura Express para servir archivos estáticos desde la carpeta 'node_modules/bootstrap/dist'
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

const io = new Server(httpServer);

io.on ('connection', (websocket) => {
  console.log (websocket.id)
  websocket.on ('messagefront', (data) => {
    console.log ('mensaje desde el front', data)
  })
  websocket.emit ('messageServer', "soy servidor")
})

app.locals.io = io

router(app)





