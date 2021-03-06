import request from 'api';

import { UPDATE_RUBRIC } from '../../constants';

export default function (id, rubric) {
  return dispatch => (
    request(`/rubrics/${id}`, rubric, 'PUT')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: UPDATE_RUBRIC,
          payload,
        });
      })
  );
}
