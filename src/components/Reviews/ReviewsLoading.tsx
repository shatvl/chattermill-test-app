import React from 'react';
import ReviewItemLoading from './ReviewItem/ReviewItemLoading';
import { ReviewList, ReviewListItem } from './ReviewsStyled';

const ReviewsLoading = () => (
  <ReviewList>
    <ReviewListItem>
      <ReviewItemLoading />
    </ReviewListItem>
    <ReviewListItem>
      <ReviewItemLoading />
    </ReviewListItem>
    <ReviewListItem>
      <ReviewItemLoading />
    </ReviewListItem>
    <ReviewListItem>
      <ReviewItemLoading />
    </ReviewListItem>
    <ReviewListItem>
      <ReviewItemLoading />
    </ReviewListItem>
  </ReviewList>
);

export default ReviewsLoading;
