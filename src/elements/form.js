const html = require('choo/html');

module.exports = (state, emit) => {
  function handleChange(e) {
    emit('changeFilter', {
      value: Number(e.target.name),
      checked: e.target.checked
    });
  }
  return html`<div id="search">
    <div class="filters">
      <ul>
        ${state.search.filters.map(
          filter => html`<li>
          <label>
            <input type="checkbox" name="${filter.value}" checked="${filter.checked}" onchange=${handleChange} />${filter.label}
          </label>
        </li>`
        )}
      </ul>
    </div>
    <div class="counter">Hit: ${state.search.markersLength}件</div>
    <div class="words">
      <form action="http://www.its-kenpo.or.jp/search/index.html" target="_blank">
        <input type="search" name="q" placeholder="寿司、温泉など" />
      </form>
    </div>
  </div>`;
};
