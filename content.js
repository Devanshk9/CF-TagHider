console.log("[TagHider] content.js loaded");


function hideOnProblemPage() {
  document.querySelectorAll(
    ".problem-tags, .tag-box, .roundbox .tag-box"
  ).forEach(el => {
    el.style.display = "none";
  });
}


function hideOnListPage() {
  const rows = document.querySelectorAll("table.problems tr");
  rows.forEach(tr => {
    const nameCell = tr.querySelector("td:nth-child(2)");
    if (!nameCell || nameCell.dataset.taghider === "done") return;

    const link = nameCell.querySelector("a");
    if (!link) return;


    const keep = link.cloneNode(true);
    nameCell.textContent = "";
    nameCell.appendChild(keep);


    const hint = document.createElement("span");
    hint.textContent = " — tags hidden";
    hint.style.fontStyle = "italic";
    hint.style.color = "#888";
    nameCell.appendChild(hint);

    nameCell.dataset.taghider = "done";
  });
}

function hideAll() {
  hideOnProblemPage();
  hideOnListPage();
}

// Run now and on future DOM mutations (CF updates parts of the page dynamically)
hideAll();
new MutationObserver(hideAll).observe(document.documentElement, {
  childList: true,
  subtree: true
});
