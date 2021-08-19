import { categoryConstants } from '../actions/constants'

const initState = {
    loading: false,
    categories: [],
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }

    for (let cat of categories) {

        if (cat._id === parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }
    return myCategories;
}

const categoryreducers = (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.Category_Get_Request:
            state = {
                ...initState,
                loading: true
            }
            break;

        case categoryConstants.Category_Get_Sucess:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
            break;

        case categoryConstants.ADD_NEWCATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case categoryConstants.ADD_NEWCATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;

        case categoryConstants.ADD_NEWCATEGORY_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        default:
    }
    return state;
}

export default categoryreducers;