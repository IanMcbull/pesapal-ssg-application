import path from "path"
import express from "express"
import emoji from "node-emoji"
import chalk from "chalk"
const port = process.env.PORT || 8000;
const app = express();


import {getTheTemplateFile,readMDFile,updateTemplateContent,createFile,pages} from "../utils/generatepages.js"

function main(){
 const template = getTheTemplateFile('template.html')
 pages.forEach(page=>{
  const md = readMDFile(path.basename(page))
  // console.log(path.basename(page).replace(regezPattern,'.html'))
  const newTemplate =  updateTemplateContent(template,md)
  createFile(md.newFileName,newTemplate)
 })
   app.listen(port,()=>{
       console.log(`${chalk.blueBright('Files successfully generated')} ${emoji.get('rainbow')}`)
       console.log(chalk.blueBright(`1. Go into the ${chalk.yellowBright.bold('dist')} folder and open ${chalk.yellowBright.bold('index.html')} with vs code live server extension`))
       console.log(chalk.yellow('2. Keep this terminal open to see live changes as you edit your content'))    
   })

}
main();