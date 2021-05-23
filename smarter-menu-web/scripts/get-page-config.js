const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const getPageConfig = async () => {
  const customer = process.env.CUSTOMER;
  if (customer === undefined) {
    throw new Error('No customer defined!');
  }

  console.log(
    `\n\n### Start fetching page config for customer: ${customer} ###\n`
  );

  const res = await fetch(
    ' https://992x1q7ut1.execute-api.eu-central-1.amazonaws.com/page-config',
    {
      method: 'post',
      headers: {
        'x-netlify-host': 'smarter-menu-netlify',
      },
      body: JSON.stringify({
        customer_id: customer,
      }),
    }
  ).then((res) => res.json());

  const pageConfig = res.data;
  if (pageConfig === undefined) {
    throw new Error('No page config available.');
  }

  const CWD = process.cwd(); // will be smarter-menu-web since this script will be executed from prebuild in package.json
  const pageConfigPath = path.join(CWD, 'src', 'page-config.json');
  fs.writeFileSync(pageConfigPath, JSON.stringify(pageConfig));
  console.log(
    `\n\n### Successfully fetched page config for customer: ${customer} ###\n`
  );
};

try {
  getPageConfig();
} catch (error) {
  throw new Error('Error while fetching page config.');
}
