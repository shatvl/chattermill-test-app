export type Sentiment = 0 | 1 | -1;

export interface ReviewTheme {
  sentiment: Sentiment;
  theme_id: number;
}
