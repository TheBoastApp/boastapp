import axios from 'axios';
import { User } from '../types';

const baseUrl = 'http://localhost:3001/users';

const getUser = (email: string, password: string) : Promise<void | User> => {
  return axios.get(`${baseUrl}?email=${email}`)
                          .then(response => {
                            const returnedUser = response.data[0];
                            if (returnedUser && returnedUser.password === password) {
                              return returnedUser;
                            }
                          }).catch(error => console.log(error));
};

const createUser = ( newUser: User ) => {
  return axios.post(baseUrl, newUser).then(response => response.data);
};

const updateUser = ( userID: number, userObject: User ) => {
  return axios
          .put(`${baseUrl}/${userID}`, userObject)
          .then(response => response);
};

const deleteUser = () => {
  /*
    This needs to be completed.
  */
};

export default { getUser, createUser, updateUser, deleteUser };
