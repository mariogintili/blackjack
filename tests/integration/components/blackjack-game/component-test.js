import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('blackjack-game', 'Integration | Component | blackjack game', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{blackjack-game}}`);

  assert.ok(this.$('.hit-me-btn').length, 'Shows a hit-me btn');
  assert.ok(this.$('.stick-btn').length, 'Shows a stick btn');
});

test('It generates 2 cards for the user on start', function(assert) {
  assert.expect(1);

  this.render(hbs`{{blackjack-game}}`);
  assert.equal(this.$('.user-card').length, 2, 'generates 2 cards for the user on start');
});

test('It generates 2 cards for the dealer', function(assert) {
  assert.expect(2);

  this.render(hbs`{{blackjack-game deck}}`);

  assert.equal(this.$('.dealer-card').length, 1, 'Shows 1 card that is visible');
  assert.equal(this.$('.dealer-cards > .hidden-placeholder').length, 1, 'Shows 1 card thats hidden');
});