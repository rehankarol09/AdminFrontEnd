import axiosInstance from "../helpers/axios";
import { PageConstants } from "./constants"

export const AddPage = (form) =>
{
    return async dispatch =>{
        dispatch({type:PageConstants.CREATE_PAGE_REQUEST});
        try{
             const res = await axiosInstance.post('/page/create',form);
             if(res.status === 200)
             {
                dispatch({type:PageConstants.CREATE_PAGE_SUCCESS,
                payload:{
                    page:res.data.page
                }});
             }
             else{
                dispatch({type:PageConstants.CREATE_PAGE_FAILURE,
                    payload:{
                        page:res.data.error
                    }});
             }
        }
        catch({err})
        {
            console.log(err);
        }
    }

}