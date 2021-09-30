import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios, { AxiosResponse } from 'axios';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const body = JSON.parse(event.body);
  /*  const wishlist = body.wishlist;
  const customer_id = body.customer_id;

  if (wishlist === undefined || customer_id === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: 'Bad request',
      }),
    };
  } */

  const res: AxiosResponse = await axios.post(
    `https://gaqyjbmgml.execute-api.eu-central-1.amazonaws.com/hello`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'x-netlify-host': 'smarter-menu-netlify',
      },
    }
  );

  return {
    statusCode: res.status,
    body: JSON.stringify({
      msg: res.statusText + res.data.msg,
      status: res.status,
    }),
  };
}
