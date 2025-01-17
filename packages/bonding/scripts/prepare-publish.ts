import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 使用绝对路径
const packagePath = path.resolve(__dirname, '../package.json')
const backupPath = path.resolve(__dirname, '../package.json.backup')

try {
  // 读取当前的 package.json
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))

  // 备份原始文件
  fs.writeFileSync(backupPath, JSON.stringify(pkg, null, 2))

  // 修改 exports 配置为发布配置
  pkg.exports = {
    '.': {
      types: './dist/ckb-fi-bonding.d.ts',
      import: './dist/ckb-fi-bonding.mjs',
      require: './dist/ckb-fi-bonding.cjs'
    }
  }

  // 写入修改后的配置
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2))

  console.log('Successfully prepared package.json for publishing')
} catch (error) {
  console.error('Error preparing package.json:', error)
  process.exit(1)
}
