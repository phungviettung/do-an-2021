const filterSearch = ({router, page, category, material, sort, search}) => {
    const path = router.pathname;
    const query = router.query;


    if(category) query.category = category;
    if(page) query.page = page;
    if(search) query.search = search;
    if(sort) query.sort = sort;
    if(material) query.material = material;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch