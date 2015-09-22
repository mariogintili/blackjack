import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'blackjack/tests/helpers/start-app';

module('Acceptance | play blackjack', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /play-blackjack', function(assert) {
  visit('/play-blackjack');

  andThen(() => {
    assert.equal(currentURL(), '/play-blackjack', 'is a valid URL to visit');
    assert.ok(find('.player-card').length, 2, 'shows 2 cards initially');
  });
});
