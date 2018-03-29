module.exports = {
	editarEmp  : (req, res) => {
		req.getConnection((e, con) => {
			con.query(`UPDATE empleados SET cedulaEmp = '${req.body.cedulaPers}', nombreEmp = '${req.body.nombrePers}', profesion = '${req.body.profesion}' WHERE id = ${req.body.id}`, (error, filas)=> {
				res.redirect('/inicio')
			})
		})
	}
}