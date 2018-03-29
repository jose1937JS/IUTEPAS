module.exports = {
	inicio : function(req, res, next) {
		if (req.session.user) {
			req.getConnection((err, con) => {
				con.query(`SELECT id, nombresem FROM Seminarios`, (er, sem) => {
					con.query(`SELECT * FROM empleados`, (er, personal) => {
						res.render('inicio', { seminar:sem, role : req.session.user, personal : personal})
					})
				})
			})
		}
		else { res.redirect('/')}
	},
	pasanteServicioSem : (req, res, next) => {
		if (req.session.user){
			req.getConnection((error, con) => {
				con.query(`SELECT * FROM empleados`, (er, personal) => {
					con.query(`SELECT id, nombresem FROM Seminarios`, (er, sem) => {
						if (req.params.tipo == 'Pasantia'){
							con.query(`SELECT Estudiantes.id, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.cedula, Pasantes.semanas, Pasantes.fechaInicio, Pasantes.organizacion FROM pivote INNER JOIN Pasantes ON pivote.id_pasantia = Pasantes.id INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id ORDER BY Pasantes.id`, (err, filas) => {
								
								con.query(`SELECT COUNT(Estudiantes.carrera) AS cant, Estudiantes.carrera FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Pasantes ON pivote.id_pasantia = Pasantes.id WHERE id_pasantia GROUP BY carrera`, (err, rows) => {

									res.render('pasante-servicio', { info: filas, tipo : req.params.tipo, seminar: sem, cantidad: rows, role:req.session.user, personal : personal })
								})
				
							})
						}
						else if(req.params.tipo == 'ServicioComunitario'){
							con.query(`SELECT Estudiantes.id, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.cedula, ServicioComunitario.horasCumplidas, ServicioComunitario.fechaInicio, ServicioComunitario.institucion FROM pivote INNER JOIN ServicioComunitario ON pivote.id_comunitario = ServicioComunitario.id INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id ORDER BY ServicioComunitario.id`, (err, filas) => {
								
								con.query(`SELECT COUNT(Estudiantes.carrera) AS cant, Estudiantes.carrera FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN ServicioComunitario ON pivote.id_comunitario = ServicioComunitario.id WHERE id_comunitario GROUP BY carrera`, (err, rows) => {

									res.render('pasante-servicio', { info: filas, tipo : req.params.tipo, seminar: sem, cantidad: rows, role:req.session.user, personal : personal })
								})
							})
						}
						else if(req.params.tipo == 'seminario') {
							con.query(`select id, nombresem, duracion, date_format(fecha_inicio, '%d-%m-%Y') as fecha_inicio from Seminarios`, (err, filas) => {
								con.query(`SELECT count(id_estudiantes) FROM pivote INNER JOIN Seminarios ON id_seminario = Seminarios.id`, (err, resul) => {
									res.render('seminario', { info: filas, cant: resul,  tipo : req.params.tipo, seminar: sem, role:req.session.user,personal : personal })
								})

							})
						}
						else {
							res.status = 404
							res.render('404')
						}
					})
				})
			})
		}
		else { res.redirect('/')}
	},
	infosem : (req, res, next) => {
		if (req.session.user){
			req.getConnection((err, con) => {
				con.query(`SELECT * FROM empleados`, (er, personal) => {
					con.query(`SELECT id, nombresem FROM Seminarios`, (er, sem) => {
						con.query(`SELECT Estudiantes.id, Estudiantes.cedula, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.telefono, Estudiantes.correo, Seminarios.nombresem FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Seminarios ON pivote.id_seminario = Seminarios.id WHERE Seminarios.nombresem = '${req.params.seminario}'`, (error, filas) => {
							con.query(`SELECT COUNT(id_estudiantes) AS cant FROM pivote INNER JOIN Seminarios ON id_seminario = Seminarios.id WHERE Seminarios.nombresem = '${req.params.seminario}'`, (err, rows) => {
								res.render('infosem', {datos:filas,  seminar: sem, seminario: req.params.seminario, cantidad: rows, personal : personal})
							})
						})
					})
				})
			})
		}
		else { res.redirect('/')}
	}
}