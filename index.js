// 0424-341.87.61 -> NEstor

const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const mysql 	 = require('mysql')	
const connection = require('express-myconnection')
const session    = require('express-session')

const app 		 = express()
const rutas 	 = require('./app/routes/rutas')


// configuracion bd mysql
app.use(connection(mysql, {
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'InstitutoPascal'
}, 'request'))

// configuracion de las sesiones
app.use(session({
	secret : 'clave',
	resave : true,
	saveUninitialized : false,
	cookie : { maxAge: 3600000 * 3} // la sesion expira en 3 horas
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'app/views'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')

app.use('/', rutas)

app.use((req, res) => {
	res.status(404)
	res.render('404')
})

app.listen(3002, () => {
	console.log(`App running on port: 3002`)
})