import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const reducer = (state = initialState, actions) => {
    switch ( actions.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, actions);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, actions);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, actions);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, actions);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, actions);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, actions);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail();
        default: return state;
    }
};

export default reducer;