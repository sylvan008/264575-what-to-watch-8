import CSS from 'csstype';
import './spinner-styles.css';

/**
 * Компонент-индикатор загрузки данных с сервера
 */
import Portal from '../portal/portal';

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
        >
          <use xlinkHref="#spinner" />
        </svg>
      </div>
    </Portal>
  );
}

export default Spinner;
