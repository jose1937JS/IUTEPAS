$(function(){

	$(".editar").click(function() {
		console.log(this)
		$('#editar').slideToggle()
	})


	$('[data-toggle="tooltip"]').tooltip()

	$('#tipo').on('change', function(){

		if ($('#tipo').val() == 'Seminario') {
			$('#seminari').removeAttr('disabled')
			$('#dir').attr('disabled', '')
			$('#esp').attr('disabled', '')
			$('#tutor').attr('disabled', '')
			$('#inst').attr('disabled', '')
			$('#fecha').attr('disabled', '')
			$('#carrera').attr('disabled', '')
			$('#proyec').attr('disabled', '')
			$('#tutorAcad').attr('disabled', '')
			$('#cedulaAcad').attr('disabled', '')
			$('#instpasan').attr('disabled', '')
			$('#cedulaTutor').attr('disabled', '')
			$('#correoTutor').attr('disabled', '')
			$('#cargoTutor').attr('disabled', '')
			$('#telOrg').attr('disabled', '')
		}
		
		if ($('#tipo').val() == 'Pasantia') {
			$('#dir').removeAttr('disabled')
			$('#esp').removeAttr('disabled')
			$('#tutor').removeAttr('disabled')
			$('#fecha').removeAttr('disabled')
			$('#telOrg').removeAttr('disabled')
			$('#cedulaAcad').removeAttr('disabled')
			$('#tutorAcad').removeAttr('disabled')
			$('#cargoTutor').removeAttr('disabled')
			$('#cedulaTutor').removeAttr('disabled')
			$('#correoTutor').removeAttr('disabled')
			$('#instpasan').removeAttr('disabled')
			$('#carrera').removeAttr('disabled')
			$('#inst').attr('disabled', '')
			$('#proyec').attr('disabled', '')
			$('#seminari').attr('disabled', '')
		}

		if ($('#tipo').val() == 'ServicioComunitario') {
			$('#dir').attr('disabled', '')
			$('#esp').attr('disabled', '')
			$('#tutor').attr('disabled', '')
			$('#instpasan').attr('disabled', '')
			$('#cargoTutor').attr('disabled', '')
			$('#cedulaTutor').attr('disabled', '')
			$('#correoTutor').attr('disabled', '')
			$('#cedulaAcad').attr('disabled', '')
			$('#seminari').attr('disabled', '')
			$('#telOrg').attr('disabled', '')
			$('#tutorAcad').attr('disabled', '')
			$('#carrera').removeAttr('disabled')
			$('#proyec').removeAttr('disabled')
			$('#fecha').removeAttr('disabled')
			$('#inst').removeAttr('disabled')
		}
	});

	// auto dismiss
	let interval = setTimeout(() => {
		$('.alert').alert('close')
	}, 4000);

	// MEnsajito de pdf creado corrctaemente
	if (location.href.indexOf('?') != -1) {
		let msg = location.href.split('?')[1].split('=')[1].replace(/%5C/g, '/')

		console.log(msg)
		console.log(location.href)
		$('#msj').text(msg)
		$('#pdf')
			.css('display', 'block')
			.addClass('show')
	}

	if (location.href.indexOf('/pdf/') != -1) {
		$('#body').ready(() => {
			print()
			setTimeout(() => {
				location.href = '/inicio'
			}, 300)
		})
	}

	// ajax
	let cedula = $('#cedula');
	cedula.change(() => {
		$.ajax({
		    url : '/ajax',	 	
		    data: {
		    	cedula	: cedula.val()
		    },
		    type : 'POST',
		    success : function(data) {
		    	$('#nombre').val(data[0].nombre)
		    	$('#apellido').val(data[0].apellido)
		    	$('#telefono').val(data[0].telefono)
		    	$('#email').val(data[0].correo)
		    },
		    error : function(xhr, status) {
		    	console.log(xhr)
		    }
		})
	})
	
})