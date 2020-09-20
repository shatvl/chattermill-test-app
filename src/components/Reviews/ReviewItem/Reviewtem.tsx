import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Review } from '../../../models/Review.model';
import {
  ReviewItemComment, ReviewItemWrapper, ReviewItemDate, ReviewThemes,
} from './ReviewItemStyled';
import CollapsedText from '../../CollapsedText/CollapsedText';
import Theme from '../../Theme';

interface ReviewItemPropTypes {
  review: Review;
}

const ReviewItem: FC<ReviewItemPropTypes> = ({ review }) => (
  <ReviewItemWrapper>
    <ReviewItemDate>{dayjs(review.created_at).format('MMM D, YYYY')}</ReviewItemDate>
    <ReviewItemComment>
      <CollapsedText>{review.comment}</CollapsedText>
    </ReviewItemComment>
    <ReviewThemes>
      {review.themes.map((theme, i) => (
        <Theme key={`${i}_${theme.theme_id}_${theme.sentiment}`} id={theme.theme_id} sentiment={theme.sentiment} />
      ))}
    </ReviewThemes>
  </ReviewItemWrapper>
);

export default ReviewItem;
