export const getOffset = (el) => {
  /* eslint-disable no-param-reassign */
  const parent = document.querySelector('.page');
  let x = 0;
  let y = 0;
  while (el && el !== parent && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { x, y };
};
