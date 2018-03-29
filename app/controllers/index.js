const fs = require('fs')
const path = require('path')

var files = fs.readdirSync(__dirname)

files.forEach((file) => {
	var fileName = path.basename(file, '.js')

	if (fileName !== 'index' && fileName !== 'hola') {
		exports[fileName] = require('./' + fileName)
	}
})