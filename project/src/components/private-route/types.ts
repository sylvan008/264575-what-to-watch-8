import { RouteProps } from 'react-router-dom';
import { AuthorizationStatus } from '../../utils/const';

export type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}
