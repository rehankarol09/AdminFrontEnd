
import axios from '../helpers/axios';
import { categoryConstants } from './constants';

const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.Category_Get_Request });
        const res = await axios.get('/category/fetch');
        if (res.status === 201) {
            const { categorylist } = res.data;
            dispatch({
                type: categoryConstants.Category_Get_Sucess,
                payload: {
                    categories: categorylist
                }
            });
        }
        else {
            dispatch({
                type: categoryConstants.Category_Get_failure,
                payload: { error: res.data.error }
            });
        }
    }
}

export const AddCategory = (form) => {

    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEWCATEGORY_REQUEST });
        try {
            const res = await axios.post('/category/create', form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEWCATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
            }
            else {
                if (res.status === 400) {
                    dispatch({
                        type: categoryConstants.ADD_NEWCATEGORY_FAILURE,
                        paylaod: { error: res.data.error }
                    })
                }
            }
        }
        catch (err) {
            console.log(err.response);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })
        try {
            const res = await axios.post('/category/update', form);
            if (res.status === 201) {
                dispatch(getAllCategory());
                dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS })
                return true;
            }
            else {
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        catch (err) {
            console.log(err.response)
        }
    }
}

export const deletecategories = (ids) => {
    return async dispatch => {

        dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
        try {
            const res = await axios.post('/category/delete', {
                payload: {
                    ids
                }
            });

            if (res.status === 200) {
                dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS })
                dispatch(getAllCategory())
                return true;
            }
            else {
                dispatch({
                    type: categoryConstants.DELETE_CATEGORY_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })

                return false;
            }
        }
        catch (err) {
            console.log(err.response)
        }
    }
}

export
{
    getAllCategory
}