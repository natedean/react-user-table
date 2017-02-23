const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const projectName = JSON.parse(fs.readFileSync('package.json', 'utf8')).name;

const destRoot = path.relative(__dirname, '/Users/nate.dean/Nate/ejs_gt');

const srcCssPath = './build/static/css';
const srcJsPath = './build/static/js';

const destCssPath = `${destRoot}/public/css/${projectName}`;
const destJsPath = `${destRoot}/public/js/${projectName}`;
const tplPath = `${destRoot}/views/partials/scripts/${projectName}.ejs`;

const assembleLinksWithProjectName = assembleLinks(projectName);
const assembleScriptsWithProjectName = assembleScripts(projectName);

const srcCssFiles = fs.readdirSync(srcCssPath).filter(fileName => !fileName.includes('.map'));
const srcJsFiles = fs.readdirSync(srcJsPath).filter(fileName => !fileName.includes('.map'));

cleanDirectories([destCssPath, destJsPath]);
refreshTemplateTags(tplPath, srcCssFiles, srcJsFiles);

transferFilesInDir(srcCssFiles, srcCssPath, destCssPath);
transferFilesInDir(srcJsFiles, srcJsPath, destJsPath);

function transferFilesInDir(srcFiles, srcPath, destPath) {
  srcFiles.forEach(fileName => fs.copy(`${srcPath}/${fileName}`, `${destPath}/${fileName}`));
}

function refreshTemplateTags(tplPath, cssFileNames, jsFileNames) {
  const markup = fs.readFileSync(tplPath, 'utf-8');

  const $ = cheerio.load(markup);

  $('link').remove();
  $('script').remove();

  $.root().append(assembleLinksWithProjectName(cssFileNames));

  $.root().append(assembleScriptsWithProjectName(jsFileNames));

  fs.writeFileSync(`${tplPath}`, $.html(), 'utf8');
}

function cleanDirectories(dirNames){
  dirNames.forEach(dirName => fs.emptyDirSync(dirName));
}

function assembleLinks(projectName) {
  return (fileNames) => fileNames.reduce((acc, fileName) => {
    acc = acc + `<link rel="stylesheet" href="css/${projectName}/${fileName}">`;
    return acc;
  }, '');
}

function assembleScripts(projectName) {
  return (fileNames) => fileNames.reduce((acc, fileName) => {
    acc = acc + `<script async type="text/javascript" src="js/${projectName}/${fileName}"></script>`;
    return acc;
  }, '');
}
