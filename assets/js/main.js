// Small JS for nav toggle, year and stat counters
(function(){
  function qs(sel){return document.querySelector(sel)}
  function qsa(sel){return document.querySelectorAll(sel)}

  // Mobile nav toggles (works across pages; each page has its own id)
  qsa('.nav-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var controls = btn.getAttribute('aria-controls')
      var nav = document.getElementById(controls)
      var expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', String(!expanded))
      if(nav) nav.style.display = expanded ? 'none' : 'block'
    })
  })

  // Insert current year in multiple pages
  ['#year','#yearAbout','#yearMon','#yearStats','#yearContact'].forEach(function(id){
    var el = qs(id)
    if(el) el.textContent = new Date().getFullYear()
  })

  // Animated counters for money and fix rate (source data embedded)
  var moneyTarget = 838379; // from provided data
  var fixTarget = 77; // percent

  function animateNumber(el, target, formatter, duration){
    if(!el) return
    var start = 0
    var startTime = null
    function step(timestamp){
      if(!startTime) startTime = timestamp
      var progress = Math.min((timestamp - startTime) / duration, 1)
      var value = Math.floor(progress * (target - start) + start)
      el.textContent = formatter ? formatter(value) : value
      if(progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  var statMoneyEl = qs('#stat-money') || qs('#fig-money')
  var statFixEl = qs('#stat-fix') || qs('#fig-fix')

  animateNumber(statMoneyEl, moneyTarget, function(v){
    return '$' + v.toLocaleString()
  }, 1200)

  animateNumber(statFixEl, fixTarget, function(v){
    return v + '%'
  }, 1000)

  // Mirror values on stats page headings if they exist
  var figMoney = qs('#fig-money')
  var figFix = qs('#fig-fix')
  if(figMoney) figMoney.textContent = '$' + moneyTarget.toLocaleString()
  if(figFix) figFix.textContent = fixTarget + '%'

})();
