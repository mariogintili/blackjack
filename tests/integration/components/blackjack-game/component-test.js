import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('blackjack-game', 'Integration | Component | blackjack game', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{blackjack-game}}`);

  assert.ok(this.$('.hit-me-btn').length, 'Shows a hit-me btn');
  assert.ok(this.$('.stick-btn').length, 'Shows a stick btn');
});

test('It generates 2 cards for the user on start', function(assert) {
  this.render(hbs`{{blackjack-game}}`);
  assert.equal(this.$('.user-card').length, 2, 'generates 2 cards for the user on start');
});