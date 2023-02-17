import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';
const POSITIONS = 'positions';

const getAllPositions = ( email: string ) => {
  /*
    This needs to be completed.
  */
  return axios
          .get(`${baseUrl}?email=${email}`)
          .then(response => response.data[0])
          .then(data => data[POSITIONS]);
};

const getPosition = () => {
  /*
    This needs to be completed.
  */
};

const createPosition = () => {
  /*
    This needs to be completed.
  */
};

const updatePosition = () => {
  /*
    This needs to be completed.
  */

};

const deletePosition = () => {
  /*
    This needs to be completed.
  */
};

export default { getAllPositions, getPosition, createPosition, updatePosition, deletePosition };
