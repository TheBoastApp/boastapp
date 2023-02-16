import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const getUser = (email: string, password: string) => {
  return axios
          .get(`${baseUrl}?email=${email}`)
          .then(response => {
            const returnedUser = response.data[0];
            if (returnedUser.password === password) {
              return returnedUser;
            } else {
              return {};
            }
          })
          .catch(error => console.log(error));
};

const createUser = ( newUser: object ) => {
  return axios.post(baseUrl, newUser).then(response => response.data);
};

const updateUser = () => {
  /*
    This needs to be completed.
  */

};

const deleteUser = () => {
  /*
    This needs to be completed.
  */
};

export default { getUser, createUser, updateUser, deleteUser };
