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

test('visiting /blackjack', function(assert) {
  visit('/blackjack');

  andThen(() => {
    assert.equal(currentURL(), '/blackjack', 'is a valid URL to visit');
    assert.ok(find('.user-card').length, 2, 'shows 2 cards initially, for a user');
  });
});
