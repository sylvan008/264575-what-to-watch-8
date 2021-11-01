import {PropsType} from './types';

function SigninMessage({text}: PropsType): JSX.Element {
  return (
    <div className="sign-in__message">
      <p>{text}</p>
    </div>
  );
}

export default SigninMessage;
