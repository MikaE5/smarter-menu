const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const getPageConfig = async () => {
  console.log(`\n\n### Start fetching page configs: ###\n`);

  const environment = process.env.ENVIRONMENT;
  const DEV_CONFIGS = ['smarter-menu', 'smarter-menu-test'];

  if (environment !== undefined && environment === 'dev') {
    console.log(`\n\n### Fetching page configs for DEV environment: ###\n`);
  }

  const res = await fetch(
    'https://gaqyjbmgml.execute-api.eu-central-1.amazonaws.com/page-configs',

    {
      method: 'post',
      headers: {
        'x-netlify-host': 'smarter-menu-netlify',
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('### Could not load page configs');
      process.exit(1);
    });

  const pageConfigs =
    environment === 'dev'
      ? res.data.filter((config) => DEV_CONFIGS.includes(config.customer_id))
      : res.data.filter((config) => config.customer_id !== 'smarter-menu-test');
  if (pageConfigs === undefined) {
    console.log('### No page configs available.');
    process.exit(1);
  }

  const CWD = process.cwd(); // will be smarter-menu-web since this script will be executed from prebuild in package.json
  const pageConfigPath = path.join(CWD, 'src', 'page-configs.json');
  fs.writeFileSync(pageConfigPath, JSON.stringify(pageConfigs));
  console.log(
    `\n\n### Successfully fetched page configs for customers: ${pageConfigs.map(
      (config) => config.customer_id
    )} ###\n`
  );
};

try {
  getPageConfig();
} catch (error) {
  console.log('### Error while fetching page config.');
  process.exit(1);
}
