import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';

export async function insertContactManager(params) {
  return request(`${CONFIG.API_ENDPOINT}/web/c/contactManagers?`, {
    method: 'POST',
    body: { ...params }
  });
}

export async function queryDocumentManagers(params) {
  const { range } = params;
  const query = {
    range: JSON.stringify(range || [0, 50])
  };
  return request(`${CONFIG.API_ENDPOINT}/web/c/documentManagers?${stringify(query)}`);
}
export async function queryOneDocumentManager(id) {
  return request(`${CONFIG.API_ENDPOINT}/web/c/documentManagers/${id}`);
}