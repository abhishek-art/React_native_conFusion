import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {dishes} from './Dishes'
import {comments} from './Comments'
import {leaders} from './Leaders'
import {promotions} from './Promotions'
import {favorites} from './Favorites'
import { persistStore, persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage'

export const configureStore = () => {

    const config = {
        key: 'root',
        storage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            leaders,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}