import url from 'url';
import { Constants } from 'expo';

export default function buildRedirectUrlForMobile(authType: string) {
  const { protocol, hostname, port } = url.parse(__WEBSITE_URL__);
  const expoHostname = `${url.parse(Constants.linkingUri).hostname}.nip.io`;
  const urlHostname = process.env.NODE_ENV === 'production' ? hostname : expoHostname;

  return `${protocol}//${urlHostname}${port ? ':' + port : ''}/api/auth/${authType}?expoUrl=${encodeURIComponent(
    Constants.linkingUri
  )}`;
}
