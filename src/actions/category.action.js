import axios from '../helpers/axios';
import { categoryConstants } from './constants';

export const getAllCategory = () => {
    return async dispatch => {
        const res = await axios.get('/category/fetch');
        console.log(res);

        dispatch({ type: categoryConstants.Category_Get_Request });
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

export const AddCategory = (form) =>
{
      return async dispatch =>
      {
          dispatch({type:categoryConstants.ADD_NEWCATEGORY_REQUEST});
          const res = await axios.post('/category/create',form);
          if(res.status ===201)
          {
              dispatch({
                  type:categoryConstants.ADD_NEWCATEGORY_SUCCESS,
                  payload:{category:res.data.category}
              })
          }
          else{
            dispatch({
                type:categoryConstants.ADD_NEWCATEGORY_FAILURE,
                paylaod:{error:res.data.error}
            })


          }
          
      }
}