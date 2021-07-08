// tạo mảng với tham số bắt đầu và kết thúc tự định nghĩa
Array.range = (a, b, step) => {
  //a là tham số bắt đầu
  //b là tham số kết thúc
  //step là bước nhảy mỗi lần
  let A = [];
  if (typeof a == 'number') {
    A[0] = a;
    step = step || 1;
    while (a + step <= b) {
      A[A.length] = a += step;
    }
  }
  else {
    let s = 'abcdefghijklmnopqrstuvwxyz';
    if (a === a.toUpperCase()) {
      b = b.toUpperCase();
      s = s.toUpperCase();
    }
    s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
    A = s.split('');
  }
  return A;
}
export const range = Array.range
//hàm phân trang
export const findPage = (total, PAGE_SIZE, currentPage) => {
  const totalPages = Math.ceil(total && total / PAGE_SIZE) //Số trang 
  let startPage, endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }
  return {
    startPage,
    endPage,
    totalPages
  }
}
//lấy ngày tạo tin
export const formatDate = (createDate) => {
  let date
  if (createDate) {
    date = createDate.slice(0, 10)
  }
  return date
}



//tappingText
export const TxtRotate = function (el, toRotate, period, timeWrite) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  this.timeWrite = timeWrite && typeof timeWrite === 'number' ? timeWrite : null
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.placeholder = this.txt;

  let that = this;
  let delta = (this.timeWrite || 100) - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};


export const scrollTop = (id) => {
  const top = id ? ($(`#${id}`).offset().top - 10) : 0
  $('html, body').animate({
    scrollTop: top
  }, 500);
}



//Kiểm tra sản phẩm có giá khuyến mãi không

export const checkDealPrice = (data) => {
  const { price, dealPrice } = data
  if (dealPrice && price && (Number(dealPrice) > 0) && (Number(dealPrice) === Number(price))) {
    return false
  } else if (dealPrice && price && (Number(dealPrice) > 0) && Number(dealPrice) !== Number(price)) {
    return true
  }
  return false
}

//Lấy mảng image từ string
export const getArrImg = (data) => {
  const images = data && (data.image && data.image.split(",") || data.images && data.images.split(","))
  return images || []
}
export const getLinkCategory = (data = {}) => {
  const { categoriesUrlSlugs } = data
  let link = ""
  if (categoriesUrlSlugs && categoriesUrlSlugs.length > 0) {
    const get = categoriesUrlSlugs.find(item => item.status === true)
    link = get && get.urlSlug || ""
    // console.log('get', get)
  }
  return link
}