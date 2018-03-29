const express 	  = require('express')
const router 	  = express.Router()
const multer 	  = require('multer')
const fs 		  = require('fs')

const controllers = require('../controllers')

var upload	  = multer({ dest: "./public/images/uploads" }).single('foto')

// Subir las fotos del perfil
// ESTA MIARDA NO SIRVE COÑOOOOOOOOOOOOOOOO .l.
/*
* SI NO ERES PROGRAMADOR NO LEAS ESTO.
*--------------------------------------------------------------------------------------------------------------------
* Si en algun futuro otro programador llega a ver esto, y quiere q la foto de perfil del estudiante funcione perfectamente...
* EL PROBLEMA NO ESTA EN EL CODIGO COMO TAL SINO EN QUE LA FUNCION fs.watch() de nodejs q no "vigila" el cambio en la carpeta 
* uploads cuado un archivo se sube, si la carpeta esta vacia y se sube un archivo creo q si lo toma, pero cuando hay mas archivos
* no se porque no lo toma a la primera. Tienes q darle de nuevo para q lo tome y en los otros perfiles no se guarda la foto de
* ese estudiante sino q agarra la ultima subida. Si quieres y te estan pafando, tu tarea es encontrar un remplazo para la funcion
* fs.watch() o programar algo q lo haga no se, ingeniatelas (y).
*--------------------------------------------------------------------------------------------------------------------
* SI TE PARECE UN CODIGO DE MIERDA, TE ENTIENDO LO SE, POR CUESTIONES DE TIEMPON NO LO MEJORE, NO SOY PROFESIONAL, HA MUCHOS CALLBACKS HELL Y REBUNDANCIA DE CODIGO EN LOS CONTROLADORES SI QUIERES ACOMODALOS. JAJAJAJAJ
* ESTO FUE PROGRAMADO EN LOS LAPSOS DE DICIEMBRE 2017 Y FEBRERO 2018. BY JFLO

*/
router.post('/estudiante/:tipo/:id/imagen', (req, res) => {
	upload(req, res, (err) => {
		fs.watch('./public/images/uploads',(ev, files) => {
			req.getConnection((err, con) => {
				let image = files
				console.log('----------> '+image)
				con.query(`UPDATE Estudiantes SET imagen = '${image}' WHERE id = ${req.params.id}`, (e, data) => {
					// image = 'user.png'
					console.log('___________________> '+ files)
					console.log(`UPDATE Estudiantes SET imagen = '${image}' WHERE id = ${req.params.id}`)

					console.log('NO SIRVEEEEEEEEEEEEEEEEEE')
				})
			})
		})
	})
	res.redirect('/estudiante/' + req.params.tipo +'/'+ req.params.id)
})

// Sesiones
router.get('/', controllers.loginSesionesCtrl.login)
router.post('/', controllers.loginSesionesCtrl.sesion)
// cerrar sesion
router.post('/salir', controllers.loginSesionesCtrl.salir)

// Informacion del pasante individualmente
router.get('/estudiante/:tipo/:id', controllers.estudianteCtrl.estudiante)
router.post('/estudiante/:tipo/:id', controllers.estudianteCtrl.sumarHoras)

//terminar el servicio comunitario
router.post('/estudiante/ServicioComunitario/:id/servcomend', controllers.estudianteCtrl.servend)

// Pagina de inicio. listar todo informacion del seminario psante y servicio comunitario
router.get('/inicio', controllers.mostrarCtrl.inicio)
router.get('/:tipo', controllers.mostrarCtrl.pasanteServicioSem)
router.get('/seminario/:seminario', controllers.mostrarCtrl.infosem)

// Modulos de añadir estudiante y seminario
router.post('/aniadir', controllers.aniadirCtrl.aniadir)
router.post('/aniadirSem', controllers.aniadirCtrl.aniadirSem)

// añadir personal
// router.post('/aniadirPersonal', controllers.aniadirCtrl.aniadirPersonal)

// solicitud ajax
router.post('/ajax', controllers.ajaxCtrl.ajax)

// borrar estudiante y personas de los seminarios
router.get('/borrar/:tipo/:id', controllers.borrarCtrl.borrar)
router.get('/seminario/:sem/:id', controllers.borrarCtrl.borrarPersonasSem)

//BUsqueda de estdiants
router.post('/busqueda', controllers.busquedaCtrl.busqueda)

router.post('/editarEmp', controllers.editar.editarEmp)


// Imprimir carta de postulacion y carta de culminacion
router.get('/pdf/cartapostulacion/:ced', controllers.PDFsCtrl.carta)
router.get('/pdf/certificadoPasan/:ced', controllers.PDFsCtrl.certificadoPasan)
router.get('/pdf/certificadoSC/:ced', controllers.PDFsCtrl.certificadoSC)
router.get('/pdf/listadoservcom', controllers.PDFsCtrl.listadoServCom)
router.get('/pdf/listadoPasantia', controllers.PDFsCtrl.listadoPasantia)

module.exports = router