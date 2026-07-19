import type { TextSource } from './types.js';

// No implementation. Checked 2026-07-17: Fextralife's Terms of Use (the site
// runs on Valnet Inc.'s platform — fextralife.com/terms-of-use redirects to
// valnetinc.com/en/terms-of-use) explicitly prohibit this:
//
//   §15 Illegal Use: "crawl or spider any page of the Sites" / "scrape,
//   automatically download, data-mine, extract, collect, or harvest any
//   content... from the Sites" / "use or copy any content from the Sites for
//   the development of any software program... training a machine learning
//   or artificial intelligence (AI) system"
//   §5 Use of Content: "solely for your personal and non-commercial use,
//   and not for the use or benefit of any third party"
//
// That rules out the brief's stated primary text source as-is. Before this
// can be implemented for real: either a licensing/partnership agreement with
// Valnet, or a different wiki source whose terms actually permit indexing.
export const articleSource: TextSource = {
  async fetchPages() {
    throw new Error('No text source configured — see the comment in this file.');
  },
};
