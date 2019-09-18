import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sign-in-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it should show inputs as required', async function(assert) {
    await render(hbs`<SignInForm />`);

    await click(".login-button");

    assert.equal(this.element.querySelector(".email > .paper-input-error"), 'This is required.');

    assert.equal(this.element.querySelector(".password > .paper-input-error"), 'This is required.');
  });
});
