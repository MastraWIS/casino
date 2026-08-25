(function () {
  const DATA = [
    { id: 1, game: "Mega Moolah Mega", provider: "Microgaming", currency: "£", amount: 13624970, avgWin: "£6,151,937", avgFreq: "9 weeks", lastHit: "1y 11w ago", status: "overdue", recommended: true },
    { id: 2, game: "Joker Millions", provider: "Yggdrasil", currency: "€", amount: 4776717, avgWin: "€2,985,974", avgFreq: "33 weeks", lastHit: "3y 31w ago", status: "overdue", recommended: true },
    { id: 3, game: "Shopping Spree", provider: "RTG", currency: "$", amount: 4053292, avgWin: "$2,594,106", avgFreq: "4 years", lastHit: "4y 7w ago", status: "hot", recommended: true },
    { id: 4, game: "Hall of Gods Mega", provider: "NetEnt", currency: "€", amount: 3065549, avgWin: "€5,619,688", avgFreq: "38 weeks", lastHit: "3y 18w ago", status: "overdue", recommended: false },
    { id: 5, game: "Jackpot King", provider: "Blueprint", currency: "€", amount: 2661106, avgWin: "—", avgFreq: "—", lastHit: "—", status: "recent", recommended: false },
    { id: 6, game: "King Cashalot", provider: "Microgaming", currency: "£", amount: 2224299, avgWin: "£1,982,410", avgFreq: "12 weeks", lastHit: "5w ago", status: "none", recommended: true },
    { id: 7, game: "Aztec's Millions", provider: "RTG", currency: "$", amount: 1821509, avgWin: "$1,340,220", avgFreq: "20 weeks", lastHit: "22w ago", status: "none", recommended: true },
    { id: 8, game: "Jackpot Piñatas", provider: "RTG", currency: "$", amount: 1638320, avgWin: "$980,600", avgFreq: "16 weeks", lastHit: "9w ago", status: "none", recommended: false },
  ];

  const BADGE_LABEL = { overdue: "Overdue", hot: "Hot", recent: "Recently hit" };
  const root = document.querySelector(".tpp-jackpot-tracker");
  const heroGrid = root.querySelector("#jt-hero-grid");
  const tbody = root.querySelector("#jt-table-body");
  const searchInput = root.querySelector("#jt-search");
  const updatedEl = root.querySelector("#jt-updated");
  const sortState = { key: "amount", dir: "desc" };

  function formatAmount(currency, value) {
    return currency + " " + Math.round(value).toLocaleString("en-US");
  }

  function heroCardHTML(item) {
    const badge = BADGE_LABEL[item.status]
      ? `<span class="jt-badge jt-badge--${item.status}">${BADGE_LABEL[item.status]}</span>`
      : "<span></span>";
    const signal = item.recommended
      ? '<span class="jt-card__signal jt-card__signal--go">Recommended</span>'
      : '<span class="jt-card__signal jt-card__signal--wait">Wait &amp; watch</span>';
    return `
      <article class="jt-card" data-id="${item.id}">
        <div class="jt-card__top">
          ${badge}
        </div>
        <p class="jt-card__provider">${item.provider}</p>
        <h3 class="jt-card__game">${item.game}</h3>
        <p class="jt-card__amount" data-amount>${formatAmount(item.currency, item.amount)}</p>
        <div class="jt-card__stats">
          <div><span class="jt-stat__label">Avg. win</span><span class="jt-stat__value">${item.avgWin}</span></div>
          <div><span class="jt-stat__label">Avg. freq.</span><span class="jt-stat__value">${item.avgFreq}</span></div>
          <div><span class="jt-stat__label">Last hit</span><span class="jt-stat__value">${item.lastHit}</span></div>
        </div>
        ${signal}
        <button type="button" class="tpp-btn-cta">
          <span class="tpp-btn-cta__label">Play now</span>
          <span class="tpp-btn-cta__icon-group">
            <span class="tpp-btn-cta__divider" aria-hidden="true"></span>
            <svg class="tpp-btn-cta__chevron" viewBox="0 0 320 512" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
          </span>
        </button>
      </article>`;
  }

  function tableRowHTML(item) {
    return `
      <tr data-id="${item.id}">
        <td class="jt-table__game">${item.game}<div class="jt-table__provider">${item.provider}</div></td>
        <td class="jt-table__amount" data-amount>${formatAmount(item.currency, item.amount)}</td>
        <td class="jt-table__provider">${item.provider}</td>
        <td>
          <button type="button" class="tpp-btn-cta">
            <span class="tpp-btn-cta__label">Claim</span>
          </button>
        </td>
      </tr>`;
  }

  function renderHero() {
    const top3 = [...DATA].sort((a, b) => b.amount - a.amount).slice(0, 3);
    heroGrid.innerHTML = top3.map(heroCardHTML).join("");
  }

  function renderTable() {
    const term = searchInput.value.trim().toLowerCase();
    const rows = DATA.filter(
      (item) => item.game.toLowerCase().includes(term) || item.provider.toLowerCase().includes(term)
    ).sort((a, b) => {
      const dir = sortState.dir === "asc" ? 1 : -1;
      if (sortState.key === "amount") return (a.amount - b.amount) * dir;
      return a.game.localeCompare(b.game) * dir;
    });
    tbody.innerHTML = rows.length
      ? rows.map(tableRowHTML).join("")
      : '<tr><td colspan="4" style="text-align:center; color:var(--jt-text-muted); padding:20px;">No jackpots match your search.</td></tr>';
  }

  root.querySelectorAll("th[data-sortable]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.sortable;
      sortState.dir = sortState.key === key && sortState.dir === "desc" ? "asc" : "desc";
      sortState.key = key;
      renderTable();
    });
  });

  searchInput.addEventListener("input", renderTable);

  function tickLive() {
    DATA.forEach((item) => {
      const bump = Math.round(Math.random() * 350 + 20);
      item.amount += bump;
    });
    document.querySelectorAll("[data-amount]").forEach((el) => {
      const row = el.closest("[data-id]");
      const id = Number(row.dataset.id);
      const item = DATA.find((d) => d.id === id);
      if (!item) return;
      el.textContent = formatAmount(item.currency, item.amount);
      el.classList.add("is-updating");
      setTimeout(() => el.classList.remove("is-updating"), 400);
    });
    updatedEl.textContent = "just now";
  }

  renderHero();
  renderTable();
  setInterval(tickLive, 4000);
})();
