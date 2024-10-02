import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

async function updatePackageJson() {
  const __dirname = resolve()
  const packagePath = join(__dirname, 'package.json')
  const packageData = JSON.parse(await readFile(packagePath, 'utf8'))

  packageData.main = 'index.ts'
  packageData.types = 'index.d.ts'

  const distDir = join(__dirname, 'dist')
  await mkdir(distDir, { recursive: true })

  const distPackagePath = join(distDir, 'package.json')
  await writeFile(distPackagePath, JSON.stringify(packageData, null, 2), 'utf8')
}

updatePackageJson().catch((error) => {
  console.error('An error occurred:', error)
})
