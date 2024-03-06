const fs = require("fs")
const path = require("path")

const directoryPath = path.join(__dirname, "../public")

function checkFilenames(dir) {
  let invalidFilenames = [] // Array to store invalid filenames

  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(`Unable to scan directory: ${err}`)
      process.exit(1) // Exit with error if unable to read directory
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file.name)
      if (file.isDirectory()) {
        checkFilenames(filePath) // Recursively check files in subdirectory
      } else {
        if (file.name.includes(" ")) {
          invalidFilenames.push(filePath) // Add invalid filename to the array
        }
      }
    })

    if (invalidFilenames.length > 0) {
      console.error("Invalid filenames detected:")
      invalidFilenames.forEach((filename) => {
        console.error(`- "${filename}". Filenames should not contain spaces.`)
      })
      process.exit(1) // Exit with error
    }
  })
}

checkFilenames(directoryPath)
