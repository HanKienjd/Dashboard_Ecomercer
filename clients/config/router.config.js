/**
 * đối tượng routes cho web và cms
 * @param { là tên không in hoa = tiếng anh viết liền, cách nhau bằng dấu _ và là duy nhất } name
 * @param { là đường dẫn trên trình duyệt, bắt đầu bằng / } path
 * @param { là đường dẫn đến file vật lý trong thư mục pages } component
*/
module.exports.routes = {
  // web
  web: [
    { path: '/', name: "home", component: 'index' },
    //trang search
    {
      path: '/search', name: 'search', component: 'User/SearchPage'
    },
    //trang giỏ hàng
    {
      path: '/cart', name: 'cart', component: 'User/CartPage'
    },
    //trang thanh toán
    {
      path: '/checkout', name: 'checkout', component: 'User/CheckoutPage'
    },
    //trang thanh toán
    {
      path: '/user', name: 'user', component: 'User/UserPage'
    },



    { path: '/:parentName([a-zA-Z0-9\-]{1,100})/:title([a-zA-Z0-9\-]{1,100})', name: "about", component: 'User/Detail' },
    // { path: '/gioi-thieu-:id(\\d+)', name: "about", component: 'User/about' },
    {
      path: '/product/:parentName([a-zA-Z0-9-]{1,100})/:id([0-9]{1,100})',
      name: 'product',
      component: 'User/DetailProduct',
    },

    { path: '/:name([a-zA-Z0-9\-]{1,100})', name: "category", component: 'User/Category' },
  ],
  dashboard: []
};


