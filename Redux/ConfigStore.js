import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {dishes} from './Dishes'
import {comments} from './Comments'
import {leaders} from './Leaders'
import {promotions} from './Promotions'
import {favorites} from './Favorites'

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            leaders,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    )

    return store
}