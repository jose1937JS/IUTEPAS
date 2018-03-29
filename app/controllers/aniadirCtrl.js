module.exports = {
	aniadir : (req, res, next) => {
		req.getConnection((error, con) => {
			con.query(`SELECT id, cedula FROM Estudiantes WHERE cedula = ${req.body.cedula}`, (er, resul) => {
				if (req.body.tipo == 'Pasantia'){
					con.query(`INSERT INTO Pasantes (fechaInicio, organizacion, espTutor, tutor, cedulaTutor, correoTutor, cargoTutor, direccionOrg, telefonoOrg, tutorAcad, cedulaTutorAcad) VALUES('${req.body.fechaInicio}','${req.body.insPasantia}', '${req.body.esp}', '${req.body.tutor}', '${req.body.cedTutor}', '${req.body.correoTutor}', '${req.body.cargoTutor}', '${req.body.dir}', '${req.body.telOrg}', '${req.body.tutorAcad}', '${req.body.cedTutorAcad}')`, (rr, rows) => {
						if (resul[0]) {
							con.query(`UPDATE pivote set id_pasantia = ${rows.insertId} where id_estudiantes = ${resul[0].id}`, (erorr, filas) => {
								res.redirect('/Pasantia');
							})
						}
						else {
							con.query(`INSERT INTO Estudiantes (nombre, apellido, cedula, telefono, correo, carrera) VALUES ('${req.body.nombre}', '${req.body.apellido}','${req.body.cedula}', '${req.body.telefono}', '${req.body.email}', '${req.body.carrera}')`, (er, fila) => {
								con.query(`INSERT INTO pivote (id_estudiantes, id_pasantia) VALUES (${fila.insertId}, ${rows.insertId})`, (errr, data) => {
									res.redirect('/Pasantia');
								})
							})
						}
					})
				}
				else if (req.body.tipo == 'ServicioComunitario'){
					con.query(`INSERT INTO ServicioComunitario (institucion, proyecto, fechaInicio ) VALUES('${req.body.institucion}','${req.body.proyecto}', '${req.body.fechaInicio}')`, (rr, rows) => {
						if (resul[0]) {
							con.query(`UPDATE pivote SET id_comunitario = ${rows.insertId} WHERE id_estudiantes = ${resul[0].id}`, (erorr, filas) => {
								res.redirect('/ServicioComunitario');
							})
						}
						else {
							con.query(`INSERT INTO Estudiantes (nombre, apellido, cedula, telefono, correo, carrera) VALUES ('${req.body.nombre}', '${req.body.apellido}','${req.body.cedula}', '${req.body.telefono}', '${req.body.email}', '${req.body.carrera}')`, (er, fila) => {
								con.query(`INSERT INTO pivote (id_estudiantes, id_comunitario) VALUES (${fila.insertId}, ${rows.insertId})`, (errr, data) => {
									res.redirect('/ServicioComunitario');
								})
							})
							
						}
					})
				}
				else {
					if (resul[0]) {
						con.query(`UPDATE pivote SET id_seminario = 1 WHERE id_estudiantes = ${resul[0].id}`, (erorr, filas) => {
							res.redirect('/seminario');
						})
					}
					else {
						con.query(`INSERT INTO Estudiantes (nombre, apellido, cedula, telefono, correo, carrera) VALUES ('${req.body.nombre}', '${req.body.apellido}','${req.body.cedula}', '${req.body.telefono}', '${req.body.email}', '${req.body.carrera}')`, (er, resu) => {
							con.query(`INSERT INTO pivote (id_estudiantes, id_seminario) VALUES(${resu.insertId}, ${req.body.seminario})`, (errr, filas) => {

								console.log(`INSERT INTO pivote (id_estudiantes, id_seminario) VALUES(${resu.insertId}, ${req.body.seminario})`)
								res.redirect('/seminario')
							})
						})
					}
				}
			})
		})
	},
	aniadirSem : (req, res) => {
		req.getConnection((err, con) => {
			con.query(`INSERT INTO Seminarios(nombresem, duracion, fecha_inicio) VALUES( '${req.body.semname}', '${req.body.durac}', '${req.body.fecha}' )`, (error, rows) => {
				if (error) {throw error}
				res.redirect('/seminario')
			})
		})
	},
	aniadirPersonal : (req, res) => {
		req.getConnection((err, con) => {
			con.query(`INSERT INTO empleados(nombre, cargo) VALUES( '${req.body.nombrePers}', '${req.body.cargo}')`, (error, rows) => {
				if (error) {throw error}
				res.redirect('/inicio')
			})
		})
	} 
}