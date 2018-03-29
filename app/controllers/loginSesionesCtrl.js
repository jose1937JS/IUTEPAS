module.exports = {
	
	login : (req, res, next) => {
		res.render('login')
	},
	sesion : (req, res, next) => {
		req.getConnection((err, con) => {
			con.query(`SELECT * FROM Usuarios WHERE user = '${req.body.user}'` ,(error, rows) => {
				try {
					if (req.body.passwd !== rows[0].pass) {
						res.render('login', { variable: 'Contraseña incorrecta' })
					} 
					else {
						if (req.body.user == rows[0].user && req.body.passwd == rows[0].pass && rows[0].role == 'admin') {
							req.session.user = req.body.user
							res.redirect('/inicio')
						}
						else if (req.body.user == rows[0].user && req.body.passwd == rows[0].pass && rows[0].role == 'secretaria') {
							req.session.user = req.body.user
							res.redirect('/inicio')
						}
					}
				}
				catch (e) { res.render('login', { variable: 'Usuario incorrecto' }) }
			})
		})
	},
	salir : (req, res) => {
		req.session.destroy()
		res.redirect('/')
	}
}