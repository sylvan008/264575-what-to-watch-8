import {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AxiosError} from 'axios';
import {ThunkAppDispatch} from '../../types/action';
import {loginAction} from '../../store/api-action';
import {getIsUserAuthorized} from '../../store/user-process/selectors';
import {AppRoute, Messages, ResponseStatusCodes} from '../../utils/const';
import {classNames} from '../../utils/common';
import {validateEmail, validatePassword} from '../../utils/validation';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import SigninMessage from '../signin-message/signin-message';

const SIGNIN_ERROR_CLASS = 'sign-in__field--error';

function SignIn(): JSX.Element {
  const dispatch: ThunkAppDispatch = useDispatch();
  const isUserAuthorized = useSelector(getIsUserAuthorized);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  if (isUserAuthorized) {
    return (<Redirect to={AppRoute.Main} />);
  }

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isEmailError || isPasswordError) {
      return;
    }
    setIsAuthError(false);
    dispatch(loginAction({email, password}))
      .catch((error: AxiosError) => {
        if (error.response?.status === ResponseStatusCodes.BadRequest) {
          setIsAuthError(true);
        }
      });
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setIsEmailError(false);
    const value = e.target.value.trim();
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

export default SignIn;
