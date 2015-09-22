import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({

  // Attrs
  name: DS.attr('string'),
  suite: DS.attr('string'),

  // CPs
  values: computed('isAce', 'name', 'isMemberOfTheRoyalFamily', function() {
    const { isAce, name, isMemberOfTheRoyalFamily } = this.getProperties('isAce', 'name', 'isMemberOfTheRoyalFamily');
    if (isAce) {
      return [1, 11];
    } else if (isMemberOfTheRoyalFamily) {
      return [10];
    } else {
      parseInt(name);
    }
  }),

  isAce: computed.equal('name', '1'),

  isMemberOfTheRoyalFamily: computed('name', function() {
    const royalMembers = ['J', 'Q', 'K'];
    return royalMembers.includes(this.get('name'));
  })
});
