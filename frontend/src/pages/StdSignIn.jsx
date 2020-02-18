import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  indexNo: Yup.number('Must be a number').required('Index No is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more')
    .max(32, 'Password cannot be more than 32 characters')
    .required('Password is required')
});

//THIS IS THE STUDENT SIGN IN PAGE
class StdSignIn extends React.Component {
  componentDidMount() {
    //check if user isn't already authenticated
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="uk-grid-collapse" data-uk-grid>
          <div
            className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center"
            data-uk-height-viewport
          >
            <div className="uk-width-3-4@s">
              <div className="uk-text-center uk-margin-bottom">
                <Link className="uk-logo uk-text-success uk-text-bold" to="/">
                  Lecture Monitor
                </Link>
              </div>
              <div className="uk-text-center uk-margin-medium-bottom">
                <h1 className="uk-letter-spacing-small">Sign In</h1>
              </div>
              <Formik
                initialValues={{ indexNo: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {}}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
                        Index No
                      </label>
                      <input
                        id="indexNo"
                        name="indexNo"
                        className={`uk-input uk-form-large ${
                          touched.indexNo && errors.indexNo
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.indexNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="9346517"
                        disabled={isSubmitting}
                      />
                      {touched.indexNo && errors.indexNo ? (
                        <p className="uk-text-danger">{errors.indexNo}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        className={`uk-input uk-form-large ${
                          touched.password && errors.password
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="**********"
                        disabled={isSubmitting}
                      />
                      {touched.password && errors.password ? (
                        <p className="uk-text-danger">{errors.password}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin uk-text-center">
                      <Link
                        className="uk-text-small uk-link-muted"
                        to="/forgotpassword"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="uk-width-1-1 uk-text-center">
                      <button
                        className="uk-button uk-button__animate uk-button-primary uk-button-large"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div
            className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light
    uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-primary"
            data-uk-height-viewport
          >
            <div>
              <div className="uk-text-center">
                <h2 className="uk-h1 uk-letter-spacing-small">
                  Hello There, Join Us and Lets monitor your lectures for you.
                </h2>
              </div>
              <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
                <p>Enter your personal details and join us</p>
              </div>
              <div className="uk-width-1-1 uk-text-center">
                <Link
                  to="/student/signup"
                  className="uk-button uk-button-success-outline uk-button-large"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const matchStateToProps = ({ auth }) => ({
  auth
});

export default connect(matchStateToProps)(withRouter(StdSignIn));
