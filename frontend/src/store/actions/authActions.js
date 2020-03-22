import API from '../../network/api';
import setAuthToken from '../../network/setAuthToken';
import cogoToast from 'cogo-toast';
import { SET_CURRENT_USER } from './types';

//sign in student
export const signinStudent = (user, history) => async dispatch => {
  let response;
  try {
    response = await API.post('auth/students/login', user);

    const { student, token } = response.data.data;

    //set the current user to redux store
    dispatch(setCurrentStudent(student));

    //save the token to localstorage
    localStorage.setItem('lm-student-token', token);

    //set authorization header for axios
    setAuthToken(token);

    //redirect the user to the authenticated page
    history.push('/student/home');
  } catch (err) {
    return err.response.data.message;
  }
};

//lecturer sign in
export const signinLecturer = (user, history) => async dispatch => {
  let response;
  try {
    response = await API.post('auth/lecturers/login', user);

    const { lecturer, token } = response.data.data;

    //set the current user to redux store
    dispatch(setCurrentLecturer(lecturer));

    //save the token to localstorage
    localStorage.setItem('lm-lecturer-token', token);

    //set authorization header for axios
    setAuthToken(token);

    //redirect the user to the authenticated page
    history.push('/lecturer/home');
  } catch (err) {
    return err.response.data.message;
  }
};

//sign up student
export const signupStudent = (user, history) => async dispatch => {
  let response;
  try {
    response = await API.post('auth/students/register', user);

    const { student, token } = response.data.data;

    //set the current user to redux store
    dispatch(setCurrentStudent(student));

    //save the token to localstorage
    localStorage.setItem('lm-student-token', token);

    //set authorization header for axios
    setAuthToken(token);

    //redirect the user to the authenticated page
    history.push('/lecturer/home');
  } catch (err) {
    return err.response.data.message;
  }
};

//sign up lecturer
export const signupLecturer = (user, history) => async dispatch => {
  let response;
  try {
    response = await API.post('auth/lecturers/register', user);

    const { lecturer, token } = response.data.data;

    //set the current user to redux store
    dispatch(setCurrentLecturer(lecturer));

    //save the token to localstorage
    localStorage.setItem('lm-lecturer-token', token);

    //set authorization header for axios
    setAuthToken(token);

    //redirect the user to the authenticated page
    history.push('/lecturer/home');
  } catch (err) {
    return err.response.data.message;
  }
};

//log out user
export const logoutUser = () => dispatch => {
  //remove tokens from localstorage
  localStorage.removeItem('lm-student-token');
  localStorage.removeItem('lm-lecturer-token');

  //remove axios authorization header
  setAuthToken(false);

  //remove current user from redux store
  dispatch({
    type: SET_CURRENT_USER,
    isLecturer: false,
    isStudent: false,
    payload: null
  });
};

export const forgotPassword = async (email, history) => {
  let response;
  try {
    response = await API.post('auth/forgotpassword', { email });

    const message = response.data.message;
    cogoToast.error(message, {
      position: 'top-center'
    });
    history.push('/');
  } catch (err) {
    console.error(err.response.message);
    return err.response.data.mesage;
  }
};

export const setCurrentStudent = decoded => {
  return {
    type: SET_CURRENT_USER,
    isLecturer: false,
    isStudent: true,
    payload: decoded
  };
};

export const setCurrentLecturer = decoded => {
  return {
    type: SET_CURRENT_USER,
    isLecturer: true,
    isStudent: false,
    payload: decoded
  };
};

//set student profile image
export const setStudentProfileImg = image => async dispatch => {
  let response;
  try {
    const formData = new FormData();
    formData.append('avatar', image);
    response = await API.post('auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const { student } = response.data.data;
    dispatch(setCurrentStudent(student));
    cogoToast.success('Profile picture uploaded successfully');
    return true;
  } catch (error) {
    cogoToast.error(error.response.data.message);
    return false;
  }
};

//set lecturer profile image
export const setLecturerProfileImg = image => async dispatch => {
  let response;
  try {
    const formData = new FormData();
    formData.append('avatar', image);
    response = await API.post('auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const { lecturer } = response.data.data;
    dispatch(setCurrentLecturer(lecturer));
    cogoToast.success('Profile picture uploaded successfully');
    return true;
  } catch (error) {
    cogoToast.error(error.response.data.message);
    return false;
  }
};
