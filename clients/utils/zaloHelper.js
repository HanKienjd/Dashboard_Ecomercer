import { ZaloSocial } from 'zalo-sdk';
import publicRuntimeConfig from '@/utils/config';

const zsConfig = {
  appId: `${publicRuntimeConfig.ZALO_ID}`,
  redirectUri: `${publicRuntimeConfig.ZALO_REDIRECT_URL}`,
  appSecret: `${publicRuntimeConfig.ZALO_SECRET_KEY}`
};
export const ZSClient = new ZaloSocial(zsConfig);

export default ZSClient;
