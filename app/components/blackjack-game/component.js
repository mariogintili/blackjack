import Ember from 'ember';

const { service } = Ember.inject;
const { get } = Ember;

export default Ember.Component.extend({
  // Attrs
  store: service('store:main'),
  blackjackDeck: service(),
  userCards: [],
  dealerCards: [],
  deck: null,


  init() {
    this._super(...arguments);

    if (this.get('deck') === null) {
      this.set('deck', this.get('blackjackDeck').buildDeck());
    }

    this.set('userCards', [
      this.takeRandomCard(),
      this.takeRandomCard(),
    ]);

    const randomCardToBeHidden = this.takeRandomCard();
    randomCardToBeHidden.set('isHidden', true);
    this.set('dealerCards', [
      this.takeRandomCard(),
      randomCardToBeHidden,
    ]);
  },

  takeRandomCard() {
    const randIndex = this.randomizeIndex();
    const deck      = this.get('deck');
    const takenCard = deck.objectAt(randIndex);

    deck.removeAt(randIndex);
    return takenCard;
  },


  randomizeIndex() {
    const deck       = this.get('deck');
    const deckLength = get(deck, 'length');
    return Math.floor(Math.random() * deckLength);
  }
});
