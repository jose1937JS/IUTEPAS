module.exports = {
	ajax : (req, res) => {
		req.getConnection((err, con) => {
			con.query(`SELECT * FROM Estudiantes WHERE cedula = ${req.body.cedula}`, (err, rows) => {
				res.send(rows)
			})
		})		
	}
}