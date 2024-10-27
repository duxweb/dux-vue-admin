import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import copyfiles from 'copyfiles'

async function updatePackageJson() {
  const __dirname = resolve()

  const sourceFiles = 'src/static/**/*';
  const targetDirs = ['dist/esm', 'dist/cjs'];

   await Promise.all(targetDirs.map(async (dir) => {
    const fullPath = join(__dirname, dir);
    await mkdir(fullPath, { recursive: true })
    await copyfiles([sourceFiles, dir], { up: 1 }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  }));


  const packagePath = join(__dirname, 'package.json')
  const packageData = JSON.parse(await readFile(packagePath, 'utf8'))

  packageData.main = 'dist/cjs/index.js'
  packageData.module = 'dist/esm/index.js'
  packageData.exports = {
    "import": {
      "types": "./dist/esm/index.d.ts",
      "default": "./dist/esm/index.js"
    },
    "require": {
      "types": "./dist/cjs/index.d.ts",
      "default": "./dist/cjs/index.js"
    },
    "default": {
      "default": "./dist/umd/index.js"
    }
  }

  const distDir = join(__dirname, 'dist')

  const distPackagePath = join(distDir, 'package.json')
  await writeFile(distPackagePath, JSON.stringify(packageData, null, 2), 'utf8')
}

updatePackageJson().catch((error) => {
  console.error('An error occurred:', error)
})
