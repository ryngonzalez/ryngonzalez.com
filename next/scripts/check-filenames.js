const fs = require("fs")
const path = require("path")

const directoryPath = path.join(__dirname, "public/images")

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err)
  }
  files.forEach(function (file) {
    if (file.includes(" ")) {
      console.error(
        `Invalid filename detected: "${file}". Filenames should not contain spaces.`
      )
      process.exit(1) // Exit with error
    }
  })
})
