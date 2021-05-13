const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const customer = process.env.CUSTOMER; //process.argv[2];
if (customer === undefined) {
  throw new Error('No customer defined!');
}

console.log(
  `\n\n### Start injecting customer data for customer: ${customer} ###\n`
);

const CWD = process.cwd(); // will be digital-menu-web since this script will be executed from prebuild in package.json
const DATA_FOLDER = path.join(CWD, '..', 'customer-data', customer);
const WEB_FOLDER = path.join(CWD, 'src', 'data', 'menu-data');
const FILES_TO_COPY = [
  'allergens.json',
  'categories.json',
  'classifications.json',
  'menu-items.json',
  'page-content.json',
  'config.json',
];

if (!fs.existsSync(DATA_FOLDER)) {
  throw new Error(`Folder for customer ${customer} does not exist.`);
}

if (!fs.existsSync(WEB_FOLDER)) {
  fs.mkdirSync(WEB_FOLDER);
}

for (const file of FILES_TO_COPY) {
  try {
    console.log(`Copy file ${file} into svelte project.`);

    fs.copyFileSync(path.join(DATA_FOLDER, file), path.join(WEB_FOLDER, file));
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File ${file} does not exist.`);
    } else {
      // fail such that build does not run through
      throw error;
    }
  }
}

console.log(
  `\n### Successfully injected customer data for customer: ${customer} ###\n\n`
);
