(function () {
  const moneyTarget = 838379;
  const fixTarget = 77;

  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const controls = btn.getAttribute('aria-controls');
      const list = document.getElementById(controls) || document.querySelector('.nav-list');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (list) {
        list.style.display = expanded ? 'none' : 'flex';
        list.style.flexDirection = window.innerWidth < 980 ? 'column' : 'row';
      }
    });
  });

  ['#yearHome', '#yearAbout', '#yearMon', '#yearStats', '#yearContact'].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  function animate(el, target, formatter = v => v, duration = 1200) {
    if (!el) return;
    let start = 0;
    let startTime = null;
    function tick(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = formatter(value);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const elMoney = document.getElementById('metric-money');
  const elFix = document.getElementById('metric-fix');
  if (elMoney) animate(elMoney, moneyTarget, v => '$' + v.toLocaleString());
  if (elFix) animate(elFix, fixTarget, v => v + '%');

  const bigMoney = document.getElementById('stat-money-lg');
  const bigFix = document.getElementById('stat-fix-lg');
  if (bigMoney) bigMoney.textContent = '$' + moneyTarget.toLocaleString();
  if (bigFix) bigFix.textContent = fixTarget + '%';

  const chartSvg = document.querySelector('.svg-chart');
  if (chartSvg) {
    const data = [
      {month: 'Jan', issues: 40, fixes: 18},
      {month: 'Feb', issues: 32, fixes: 22},
      {month: 'Mar', issues: 50, fixes: 31},
      {month: 'Apr', issues: 38, fixes: 28},
      {month: 'May', issues: 60, fixes: 46},
      {month: 'Jun', issues: 52, fixes: 40},
    ];
    const w = 600, h = 180, padding = 28;
    chartSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const maxVal = Math.max(...data.map(d => d.issues));
    const barW = (w - padding * 2) / data.length / 2;
    let x = padding;

    data.forEach((d) => {
      const issuesH = (d.issues / maxVal) * (h - padding * 2);
      const fixesH = (d.fixes / maxVal) * (h - padding * 2);

      const issuesBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      issuesBar.setAttribute('x', x);
      issuesBar.setAttribute('y', h - padding - issuesH);
      issuesBar.setAttribute('width', barW);
      issuesBar.setAttribute('height', issuesH);
      issuesBar.setAttribute('fill', '#F28C28');
      issuesBar.setAttribute('rx', 4);
      chartSvg.appendChild(issuesBar);

      const fixesBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      fixesBar.setAttribute('x', x + barW + 6);
      fixesBar.setAttribute('y', h - padding - fixesH);
      fixesBar.setAttribute('width', barW);
      fixesBar.setAttribute('height', fixesH);
      fixesBar.setAttribute('fill', '#0F172A');
      fixesBar.setAttribute('rx', 4);
      chartSvg.appendChild(fixesBar);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', x + barW);
      label.setAttribute('y', h - 6);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '10');
      label.setAttribute('fill', '#5B6474');
      label.textContent = d.month;
      chartSvg.appendChild(label);

      x += (barW * 2) + 18;
    });
  }
})();
