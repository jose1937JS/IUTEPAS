// LISTADO DE PASANTIOAS Y SERVICIO COMUNITARIO SEMINARIO TOTAL
// TOPE DE CANTIDAD DE PERSONAS  EN SEMINARIO SERVICIO Y PASANTIA
// TOPE DE HORAS EN SERVICIO COMINITAIR Y PASANTIA

module.exports = {
	
	estudiante : (req, res, next) => {
		if (req.session.user){
			req.getConnection((err, con) => {
				con.query(`SELECT * FROM empleados`, (er, personal) => {
					con.query(`SELECT id, nombresem FROM Seminarios`, (er, sem) => {
						if (req.params.tipo == 'ServicioComunitario') {
							con.query(`SELECT Estudiantes.id, Estudiantes.imagen ,Estudiantes.cedula, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.telefono, Estudiantes.carrera, Estudiantes.correo, ServicioComunitario.fechaFin, ServicioComunitario.institucion, ServicioComunitario.proyecto, ServicioComunitario.fechaInicio, ServicioComunitario.horasCumplidas, ServicioComunitario.id as idd FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN ServicioComunitario ON pivote.id_comunitario = ServicioComunitario.id WHERE Estudiantes.id = ${req.params.id}`, (error, rows) => {

								res.render('estudiante', {datos : rows, tipo: req.params.tipo, seminar: sem, personal : personal})
							})
						}
						else if(req.params.tipo == 'Pasantia'){
							con.query(`SELECT Estudiantes.id, Estudiantes.imagen, Estudiantes.cedula, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.telefono, Estudiantes.carrera, Estudiantes.correo, Pasantes.espTutor, Pasantes.correoTutor, Pasantes.tutorAcad, Pasantes.cedulaTutorAcad, Pasantes.tutor, Pasantes.cedulaTutor, Pasantes.direccionOrg, Pasantes.telefonoOrg, Pasantes.cargoTutor, Pasantes.fechaFin, Pasantes.organizacion, Pasantes.fechaInicio, Pasantes.semanas, Pasantes.id as idd FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Pasantes ON pivote.id_pasantia = Pasantes.id WHERE Estudiantes.id = ${req.params.id}`, (error, rows) => {
								
								res.render('estudiante', {datos : rows, tipo: req.params.tipo, seminar: sem, personal : personal})
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
	sumarHoras : (req, res, next) => {
		req.getConnection((err, con) => {
			if (req.params.tipo == 'ServicioComunitario') {
				con.query(`SELECT horasCumplidas FROM ServicioComunitario WHERE id = ${req.body.idd}`, (error, rows) => {
					var suma, total = 0;
					(rows == undefined)? suma = 0 : suma = parseInt(rows[0].horasCumplidas)
					total = suma + (parseInt(req.body.horas))
					
					con.query(`UPDATE ServicioComunitario SET horasCumplidas = ${total} WHERE id = ${req.body.idd}`, (err, datos) => {
						console.log(`UPDATE ServicioComunitario SET horasCumplidas = ${total} WHERE id = ${req.body.idd}`)
						if(err) throw err
						res.redirect('/ServicioComunitario')
					})
				})
			}
			else if(req.params.tipo == 'Pasantia'){
				con.query(`SELECT semanas FROM Pasantes WHERE id = ${req.body.idd}`, (error, rows) => {
					var suma, total = 0;
					(rows == undefined)? suma = 0 : suma = parseInt(rows[0].semanas)
					total = suma + (parseInt(req.body.semanas))
					
					con.query(`UPDATE Pasantes SET semanas = ${total} WHERE id = ${req.body.idd}`, (err, datos) => {
						if(err) throw err
						res.redirect('/Pasantia')
					})
				})
			}
			else {
				res.status = 404
				res.render('404')
			}
		})
	},
	servend : (req, res) => {
		req.getConnection((error, con) => {
			con.query(`UPDATE ServicioComunitario SET fechaFin='${req.body.sevend}' WHERE id=${req.params.id}`)
			if (error) throw error
			res.redirect('/estudiante/ServicioComunitario/' + req.params.id)
		})
	}
}