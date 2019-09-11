import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | unauth/sign in', function(hooks) {
  setupApplicationTest(hooks);

  test('should redirect to auth.collection route if user is logged in', async function(assert) {
    await authenticateSession();
    
    await visit('/unauth/sign-in');

    assert.equal(currentURL(), '/auth/collection');
  });
});
