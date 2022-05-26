import { execa } from 'execa';
import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '~/lib/functions/config';

type ResponseData = string;

const getVersion = async () => {
  const { stdout } = await execa('scripts/postbuild.sh');
  return stdout;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // res.status(200).send(await getVersion());
  res.status(200).send((await getVersion()) + '\n\nBUILDID: ' + process.env.CONFIG_BUILD_ID);
}
