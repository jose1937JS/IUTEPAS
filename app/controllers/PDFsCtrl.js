module.exports = {

	carta : (req, res) => {

		const fs  = require('fs')
		const path = require('path')
		const pdf = require('pdfkit')
		
		const doc = new pdf()

		req.getConnection((err, con) => {
			con.query(`SELECT * FROM empleados`, (e, per) => {

				con.query(`SELECT Estudiantes.id, upper(Estudiantes.nombre) as nombre, upper(Estudiantes.apellido) as apellido, Estudiantes.cedula, upper(Estudiantes.carrera) as carrera, Pasantes.fechaInicio, Pasantes.organizacion FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Pasantes ON pivote.id_pasantia = Pasantes.id WHERE Estudiantes.cedula='${req.params.ced}'`, (er, fields) => {

					doc.pipe(fs.createWriteStream('carta-postulacion-'+req.params.ced+'.pdf'))

					doc.font('public/fonts/DejaVuSerifCondensed-Bold.ttf')

					// HACER EL LOGO DINAMICO
					doc.image('public/images/img.png', 30, 30, {width: 130})
					doc.fontSize(12)
						.text('INSTITUTO UNIVERSITARIO DE TECNOLOGÍA PASCAL', 195, 40)

					doc.font('public/fonts/DejaVuSerifCondensed.ttf')

					doc.fontSize(10)
						.text('Gaceta Oficial N° 36.104 / Decreto Presidencial de la República N° 1608', 198, 55)

					doc.moveTo(540, 80)
						.lineTo(190, 80)
						.stroke()

					doc.fontSize(11)
						.text('Calle Páez C/C Mariño. Cagua. Estado Aragua.\nTelf: 0244 - 395.80.64', 205, 105, {
							align : 'center'
						})
						.text('Fax: 0244 - 447.21.02 / ', 33, 130, { align: 'center'})

					doc.font('public/fonts/DejaVuSerifCondensed-Bold.ttf')
						.text('Email: pascal@telcel.net.ve', 347, 130 )

					doc.moveTo(540, 150)
						.lineTo(190, 150)
						.stroke()

					doc.text('Ciudadano (a).\n'+req.query.nombrepersonal+'\n'+fields[0].organizacion+'\nPresente.-', 60, 210)

					doc.font('public/fonts/DejaVuSerifCondensed.ttf')

					doc.text('Tengo el agrado de dirigirme a usted, a objeto de postular a '+fields[0].nombre+' '+fields[0].apellido +' portador de la cédula de identidad V.-'+fields[0].cedula+' alumno (a) regular del '+req.query.semestre+' semestre de éste Instituto de Educación Superior en la carrera de '+fields[0].carrera+ ' y desearia con mucho agrado cursar las Pasantías Profesionales en su prestigiosa empresa a partir del ' +fields[0].fechaInicio+'.', 60, 290,{ 
							align : 'justify',
							indent: 40
						})

					doc.text('En otro orden de ideas cabe señalar que la duración mínima establecida para el pasante es de catorce (14) semanas a tiempo completo debiendo concluir el día '+ req.query.fechafin +' (fecha estimada).' , 60,380, { 
							align: 'justify',
							indent : 40
						})

					doc.text('Agradeciendo infinitamente, su atención y colaboración prestada.', 60, 440, { align: 'center' })

					doc.text('Se despide de usted', 60, 480, { align: 'center' })
					doc.text('Atentamente', 60, 507, { align: 'center' })

					doc.moveTo(390, 580)
						.lineTo(210, 580)
						.stroke()

					doc.text('MSc. '+per[1].nombreEmp+'\nCoordinación de pasantías. ', 60, 600, { align: 'center' })

					doc.text('Anexo al presente: Curriculum Vitae del Alumno.\nPasantías/Postulaciones/A.M 927', 60, 680)
				
					doc.end()
					
					let ruta = path.dirname(path.dirname(__dirname))
					console.log(ruta)
					res.redirect('/estudiante/Pasantia/' +fields[0].id +'?msg='+ ruta)
				})
			})
		})
	},

	certificadoPasan : (req, res) => {

		req.getConnection((err, con) => {
			con.query(`UPDATE Pasantes SET fechaFin='${req.query.ffinpas}' WHERE id='${req.query.id}'`)
		})

		req.getConnection((err, con) => {
			con.query(`SELECT upper(nombreEmp) as nombreEmp, cedulaEmp, upper(profesion) as profesion FROM empleados`, (e, per) => {
				con.query(`SELECT Estudiantes.id, upper(Estudiantes.nombre) as nombre, upper(Estudiantes.apellido) as apellido, Estudiantes.cedula, upper(Estudiantes.carrera) as carrera, upper(Pasantes.organizacion) as organizacion, Pasantes.tutor, Pasantes.cedulaTutor, Pasantes.cargoTutor, Pasantes.espTutor, Pasantes.direccionOrg, Pasantes.telefonoOrg FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Pasantes ON pivote.id_pasantia = Pasantes.id WHERE Estudiantes.cedula='${req.params.ced}'`, (er, fields) => {

					let fecha = new Date()
					let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
					let dias = fecha.getDate()
					let mesnum = fecha.getMonth()
					let anio = fecha.getFullYear()

					res.render('certificadoPasan', {info : fields, mes : mes, dias: dias, mesnum: mesnum, anio : anio, per : per})

					// let ruta = path.dirname(path.dirname(__dirname))
					// res.redirect('/estudiante/Pasantia/' +fields[0].id +'?msg='+ ruta)
				})
			})
		})
	},
	certificadoSC : (req, res) => {

		req.getConnection((err, con) => {
			con.query(`UPDATE ServicioComunitario SET fechaFin='${req.query.sevend}' WHERE id='${req.query.id}'`)
		})

		req.getConnection((err, con) => {
			con.query(`SELECT upper(nombreEmp) as nombreEmp, cedulaEmp, upper(profesion) as profesion FROM empleados`, (e, per) => {
				con.query(`SELECT date_format(now(), '%d-%m-%Y') as fecha, Estudiantes.id, upper(Estudiantes.nombre) AS nombre, upper(Estudiantes.apellido) AS apellido, Estudiantes.cedula, upper(Estudiantes.carrera) AS carrera, upper(ServicioComunitario.proyecto) AS proyecto FROM pivote INNER JOIN ServicioComunitario ON pivote.id_comunitario = ServicioComunitario.id INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id WHERE Estudiantes.cedula='${req.params.ced}'`, (er, fields) => {


					let periodo = ''
					if (fields[0].fecha.split('-')[1] <= 2 ) {
						periodo = fields[0].fecha.split('-')[2] - 1 +'-II'
					}
					else if (fields[0].fecha.split('-')[1] >= 10 && fields[0].fecha.split('-')[1] <= 12) {
						periodo = fields[0].fecha.split('-')[2] +'-II'
					}
					else if(fields[0].fecha.split('-')[1] >= 3 && fields[0].fecha.split('-')[1] <= 7 ) {
						periodo = fields[0].fecha.split('-')[2] +'-I'	
					}


					let fecha = new Date()
					let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
					let dias = fecha.getDate()
					let mesnum = fecha.getMonth()
					let anio = fecha.getFullYear()


					res.render('certificadoSC', {info : fields, mes : mes, dias: dias, mesnum: mesnum, anio : anio, periodo:periodo, per : per})

				})
			})
		})
	},
	listadoServCom : (req, res) => {

		req.getConnection((err, con) => {
			con.query(`SELECT upper(nombreEmp) as nombreEmp, cedulaEmp, upper(profesion) as profesion FROM empleados`, (e, per) => {
				con.query(`SELECT ServicioComunitario.horasCumplidas ,Estudiantes.id, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.cedula, Estudiantes.carrera FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN ServicioComunitario ON pivote.id_comunitario = ServicioComunitario.id WHERE pivote.id_comunitario ORDER BY Estudiantes.carrera`, (er, fields) => {

					res.render('listadosercom', {info : fields, anio : new Date().getFullYear(), per : per})
				})
			})
		})
	},

	listadoPasantia : (req, res) => {

		req.getConnection((err, con) => {
			con.query(`SELECT upper(nombreEmp) as nombreEmp, cedulaEmp, upper(profesion) as profesion FROM empleados`, (e, per) => {
				con.query(`SELECT Pasantes.semanas ,Estudiantes.id, Estudiantes.nombre, Estudiantes.apellido, Estudiantes.cedula, Estudiantes.carrera FROM pivote INNER JOIN Estudiantes ON pivote.id_estudiantes = Estudiantes.id INNER JOIN Pasantes ON pivote.id_pasantia = Pasantes.id WHERE pivote.id_pasantia ORDER BY Estudiantes.carrera`, (er, fields) => {

					res.render('listadopasantia', {info : fields, anio : new Date().getFullYear(), per : per})

				})
			})
		})
	}
}