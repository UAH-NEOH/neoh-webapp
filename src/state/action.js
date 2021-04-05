import * as actions from './actionTypes'

export const requestAdded = id => ({
    type:actions.REQUEST_ADDED,
    payload: {
        requestId: id
    }
})

export const requestRemoved = id => ({
    type:actions.REQUEST_REMOVED,
    payload: {
        requestId: id
    }
})

export const requestPublished = id => ({
    type:actions.REQUEST_PUBLISHED,
    payload: {
        requestId: id
    }
})

export const requestClear = () => ({
    type:actions.REQUEST_CLEAR,

})