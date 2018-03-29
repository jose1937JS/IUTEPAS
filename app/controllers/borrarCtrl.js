module.exports = {

	borrarPersonasSem : (req, res) => {
		req.getConnection((error, con) => {
			console.log(req.params.id)
			con.query(`UPDATE pivote SET id_seminario = NULL WHERE id_estudiantes = ${req.params.id}`, (err, rows) => {
				res.redirect('/seminario/' + req.params.sem)
			})
		})
	},
	borrar : (req, res, next) => {
		req.getConnection((error, con) => {
			if (req.params.tipo == 'Pasantia'){
				con.query(`SELECT id_pasantia FROM pivote WHERE id_estudiantes = ${req.params.id}`, (er, resu) => {
					con.query(`UPDATE pivote SET id_pasantia = NULL WHERE id_estudiantes = ${req.params.id}`, (err, rows) => {
						con.query(`DELETE FROM Pasantes WHERE id = ${resu[0].id_pasantia}`, (err, rows) => {
							res.redirect('/Pasantia')
						})
					})
				})
			}
			else if(req.params.tipo == 'ServicioComunitario'){
				con.query(`SELECT id_comunitario FROM pivote WHERE id_estudiantes = ${req.params.id}`, (er, resu) => {
					con.query(`UPDATE pivote SET id_comunitario = NULL WHERE id_estudiantes = ${req.params.id}`, (err, rows) => {
						con.query(`DELETE FROM ServicioComunitario WHERE id = ${resu[0].id_comunitario}`, (err, rows) => {
							res.redirect('/ServicioComunitario')
						})
					})
				})	
			}
			else if(req.params.tipo == 'seminario'){
				con.query(`UPDATE pivote SET id_seminario = NULL WHERE id_seminario = ${req.params.id}`, (err, rows) => {
					con.query(`DELETE FROM Seminarios WHERE id = ${req.params.id}`, (err, rows) => {
						res.redirect('/seminario')
					})
				})
			}

			else {
				res.status = 404
				res.render('404')
			}
		})
	}
}