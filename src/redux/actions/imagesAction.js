import {FETCH_IMAGES, SAVE_OFFLINE_DATA} from './types';

export const fetchImages = data => dispatch => {
  dispatch({
    type: FETCH_IMAGES,
    payload: data,
  });
};

// export const fetchOfflineData = data => dispatch => {
//   dispatch({
//     type: SAVE_OFFLINE_DATA,
//     payload: data,
//   });
// };
