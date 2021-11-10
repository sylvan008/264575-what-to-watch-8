import {useState} from 'react';
import {AxiosError} from 'axios';
import {toast} from 'react-toastify';
import {browserHistory} from '../services/browser-history';
import {validateTextLength} from '../utils/validation';
import {AppRoute, ResponseStatusCodes, RouteParams} from '../utils/const';
import {CommentPost} from '../types/review';

const RATING_DEFAULT = '8';
const REVIEW_SEND_ERROR = 'The comment must not be empty.';

type Rating = string;
type Review = string;

type ResultUserReview = [
  isFormSubmit: boolean,
  isReviewValid: boolean,
  review: Review,
  rating: Rating,
  handleRatingChange: (rating: Rating) => void,
  handleReviewChange: (text: Review) => void,
  handleFormSubmit: (filmId: number) => void,
]

type SubmitData = {
  filmId: number,
  commentPost: CommentPost,
}

function useUserReview(onSubmit: (submitData: SubmitData) => Promise<void>): ResultUserReview {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(RATING_DEFAULT);
  const [isReviewValid, setIsReviewValid] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  function handleReviewChange(text: Review) {
    setReview(text);
    setIsReviewValid(validateTextLength(text.trim()));
  }

  function handleRatingChange(ratingUpdate: Rating) {
    setRating(ratingUpdate);
  }

  function handleFormSubmit(filmId: number) {
    setIsFormSubmit(true);
    onSubmit({
      filmId,
      commentPost: {
        rating: Number(rating),
        comment: review.trim(),
      },
    })
      .then(() => {
        browserHistory.push(AppRoute.Film.replace(RouteParams.ID, filmId.toString()));
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === ResponseStatusCodes.BadRequest) {
          toast.info(REVIEW_SEND_ERROR, {
            position: 'top-center',
          });
          setIsFormSubmit(false);
        }
      });
  }

  return [
    isFormSubmit,
    isReviewValid,
    review,
    rating,
    handleRatingChange,
    handleReviewChange,
    handleFormSubmit,
  ];
}

export {useUserReview};
