'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchText) {
    const text = searchText.toLowerCase().replace(/\s+/g, ` `).trim();

    return this._offers.
      filter((offer) => offer.title.toLowerCase().includes(text));
  }

}

module.exports = SearchService;
