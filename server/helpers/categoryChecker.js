const isCategory = (cate) => {
  const categories = [
    'Curtain',
    'Blind',
    'Accessories'
  ];
  return categories.includes(cate);
};

export default isCategory;
