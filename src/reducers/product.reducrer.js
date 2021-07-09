import {productConstants} from '../actions/constants';

const initState ={
products:[]

}
export default (state=initState,action) =>
{
    switch(action.type)
    {
        case productConstants.GET_PRODUCTS_SUCCESS:
            state={
                products:action.payload.products
            }
    }
    return state;
}