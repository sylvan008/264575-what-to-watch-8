import {PropsType} from './props';

function RatingInput({ratingValue, changeRating, checked}: PropsType): JSX.Element {
  return (
    <>
      <input
        className="rating__input"
        id={`star-${ratingValue}`}
        type="radio"
        name="rating"
        value={ratingValue}
        onChange={changeRating}
        checked={checked}
      />
      <label className="rating__label" htmlFor={`star-${ratingValue}`}>Rating ${ratingValue}</label>
    </>
  );
}

export default RatingInput;
