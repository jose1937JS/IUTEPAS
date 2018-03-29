module.exports = {
	busqueda : (req, res, next) => {
		if (req.session.user){
			req.getConnection((err, con) => {
				con.query(`SELECT id, nombresem FROM Seminarios`, (er, sem) => {
					if (req.body.optionL == 'ServicioComunitario') {
						con.query(`SELECT Estudiantes.id, Estudiantes.cedula, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.telefono FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id  WHERE pivote.id_comunitario IS NOT NULL AND Estudiantes.nombre LIKE '%${req.body.busqueda}%' OR Estudiantes.apellido LIKE '%${req.body.busqueda}%'`, (err, result) => {
							if(err) throw err
							
							res.render('busqueda', {search: result, tipo : req.body.optionL, seminar: sem})
						})
					}
					else if(req.body.optionL == 'Pasantia') {
						con.query(`SELECT Estudiantes.id, Estudiantes.cedula, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.telefono FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id  WHERE pivote.id_pasantia IS NOT NULL AND Estudiantes.nombre LIKE '%${req.body.busqueda}%' OR Estudiantes.apellido LIKE '%${req.body.busqueda}%'`, (err, result) => {
							if(err) throw err
							
							res.render('busqueda', {search: result, tipo : req.body.optionL, seminar: sem})
						})
					}
					else if (req.body.optionL == 'Seminarios') {
						con.query(`SELECT Estudiantes.cedula, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.telefono, Estudiantes.correo, Seminarios.nombresem, Seminarios.duracion FROM pivote INNER JOIN  Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Seminarios ON pivote.id_seminario = Seminarios.id WHERE pivote.id_seminario AND Estudiantes.nombre LIKE '%${req.body.busqueda}%' OR Estudiantes.apellido LIKE '%${req.body.busqueda}%'`, (err, result) => {
							
							res.render('busqueda', {search: result, tipo : req.body.optionL, seminar: sem})
						})
					}
				})
			})
		}
		else { res.redirect('/')}
	}
}