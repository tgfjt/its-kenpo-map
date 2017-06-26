const html = require('choo/html');

const form = require('../elements/form');

module.exports = function mainView(state, emitter) {
  return html`
    <div class="app">
      ${form(state, emitter)}
    </div>
  `;
};
