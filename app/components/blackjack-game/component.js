import Ember from 'ember';

const { service } = Ember.inject;
const { get, computed } = Ember;
const TWENTY_ONE = 21;


var calculatedBestScore = function(mappedValues) {
  mappedValues.reduce((memo, currentArray) => {
    if (currentArray.length > 1) {
      const one = currentArray[0];
      const ten = currentArray[1];
      return (ten + memo) > TWENTY_ONE ? one + memo : ten + memo;
    } else {
      return memo + currentArray;
    }
  });
};

var calculatedScoreFor = function(key) {
  return computed(key, `${key}.[]`, function() {
    const mappedValues    = this.get(key).mapBy('values');
    return mappedValues.reduce((memo, currentArray) => {
      let parsedMemo = (typeof memo === 'object') ? memo[0] : memo;

      if (currentArray.length > 1) {
        const one = currentArray[0];
        const ten = currentArray[1];
        return (ten + parsedMemo) > TWENTY_ONE ? one + parsedMemo : ten + parsedMemo;
      } else {
        return parsedMemo + currentArray[0];
      }
    });
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

    if (this.get('gameIsFinished')) {
      this.init();
    }
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

  dealerHandScore: calculatedScoreFor('dealerCards'),

  userWon: computed('userHandScore', 'dealerHandScore', function() {
    const dealerHandScore = this.get('dealerHandScore');
    return dealerHandScore > TWENTY_ONE;
  }),

  dealerWon: computed('userHandScore', 'dealerHandScore', function() {
    const userHandScore = this.get('userHandScore');
    return userHandScore > TWENTY_ONE;
  }),

  gameFinishedMessage: computed('dealerWon', 'userWon', 'gameIsFinished', function() {
    return this.get('dealerWon') ? 'The house Won!' : 'You win this round!';
  }),

  gameIsFinished: computed('userHandScore', 'dealerHandScore', function() {
    const { userHandScore, dealerHandScore } = this.getProperties('userHandScore', 'dealerHandScore');
    return (userHandScore >= TWENTY_ONE) || (dealerHandScore >= TWENTY_ONE);
  }),

  // Actions
  actions: {

    handleUserAction(actionToDispatch) {
      const { dealerHasShownHisCard, dealerCards } = this.getProperties('dealerHasShownHisCard', 'dealerCards');

      if (!this.get('dealerHasShownHisCard')) {
        dealerCards.forEach(card => card.set('isHidden', false));
      }

      this.send(actionToDispatch);
    },

    hitMe() {
      this.get('userCards').addObject(this.takeRandomCard());
    },

    stick() {
      this.get('dealerCards').addObject(this.takeRandomCard());
    },

    restart() {
      this.init();
      this.set('deck', this.get('blackjackDeck').buildDeck());
    }
  }
});
