import CSS from 'csstype';
import Portal from '../portal/portal';
import {TestId} from '../../utils/mocks/testing-const';
import './spinner-styles.css';

/**
 * Компонент-индикатор загрузки данных с сервера
 */

export function Spinner({styles = {}}: {styles?: CSS.Properties}): JSX.Element {
  return (
    <Portal>
      <div className="spinner">
        <p className="visually-hidden">Loading...</p>
        <svg
          className="spinner__image"
          style={{...styles}}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          data-testid={TestId.SpinnerIcon}
        >
          <use xlinkHref="#spinner" />
        </svg>
      </div>
    </Portal>
  );
}

export default Spinner;
