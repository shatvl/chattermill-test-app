import React, { FC, useEffect, useRef, useState } from 'react';
import { Review } from '../../models/Review.model';
import { useFeedListLazyQuery } from '../../services/review/useFeedListLazyQuery';
import InfiniteScroll from '../InfiniteScroll';
import ReviewItem from './ReviewItem';
import ThemesFilter from '../ThemesFilter';
import ReviewsLoading from './ReviewsLoading';
import { NotFoundContent, ReviewList, ReviewListItem } from './ReviewsStyled';
import { useFilterContext } from '../../context/FilterContext';
import { PrimaryButton } from '../Button';
import { ButtonSizes } from '../Button/Button';

const PAGE_SIZE = 20;

const Reviews: FC = () => {
  const [paginatedReviews, setPaginatedReviews] = useState<Review[]>([]);
  const page = useRef<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [load, { data, loading, error }] = useFeedListLazyQuery();
  const { themeId, clearFilters } = useFilterContext();

  useEffect(() => {
    if (data && data.length) {
      setPaginatedReviews([...paginatedReviews, ...data]);
    }

    if (data && data.length % PAGE_SIZE === 0) {
      setHasMore(true);
      return;
    }

    if (data && (data.length < PAGE_SIZE || !data.length)) {
      setHasMore(false);
      return;
    }
  }, [data]);

  useEffect(() => {
    // reset old data
    setPaginatedReviews([]);
    page.current = 0;
    load({ limit: PAGE_SIZE, offset: page.current * PAGE_SIZE, themeId });
  }, [themeId]);

  const handleLoadInfinite = () => {
    page.current++;
    load({ limit: PAGE_SIZE, offset: page.current * PAGE_SIZE, themeId });
  };

  if (loading && !page.current) {
    return (
      <>
        <ThemesFilter />
        <ReviewsLoading />
      </>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!paginatedReviews.length) {
    return (
      <>
        <ThemesFilter />
        <NotFoundContent>
          No reviews found, try to{' '}
          <PrimaryButton onClick={clearFilters} size={ButtonSizes.XS}>
            clear filters
          </PrimaryButton>
        </NotFoundContent>
      </>
    );
  }

  return (
    !!paginatedReviews?.length && (
      <>
        <ThemesFilter />
        <InfiniteScroll loading={loading} hasMore={hasMore} load={handleLoadInfinite}>
          <ReviewList>
            {paginatedReviews.map(review => (
              <ReviewListItem key={review.id}>
                <ReviewItem review={review} />
              </ReviewListItem>
            ))}
          </ReviewList>
        </InfiniteScroll>
      </>
    )
  );
};

export default Reviews;
