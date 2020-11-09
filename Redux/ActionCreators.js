import * as ActionTypes from './ActionTypes';
import {baseURL} from '../Shared/baseURL'

export const fetchComments= () => (dispatch) =>  {
    return fetch(baseURL + 'comments')
            .then(response => {
                if(response.ok){
                    return response
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error=> {
                var errMess = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error=> dispatch(commentsFailed(error)))
}

export const commentsFailed = (err) => {
    return {
        type: ActionTypes.COMMENTS_FAILED,
        payload: err.message
    }
}

export const addComments = (comments) => {
    return {
        type: ActionTypes.ADD_COMMENTS,
        payload: comments
    }
}

export const fetchDishes= () => (dispatch) =>  {

    dispatch(dishesLoading())
    return fetch(baseURL+'dishes')
            .then(response => {
                if(response.ok){
                    return response
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error=> {
                var errMess = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error=> dispatch(dishesFailed(error)))
}

export const dishesFailed = (err) => {
    return {
        type: ActionTypes.DISHES_FAILED,
        payload: err.message
    }
}

export const addDishes = (dishes) => {
    return {
        type: ActionTypes.ADD_DISHES,
        payload: dishes
    }
}

export const dishesLoading = () => {
    return {type: ActionTypes.DISHES_LOADING }
}

export const fetchLeaders= () => (dispatch) =>  {

    dispatch(leadersLoading())
    return fetch(baseURL + 'leaders')
            .then(response => {
                if(response.ok){
                    return response
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error=> {
                var errMess = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(leaders => dispatch(addLeaders(leaders)))
            .catch(error=> dispatch(leadersFailed(error)))
}

export const leadersFailed = (err) => {
    return {
        type: ActionTypes.LEADERS_FAILED,
        payload: err.message
    }
}

export const addLeaders = (leaders) => {
    return {
        type: ActionTypes.ADD_LEADERS,
        payload: leaders
    }
}

export const leadersLoading = () => {
    return {type: ActionTypes.LEADERS_LOADING }
}

export const fetchPromos= () => (dispatch) =>  {

    dispatch(promosLoading())
    return fetch(baseURL + 'promotions')
            .then(response => {
                if(response.ok){
                    return response
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error=> {
                var errMess = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)))
            .catch(error=> dispatch(promosFailed(error)))
}

export const promosFailed = (err) => {
    return {
        type: ActionTypes.PROMOS_FAILED,
        payload: err.message
    }
}

export const addPromos = (promos) => {
    return {
        type: ActionTypes.ADD_PROMOS,
        payload: promos
    }
}

export const promosLoading = () => {
    return {type: ActionTypes.PROMOS_LOADING }
}

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(()=>{
        dispatch(addFavorite(dishId))
    },2000)
}

export const addFavorite = (dishId) =>{
    return {type:ActionTypes.ADD_FAVORITE,
            payload: dishId} 
}
