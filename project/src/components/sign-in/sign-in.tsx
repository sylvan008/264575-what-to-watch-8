import {ChangeEvent, Dispatch, FormEvent, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {AxiosError} from 'axios';
import {Actions, ThunkAppDispatch} from '../../types/action';
import {AuthData} from '../../types/auth';
import {loginAction} from '../../store/api-action';
import {Messages, ResponseStatusCodes} from '../../utils/const';
import {classNames, validateEmail, validatePassword} from '../../utils/common';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import SigninMessage from '../signin-message/signin-message';

const SIGNIN_ERROR_CLASS = 'sign-in__field--error';

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onFormSubmit(authData: AuthData) {
      return (dispatch as ThunkAppDispatch)(
        loginAction(authData),
      );
    },
  };
}

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SignIn(props: PropsFromRedux): JSX.Element {
  const {onFormSubmit} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isEmailError || isPasswordError) {
      return;
    }
    setIsAuthError(false);
    onFormSubmit({email, password})
      .catch((error: AxiosError) => {
        if (error.response?.status === ResponseStatusCodes.BadRequest) {
          setIsAuthError(true);
        }
      });
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setIsEmailError(false);
    const value = e.target.value;
    setEmail(value);
    const isEmailInvalid = !validateEmail(value);
    if (isEmailInvalid) {
      setIsEmailError(isEmailInvalid);
    }
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setIsPasswordError(false);
    const value = e.target.value;
    setPassword(value);
    const isPasswordInvalid = !validatePassword(value);
    if (isPasswordInvalid) {
      setIsPasswordError(isPasswordInvalid);
    }
  }

  const emailClassNames = classNames('sign-in__field', isEmailError ? SIGNIN_ERROR_CLASS : '');
  const passwordClassNames = classNames('sign-in__field', isPasswordError ? SIGNIN_ERROR_CLASS : '');

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={formSubmitHandler}
        >
          {isEmailError && <SigninMessage text={Messages.EmailInvalid} />}
          {isPasswordError && <SigninMessage text={Messages.PasswordInvalid} />}
          {isAuthError && <SigninMessage text={Messages.AuthError} />}
          <div className="sign-in__fields">
            <div className={emailClassNames}>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                onChange={onEmailChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={passwordClassNames}>
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={onPasswordChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export {SignIn};
export default connector(SignIn);
