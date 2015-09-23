import Ember from 'ember';

const { service } = Ember.inject;
const { get, computed } = Ember;

var calculatedScoreFor = function(key) {
  return computed(key, function() {
    const mappedValues    = this.get(key).mapBy('values');
    const aces            = mappedValues.filter((array) => array.length > 1);
    if (aces.length) {
      return 'there was an ACE!';
    } else {
      return mappedValues.map(array => array[0]).reduce((memo, current) => {
        return memo + current;
      });
    }
  });
};

export default Ember.Component.extend({
  // Attrs
  classNames: ['blackjack-game'],
  store: service('store:main'),
  blackjackDeck: service(),
  userCards: [],
  dealerCards: [],
  deck: null,
  dealerHasShownHisCard: computed('dealerCards.@each.isHidden', function() {
    return !this.get('dealerCards').filterBy('isHidden').length;
  }),

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


  // CPs
  userHandScore: calculatedScoreFor('userCards'),

  dealerScore: calculatedScoreFor('dealerCards'),

  // Actions
  actions: {


    handleUserAction(actionToDispatch) {
      const { dealerHasShownHisCard, dealerCards } = this.getProperties('dealerHasShownHisCard', 'dealerCards');

      if (!this.get('dealerHasShownHisCard')) {
        dealerCards.forEach(card => card.set('isHidden', false));
      }

      this.send(actionToDispatch);
    }
  }
});
