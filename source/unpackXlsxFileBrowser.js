import { loadAsync } from 'jszip'

/**
 * Reads XLSX file in a browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */
export default function unpackXlsxFile(file) {
	const files = {}

	return loadAsync(file).then((zip) => {
		const files = []
		zip.forEach((relativePath, zipEntry) => {
			files.push(zipEntry.name)
		})

		const entries = {}
		return Promise.all(files.map((file) => {
if(zip.file(file) === null){
        return null;
      }
			return zip.file(file).async('string').then(content => entries[file] = content)
		}))
		.then(() => entries)
	})
}
