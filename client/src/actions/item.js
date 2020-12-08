import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_ITEMS,
    GET_ITEM,
    ADD_ITEMS,
    UPDATE_ITEMS,
    WANT_ITEM,
    RATE_ITEMS,
    ITEMS_ERROR,
    GET_SWAPPED_ITEMS, 
    OPEN_ITEM_MODAL,
    UPLOAD_ITEM_IMAGE,
    GET_RECEIVED_ITEM,
    GET_RECEIVED_ITEM_MODAL
} from './types';

// @route   GET item/
// @des     Get all item from user
// @access  Private
export const getAllItemsByUser = () => async dispatch => {
    try {

        const res = await axios.get(`/api/item`);

        dispatch({
            type: GET_ITEMS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   GET item/swapped/items
// @des     Get swapped items
// @access  Private
export const getSwappedItems = () => async dispatch => {
    try {

        const res = await axios.get(`/api/item/swapped/items`);

        dispatch({
            type: GET_SWAPPED_ITEMS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   GET item/:id
// @des     Get item by id
// @access  Private
export const getItemById = itemID => async dispatch => {
    try {

        const res = await axios.get(`/api/item/${itemID}`);

        dispatch({
            type: GET_ITEM,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

export const openItemModal = id => async dispatch => {
    try {

        const res = await axios.get(`/api/item/${id}`);

        dispatch({
            type: OPEN_ITEM_MODAL,
            payload: res.data
        });
        
    } catch (err) {
        
        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// @route   GET item/swipe/items/all
// @des     Get all item except from logged in user
// @access  Private
export const getAllItem = () => async dispatch => {
    try {

        const res = await axios.get(`/api/item/swipe/items/all`);

        dispatch({
            type: GET_ITEMS,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    
    }
}

// @route   POST item/
// @des     Add Item
// @access  Private
export const addItem = (file, formData, edit = false) => async dispatch => {
    const photoData = new FormData();
    photoData.append('file', file);

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.post(`/api/item`, formData, photoData, config);

        dispatch({
            type: ADD_ITEMS,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Item Updated' : 'Item Created'));


    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// @route   Put item/:itemID
// @des     Update Item
// @access  Private
export const updateItem = (formData, itemID) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/item/${itemID}`, formData, config);

        dispatch({
            type: UPDATE_ITEMS,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// @route   PUT api/item/review/:item_id
// @des     Rate and review an item
// @access  Private
export const rateItem = (formData, itemID) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/item/review/${itemID}`, formData, config);

        dispatch({
            type: RATE_ITEMS,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//Upload Item Image
export const uploadImage = (file, item_id) => async dispatch => {

    const photoData = new FormData();
    photoData.append('file', file);

    try {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.put(`/api/item/upload/photo/${item_id}`, photoData, config)

        dispatch({
            type: UPLOAD_ITEM_IMAGE,
            payload: res.data
        });

    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
}

//Want an item
export const wantItem = (itemID, userID) => async dispatch => {
    try {

        const res = await axios.post(`/api/want/${itemID}/${userID}`);

        dispatch({
            type: WANT_ITEM,
            payload: res.data
        });

    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// @route   GET api/transaction/swap/received/
// @des     Get received from swap transaction
// @access  Private
export const getReceivedItems = () => async dispatch => {
    try {

        const res = await axios.get(`/api/transaction/swap/received/`)

        dispatch({
            type: GET_RECEIVED_ITEM,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
}

// @route   GET api/transaction/swap/received/
// @des     Get received from swap transaction
// @access  Private
export const getReceivedItemsModal = (itemID) => async dispatch => {
    try {

        const res = await axios.get(`/api/profile/swap/received/${itemID}`)

        dispatch({
            type: GET_RECEIVED_ITEM_MODAL,
            payload: res.data
        });
        
    } catch (err) {

        dispatch({
            type: ITEMS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
}