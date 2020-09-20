import { ReviewTheme } from './ReviewTheme';

export class Review {
  id: number;

  comment: string;

  created_at: number;

  themes: ReviewTheme[];
}
