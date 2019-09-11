import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { invalidateSession } from 'ember-simple-auth/test-support';

module('Acceptance | auth/collection', function(hooks) {
  setupApplicationTest(hooks);

  test('should redirect to unauth.sign-in if user is not logged in', async function(assert) {
    await visit('/auth/collection');

    await invalidateSession(this.application);

    assert.equal(currentURL(), '/unauth/sign-in');
  });
});
