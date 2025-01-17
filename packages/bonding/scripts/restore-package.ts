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
  // 如果有备份文件，则还原
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, packagePath)
    fs.unlinkSync(backupPath)
    console.log('Successfully restored package.json')
  } else {
    console.warn('No backup file found, skipping restore')
  }
} catch (error) {
  console.error('Error restoring package.json:', error)
  process.exit(1)
}
