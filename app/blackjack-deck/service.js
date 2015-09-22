import Ember from 'ember';

const CARD_NAMES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const CARD_SUITS = ['Hearts','Diamonds','Spades','Clubs'];


export default Ember.Service.extend({
  // Attrs
  store: Ember.inject.service('store:main'),


  // Methods
  shuffleNewDeck() {
    let array = this.buildDeck();
    var currentIndex = array.length, temporaryValue, randomIndex ;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  buildDeck() {
    const cards = [];
    const store = this.get('store');

    for( var suits = 0; suits < CARD_SUITS.length; suits++ ) {
        for( var names = 0; names < CARD_NAMES.length; names++ ) {
            cards.push(store.createRecord('blackjack-card', {
                          name:  CARD_NAMES[names],
                          suite: CARD_SUITS[suits],
                        }));
        }
    }

    return cards;
  }
});
