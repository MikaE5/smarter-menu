const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const getPageConfig = async () => {
  const customer = process.env.CUSTOMER;
  if (customer === undefined) {
    console.log('### No customer defined');
    process.exit(1);
  }

  console.log(
    `\n\n### Start fetching page config for customer: ${customer} ###\n`
  );

  const res = await fetch(
    'test.test.com', //'https://gaqyjbmgml.execute-api.eu-central-1.amazonaws.com/page-config',
    {
      method: 'post',
      headers: {
        'x-netlify-host': 'smarter-menu-netlify',
      },
      body: JSON.stringify({
        customer_id: customer,
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('### Could not load page config');
      process.exit(1);
    });

  const pageConfig = res.data;
  if (pageConfig === undefined) {
    console.log('### No page config available.');
    process.exit(1);
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
  console.log('### Error while fetching page config.');
  process.exit(1);
}
