import Ember from 'ember';

const { service } = Ember.inject;
const { get, computed } = Ember;

export default Ember.Component.extend({
  // Attrs
  store: service('store:main'),
  blackjackDeck: service(),
  userCards: [],
  dealerCards: [],
  deck: null,

  // Hooks
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


  // Methods
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
  },


  // CP
  userCardsValue: computed('userCards', function() {
    // select each cards value
    // if any of those values constitutes more than one element, like an ACE
    // determine all permutations of values,
    // then select the one's closest to 21, but is less than 21
    // const cardMultipleValues = cardValues.
  }),

  // Actions
  actions: {

  }
});
