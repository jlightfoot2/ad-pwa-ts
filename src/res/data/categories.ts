
const categories = [
  {id: 1, title: 'Home', path: '/', featured: true, img: ''},
  {id: 2, title: 'My Apps',  path: '/apps', featured: true, img: ''},
  {id: 3, title: 'Catalog',  path: '/catalog', featured: false, img: ''},
];

const categoriesMap = categories.reduce((acc,cat) => {
  acc[cat.id] = cat
  return acc;
}, {});

export const mainMenu = [
    {id: 1, type: 'divider' , item: {}},
    {id: 2, type: 'link' , item: categoriesMap[1]},
    {id: 3, type: 'divider' , item: {}},
    {id: 4, type: 'link' , item: categoriesMap[2]},
    {id: 5, type: 'link' , item: categoriesMap[3]},
    {id: 8, type: 'divider' , item: {}},
];

export default categories;