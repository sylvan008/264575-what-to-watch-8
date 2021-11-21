import CSS from 'csstype';

/**
 * Компонент-индикатор загрузки данных с сервера
 */
import Portal from '../portal/portal';

export function Spinner({styles = {}}: {styles?: CSS.Properties}): JSX.Element {
  return (
    <Portal>
      <div style={{
        display: 'absolute',
        zIndex: 100,
        ...styles,
      }}
      >
        <p className="visually-hidden">Loading...</p>
        <svg
          style={{
            margin: 'auto',
            background: 'transparent',
            display: 'block',
            shapeRendering: 'auto',
            width: '200px',
            height: '200px',
            ...styles,
          }}
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
