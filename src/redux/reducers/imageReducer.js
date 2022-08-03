import {FETCH_IMAGES, SAVE_OFFLINE_DATA} from '../actions/types';

const initialState = {
  items: [],
  // offlineData: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGES:
      return {
        ...state,
        items: action.payload,
      };

    // case SAVE_OFFLINE_DATA:
    //   return {
    //     ...state,
    //     offlineData: action.payload,
    //   };
    default:
      return state;
  }
}

export const imageSelector = state => state.images.items;
// export const imageOfflineDataSelector = state => state.images.offlineData;
