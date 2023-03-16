import axios from 'axios';
import { User } from '../types';

import constants from './serviceConstants';

const getUser = (email: string, password: string) : Promise<void | User> => {
  return axios.get(`${constants.BASE_URL}?email=${email}`)
                          .then(response => {
                            const returnedUser = response.data[0];
                            if (returnedUser && returnedUser.password === password) {
                              return returnedUser;
                            }
                          }).catch(error => console.log(error));
};

const createUser = ( newUser: User ) => {
  return axios.post(constants.BASE_URL, newUser).then(response => response.data);
};

const updateUser = ( userID: number, userObject: User ) => {
  return axios
          .put(`${constants.BASE_URL}/${userID}`, userObject)
          .then(response => response.data);
};

const deleteUser = () => {
  /*
    This needs to be completed.
  */
};

export default { getUser, createUser, updateUser, deleteUser };
