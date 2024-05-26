import * as fs from 'fs'

// check if the file path is provided
if (process.argv.length < 3) {
	console.log('Offer a file path as argument to add Vercel config, Please!')
	process.exit(1)
}

const filePath = process.argv[2]

// the content to add in the file
const contentToAdd = `
export const config = {
	supportsResponseStreaming: true,
	api: {
		badyParse: false,
	},
}
export const dynamic = 'force-dynamic'

`

fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error(`Cannot read file: ${err.message}`)
		process.exit(1)
	}
	const newData = contentToAdd + data

	fs.writeFile(filePath, newData, 'utf8', (err) => {
		if (err) {
			console.error(`Cannot write file: ${err.message}`)
			process.exit(1)
		}

		console.log('Add Vercel config in compiled JS file successfully!')
	})
})
