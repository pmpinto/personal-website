const fs = require('fs')
const path = require('path')
const { ExifImage } = require('exif')

const PHOTOGRAPHER_ENTRIES_DIR = './src/photographer'

const logMessage = (type, message) => {
  console[type]('[photographer-entry-from-photo]', message)
}

const cameraDict = {
  'ONEPLUS A5000': 'OnePlus 5',
  'Canon EOS 70D': 'Canon EOS 70D',
}

const getExifDataFromFile = (file) => new Promise((resolve, reject) => {
  try {
    ExifImage(file, ((error, exifData) => {
      if (error) {
        reject(error)
        return
      }

      resolve(exifData)
    }))
  } catch (error) {
    reject(error)
  }
})

const getExposureTime = (value) => {
  if (!value) {
    return ''
  }

  return value > 1 ? `${value}s` : `1/${Math.ceil(1000 / (value * 1000))}s`
}

const getCameraModel = (value) => {
  if (!value) {
    return ''
  }

  return cameraDict[value]
}

const getLensModel = (value) => {
  if (!value) {
    return ''
  }

  return value
}

const getPhotographerDataObject = (exifData, imagePath) => ({
  date: exifData.image.ModifyDate ? exifData.image.ModifyDate.split(' ')[0].replace(/:/g, '-') : '',
  location: '',
  camera: getCameraModel(exifData.image.Model),
  lens: getLensModel(exifData.exif.LensModel),
  aperture: exifData.exif.ApertureValue ? `ƒ/${exifData.exif.ApertureValue}` : '',
  shutter: getExposureTime(exifData.exif.ExposureTime),
  iso: exifData.exif.ISO || '',
  slug: path.basename(imagePath, path.extname(imagePath)).toLowerCase(),
  image: `/static_assets/images/uploads/resized/${path.basename(imagePath)}`,
  categories: [],
})

const getFrontMatterFromObject = (object) => {
  let frontMatter = '---\n'

  Object.keys(object).forEach((key) => {
    frontMatter += `${key}: ${object[key]}\n`
  })

  frontMatter += '---'

  return frontMatter
}

const createMarkdownFile = async (sourceFile, newFilePath) => {
  const exifData = await getExifDataFromFile(sourceFile)
  const photographerDataObject = getPhotographerDataObject(exifData, sourceFile)

  fs.writeFile(newFilePath, getFrontMatterFromObject(photographerDataObject), { flag: 'w+' }, (error) => {
    if (error) {
      logMessage('error', `Error while creating file: ${newFilePath}`)
      logMessage('error', error)
      return
    }

    logMessage('log', `Created: ${newFilePath}`)
  })
}

const lookupFiles = (sourceFolder) => {
  const filesInFolder = fs.readdirSync(sourceFolder)

  filesInFolder.forEach((file) => {
    const filePath = `${sourceFolder}/${file}`
    const fileNameWithoutExtension = path.basename(filePath, path.extname(filePath)).toLowerCase()

    const entryFilePath = `${PHOTOGRAPHER_ENTRIES_DIR}/${fileNameWithoutExtension}.md`
    const entryExists = fs.existsSync(entryFilePath)

    if (entryExists) {
      logMessage('log', `File already exists: ${filePath}`)

      return
    }

    createMarkdownFile(filePath, entryFilePath)
  })
}

const init = () => {
  const sourceFolder = process.argv[2]

  if (!sourceFolder) {
    logMessage('error', 'Expected source folder to be provided')
    return
  }

  logMessage('log', `Working folder: ${sourceFolder}`)

  lookupFiles(sourceFolder)
}

init()
