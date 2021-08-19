const categorylist = (categories, option = []) => {
    for (let category of categories) {
        option.push(
            {
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type

            }
        )
        if (category.children > 0) {
            categorylist(category.children, option)
        }
    }
    return option;

}

export default categorylist;