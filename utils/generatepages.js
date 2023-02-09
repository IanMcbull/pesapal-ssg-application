import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { mkdirp } from "mkdirp";
import glob from "glob"
// I use the glog package to find one or more filenames that have a .md extension and returning an array of the files

const pages = glob.sync('src/pages/**/*.md')

// This function will be responsible for reading the markdown file and transforming it into html

const readMDFile = (filename) => {
  const fileToRead = path.join(path.resolve(), `src/pages/${filename}`);
  const baseName = path.basename(fileToRead);
  const file = baseName.substring(0, baseName.length - 3)
  const newFileName = `${file}.html`;
  const readTheFile = fs.readFileSync(fileToRead, "utf-8");
  const parsedMarkDown = matter(readTheFile);
  const markDownHeaders = parsedMarkDown.data;
  let html = marked(parsedMarkDown.content);
  html = html.replace(/src="\.\.\/assets\/images\/cover-image.png"/g,`src="../src/assets/images/cover-${file}.png"`)
  return {
    markDownHeaders,
    html,
    newFileName,
  };
};

// Get the template file and read its contents
// Returns the html content as a string
const getTheTemplateFile = (filename) => {
  const fileToRead = path.join(path.resolve(), `src/${filename}`);
  const readTheFile = fs.readFileSync(fileToRead, "utf-8");
  return readTheFile;
};

// This functions creates a new dist folder then creates the necessary html files in the dist folder
const createFile = (filename, contents) => {
  mkdirp.sync(`${path.resolve()}/dist`);
  fs.writeFileSync(path.join(path.resolve(), `dist/${filename}`), contents);
};

// This function takes our html template as a string and updates it using our markdown content

const updateTemplateContent = (template, markdownData) => {
 return template
    .replace(/<!--CONTENT-->/g, markdownData.html)  
};


export {
  readMDFile,
  getTheTemplateFile,
  updateTemplateContent,
  createFile,
  pages
};
