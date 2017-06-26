const html = require('choo/html');

module.exports = (state, emit) => {
  function handleChange(e) {
    emit('changeFilter', {
      value: Number(e.target.name),
      checked: e.target.checked
    });
  }
  return html`<form>
    <ul>
      ${state.search.filters.map(
        filter => html`<li>
        <label>
          <input type="checkbox" name="${filter.value}" checked="${filter.checked}" onchange=${handleChange} />${filter.label}
        </label>
      </li>`
      )}
    </ul>
  </form>`;
};
