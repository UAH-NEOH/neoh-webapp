import * as actions from './actionTypes'

export default function reducer (state = [], action) {

   switch (action.type) {
      case actions.REQUEST_ADDED:
         return [
             ...state,
            {
               requestId: action.payload.requestId,
               published: false
            }
         ];

      case actions.REQUEST_REMOVED:
         return state.filter(request => request.requestId !== action.payload.requestId)

      case actions.REQUEST_PUBLISHED:
         return state.map(request =>
         request.requestId !== action.payload.requestId ? request: {...request, published: true}
         );
      case actions.REQUEST_CLEAR:
         return state = []

      default:
         return state
   }
}