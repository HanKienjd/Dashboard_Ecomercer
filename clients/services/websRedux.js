import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
// eslint-disable-next-line import/prefer-default-export
export async function queryMenus(params) {
  const { filter, sort, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['name', 'ASC']),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/menus/find/all/parent-child?${stringify(query)}`);
}

export async function queryCategoryInfo(id) {
  return request(`${CONFIG.API_SERVER_WEB}/categories/${id}`);
}
export async function queryCategoryInfoByName(name) {
  // console.log(`${CONFIG.API_SERVER_WEB}/categories/${name}`);

  return request(`${CONFIG.API_SERVER_WEB}/categories/${name}`);
}
export async function queryCategoryAll(params) {
  const { filter, sort, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['name', 'DESC']),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/categories?${stringify(query)}`);
}

export async function queryArticleAll(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['createDate', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/articles?${stringify(query)}`);
}

export async function queryAd(params) {
  const { filter, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/ads?${stringify(query)}`);
}

export async function queryArticleInfoByName(payload) {
  const { name, attributes } = payload;
  return request(`${CONFIG.API_SERVER_WEB}/articles/${name}${attributes || ''}`);
}

export async function queryWebInfo(id) {
  return request(`${CONFIG.API_SERVER_WEB}/sites/${id}`);
}
export async function queryChildrenCategoryAll(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['name', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  console.log(`${CONFIG.API_SERVER_WEB}/categories/find/list/parent-child?${stringify(query)}`);

  return request(`${CONFIG.API_SERVER_WEB}/categories/find/list/parent-child?${stringify(query)}`);
}
export async function queryTreeCategoryById(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['name', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(
    `${CONFIG.API_SERVER_WEB}/categories/find/getbycategories/parent-child?${stringify(query)}`
  );
}
export async function queryArticleInfo(payload) {
  const { id, attributes } = payload;
  /* const { filter, sort } = params;
    const query = {
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort || )
    }; */
  // console.log(`${CONFIG.API_SERVER_WEB}/categories/${id}`)
  return request(`${CONFIG.API_SERVER_WEB}/articles/${id}${attributes || ''}`);
}
export async function queryDataSiteUrl(params) {
  const { filter, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/sites?${stringify(query)}`);
}

export async function queryProductAll(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['createDate', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProducts?${stringify(query)}`);
}

export async function queryProductInfo(payload) {
  const { id, attributes } = payload;
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProducts/${id}${attributes || ''}`);
}

export async function queryProductVACAll(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['createDate', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProductsVAC?${stringify(query)}`);
}

export async function queryProductVACInfo(id) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProductsVAC/${id}`);
}

export async function createProductVAC(params) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProductsVAC`, {
    body: { ...params },
    method: 'POST',
  });
}

export async function updateProductVAC({ id, ...params }) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProductsVAC/${id}`, {
    body: { ...params },
    method: 'PUT',
  });
}

export async function queryOrdersAll(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['createDate', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceOrders?${stringify(query)}`);
}

export async function queryOrdersInfo(id) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceOrders/${id}`);
}

export async function queryOrderByToken(query) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceOrders/getOrder?${stringify(query)}`);
}

export async function createOrders(params) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceOrders`, {
    body: { ...params },
    method: 'POST',
  });
}

export async function updateOrders({ id, ...params }) {
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceOrders/${id}`, {
    body: { ...params },
    method: 'PUT',
  });
}

export async function getListProducers(params) {
  // console.log("asfaF")
  const { filter, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(
    `${CONFIG.API_SERVER_WEB}/ecommerceProducts/getProducers/list?${stringify(query)}`
  );
}

export async function queryPricingInfor(params) {
  const { filter, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    //   sort: JSON.stringify(sort || ['name', 'ASC']),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/servicePackages/get/all?${stringify(query)}`);
}

export async function queryServicesInfor(params) {
  const { filter, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/services?${stringify(query)}`);
}
export async function queryOpenShedules(payload) {
  return request(`${CONFIG.API_SERVER_WEB}/openShedules/places/${payload.id}`);
}

export async function queryProductsCataLog(params) {
  const { filter, sort, range, limitPerCatalog, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['createDate', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
    limitPerCatalog: Number(limitPerCatalog),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  if (!limitPerCatalog) {
    delete query.limitPerCatalog;
  }
  return request(`${CONFIG.API_SERVER_WEB}/productsCatalog/get/all?${stringify(query)}`);
}

export async function queryProductCollection(params) {
  const { filter, sort, range, attributes } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ['createDate', 'DESC']),
    range: JSON.stringify(range || [0, 49]),
  };
  if (attributes) {
    query.attributes = attributes;
  }
  return request(`${CONFIG.API_SERVER_WEB}/ecommerceProductCollection?${stringify(query)}`);
}
