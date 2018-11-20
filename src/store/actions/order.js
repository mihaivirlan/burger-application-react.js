import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PUCHASE_BURGER_SUCCESS,
        oderId: id,
        orderData: orderData
    }
};

export const puchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PUCHASE_BURGER_FAIL,
        error: error
    }
};

export const puchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            }).catch(error => {
                dispatch(puchaseBurgerFail(error))
        });
    };
};