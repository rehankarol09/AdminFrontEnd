import {productConstants} from '../actions/constants';

const initState ={
products:[]
}



const productreducer = (state=initState,action) =>
{
    switch(action.type)
    {
        case productConstants.GET_PRODUCTS_SUCCESS:
            state={
                products:action.payload.products
            }
        break;
        default:
    }
    return state;
}

export default productreducer;