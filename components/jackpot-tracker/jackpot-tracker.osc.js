(function () {
  const DATA = [
    { id: 1, game: "Mega Moolah Mega", provider: "Microgaming", amount: 13624970, avgWin: "6.151.937 €", avgFreq: "9 Wochen", lastHit: "vor 1J 11W", status: "overdue", casino: { name: "Ice Casino", logo: "/components/jackpot-tracker/assets/logos/ice-casino.svg", bg: "#1667FE" } },
    { id: 2, game: "Joker Millions", provider: "Yggdrasil", amount: 4776717, avgWin: "2.985.974 €", avgFreq: "33 Wochen", lastHit: "vor 3J 31W", status: "overdue", casino: { name: "Beef Casino", logo: "/components/jackpot-tracker/assets/logos/beef-casino.svg", bg: "#232E3F" } },
    { id: 3, game: "Shopping Spree", provider: "RTG", amount: 4053292, avgWin: "2.594.106 €", avgFreq: "4 Jahre", lastHit: "vor 4J 7W", status: "hot", casino: { name: "V.Vegas", logo: "/components/jackpot-tracker/assets/logos/vvegas.svg", bg: "#5CAFBD" } },
    { id: 4, game: "Hall of Gods Mega", provider: "NetEnt", amount: 3065549, avgWin: "5.619.688 €", avgFreq: "38 Wochen", lastHit: "vor 3J 18W", status: "overdue", casino: { name: "Crocoslots", logo: "/components/jackpot-tracker/assets/logos/crocoslots.svg", bg: "#212738" } },
    { id: 5, game: "Jackpot King", provider: "Blueprint", amount: 2661106, avgWin: "—", avgFreq: "—", lastHit: "—", status: "recent", casino: { name: "Bitkingz", logo: "/components/jackpot-tracker/assets/logos/bitkingz.svg", bg: "#242732" } },
    { id: 6, game: "King Cashalot", provider: "Microgaming", amount: 2224299, avgWin: "1.982.410 €", avgFreq: "12 Wochen", lastHit: "vor 5W", status: "none", casino: { name: "Slotsgem", logo: "/components/jackpot-tracker/assets/logos/slotsgem.svg", bg: "#000000" } },
    { id: 7, game: "Aztec's Millions", provider: "RTG", amount: 1821509, avgWin: "1.340.220 €", avgFreq: "20 Wochen", lastHit: "vor 22W", status: "none", casino: { name: "SpinLynx", logo: "/components/jackpot-tracker/assets/logos/spinlynx.svg", bg: "#100032" } },
    { id: 8, game: "Jackpot Piñatas", provider: "RTG", amount: 1638320, avgWin: "980.600 €", avgFreq: "16 Wochen", lastHit: "vor 9W", status: "none", casino: { name: "Vegazone", logo: "/components/jackpot-tracker/assets/logos/vegazone.svg", bg: "#321A1C" } },
  ];

  const BADGE_LABEL = { overdue: "Überfällig", hot: "Heiß", recent: "Kürzlich geknackt" };
  const root = document.querySelector(".osc-jackpot-tracker");
  const heroGrid = root.querySelector("#osc-jt-hero-grid");
  const tbody = root.querySelector("#osc-jt-table-body");
  const searchInput = root.querySelector("#osc-jt-search");
  const updatedEl = root.querySelector("#osc-jt-updated");
  const sortState = { key: "amount", dir: "desc" };

  function formatAmount(value) {
    return Math.round(value).toLocaleString("de-DE") + " €";
  }

  function heroCardHTML(item) {
    const badge = BADGE_LABEL[item.status]
      ? `<span class="osc-jt-badge">${BADGE_LABEL[item.status]}</span>`
      : "<span></span>";
    return `
      <article class="osc-jt-card" data-id="${item.id}">
        <div class="osc-jt-card__top">
          ${badge}
        </div>
        <div class="osc-jt-card__headline">
          <p class="osc-jt-card__provider">${item.provider}</p>
          <h3 class="osc-jt-card__game">${item.game}</h3>
          <p class="osc-jt-card__amount" data-amount>${formatAmount(item.amount)}</p>
        </div>
        <div class="osc-jt-card__stats">
          <div><span class="osc-jt-stat__label">Ø Gewinn</span><span class="osc-jt-stat__value">${item.avgWin}</span></div>
          <div><span class="osc-jt-stat__label">Ø Häufigkeit</span><span class="osc-jt-stat__value">${item.avgFreq}</span></div>
          <div><span class="osc-jt-stat__label">Letzter Treffer</span><span class="osc-jt-stat__value">${item.lastHit}</span></div>
        </div>
        <div class="osc-jt-card__cta-row">
          <div class="osc-jt-card__casino" style="--osc-jt-casino-bg:${item.casino.bg}">
            <img class="osc-jt-card__casino-logo" src="${item.casino.logo}" alt="${item.casino.name} Logo" loading="lazy" />
          </div>
          <button type="button" class="osc-btn-cta">Jetzt spielen</button>
        </div>
      </article>`;
  }

  function tableRowHTML(item) {
    return `
      <tr data-id="${item.id}">
        <td class="osc-jt-table__game">${item.game}<div class="osc-jt-table__provider">${item.provider}</div></td>
        <td class="osc-jt-table__amount" data-label="Jackpot"><span class="osc-jt-table__amount-value" data-amount>${formatAmount(item.amount)}</span></td>
        <td class="osc-jt-table__provider" data-label="Anbieter">${item.provider}</td>
        <td>
          <div class="osc-jt-table__cta-cell">
            <div class="osc-jt-table__casino" style="--osc-jt-casino-bg:${item.casino.bg}">
              <img class="osc-jt-table__casino-logo" src="${item.casino.logo}" alt="${item.casino.name} Logo" loading="lazy" />
            </div>
            <button type="button" class="osc-btn-cta">Sichern</button>
          </div>
        </td>
      </tr>`;
  }

  function renderHero() {
    // 4 cards, no 3: con solo 3 el carrusel horizontal a veces cabía entero y el gesto de scroll
    // no quedaba claro — la 4a se asoma cortada en el borde y funciona como affordance de "hay más".
    const top4 = [...DATA].sort((a, b) => b.amount - a.amount).slice(0, 4);
    heroGrid.innerHTML = top4.map(heroCardHTML).join("");
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
      : '<tr><td colspan="4" style="text-align:center; color:var(--jt-text-muted); padding:20px;">Keine Jackpots gefunden.</td></tr>';
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
      item.amount += Math.round(Math.random() * 350 + 20);
    });
    document.querySelectorAll("[data-amount]").forEach((el) => {
      const row = el.closest("[data-id]");
      const item = DATA.find((d) => d.id === Number(row.dataset.id));
      if (!item) return;
      el.textContent = formatAmount(item.amount);
      el.classList.add("is-updating");
      setTimeout(() => el.classList.remove("is-updating"), 400);
    });
    updatedEl.textContent = "gerade eben";
  }

  renderHero();
  renderTable();
  setInterval(tickLive, 4000);
})();
