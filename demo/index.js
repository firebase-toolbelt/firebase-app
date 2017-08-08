const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

function listSources(source) {
	return readdirSync(source)
		.map(name => join(source, name));
}

function listFolders(sourcePath) {

	return listSources(sourcePath)
		.filter(source => (
			lstatSync(source).isDirectory()
		));

}

function listFiles(filesFolderPath) {

	return listSources(filesFolderPath)
		.filter(source => (
			!lstatSync(source).isDirectory()
		));

}

function getFiles(filePaths) {

	const files = [];

	return new Promise((resolve, reject) => {
		filePaths.forEach(filePath => {

			const fileReaded = require(`./${filePath}`);
			files.push(fileReaded);

			if (files.length == filePaths.length) {
				resolve({ filePath, files });
			}

		});
	});

}

listFolders('./actions').forEach(folderPath => {

	const filePaths = listFiles(`./${folderPath}`);

	getFiles(filePaths).then(({ filePath, files }) => {
		files.forEach(file => {

			console.log(file);

		});
	});

})
