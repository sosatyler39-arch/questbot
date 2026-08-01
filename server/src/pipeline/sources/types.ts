export interface ArticleSection {
  heading: string;
  text: string;
}

export interface ArticlePage {
  title: string;
  url: string;
  sections: ArticleSection[];
}

export interface ItemLocationEntry {
  itemName: string;
  locationNames: string[];
  summary: string;
}

export interface CategorizedItemLocationEntry extends ItemLocationEntry {
  category: string;
}

// Pluggable text-content source. No implementation is wired in yet — see
// sources/articles.ts for why (Fextralife's Terms of Use block scraping it).
export interface TextSource {
  fetchPages(): Promise<ArticlePage[]>;
}
