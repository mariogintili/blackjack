import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({

  // Attrs
  name: DS.attr('string'),
  suite: DS.attr('string'),

  // Virtual attrs
  isHidden: null,

  // CPs
  values: computed('isAce', 'name', 'isMemberOfTheRoyalFamily', function() {
    const { isAce, name, isMemberOfTheRoyalFamily } = this.getProperties('isAce', 'name', 'isMemberOfTheRoyalFamily');
    if (isAce) {
      return [1, 11];
    } else if (isMemberOfTheRoyalFamily) {
      return [10];
    } else {
      return [ parseInt(name) ];
    }
  }),

  isAce: computed.equal('name', '1'),

  isMemberOfTheRoyalFamily: computed('name', function() {
    const royalMembers = ['J', 'Q', 'K'];
    return royalMembers.indexOf(this.get('name')) !== -1;
  })
});
