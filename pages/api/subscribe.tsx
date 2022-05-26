import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from '~/lib/functions/log';
import HTTP_RESPONSE from 'lib/data/http_codes';

const MODULE_NAME = 'subscribe';
const prisma = new PrismaClient();

type ResponseData = string;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  let status = HTTP_RESPONSE.OK;
  let msg = 'User added successfully';
  if (req.method !== 'POST') {
    res.status(HTTP_RESPONSE.BAD_REQUEST).send('not allowed');
    return;
  }

  if (!req.body) {
    return res.status(HTTP_RESPONSE.BAD_REQUEST).send('No information sent in POST');
  }

  await prisma.user
    .upsert({
      where: {
        email: req.body.email,
      },
      update: {
        name: req.body.email,
        headers: JSON.stringify(req.headers),
      },
      create: {
        email: req.body.email,
        name: req.body.name,
        headers: JSON.stringify(req.headers),
      },
    })
    .catch((e: any) => {
      log(MODULE_NAME, `Cant't create user ${req.body.email}. Error ${e}`);
      log(MODULE_NAME, `file is ${process.env.DATABASE_URL}`);
      status = HTTP_RESPONSE.INTERNAL_SERVER_ERROR;
      msg = `Can't create user ${req.body.email} because of ${e}`;
    })
    .finally(async () => await prisma.$disconnect());

  res.status(status).send(msg);

  if (status === HTTP_RESPONSE.OK) {
    log('subscribe', `User ${req.body.email} created successfully`);
  }
}
