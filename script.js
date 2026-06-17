const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const siteCopy = {
  experienceLayout: "guided",
  title: "費什麼方法？",
  eyebrow: "如果你總是放鬆不了，也許不是你不夠努力，而是太努力了。",
  lede:
    "費登魁斯不是要你把身體控制得更正確，而是透過很小、很慢、很舒服的動作，發現自己平常怎麼用力，然後讓身體有機會試試看別的做法。",
  aboutKicker: "先從一個常見困惑開始",
  aboutTitle: "為什麼我明明想放鬆，身體卻還是很用力？",
  aboutParagraphs: [
    "很多時候，我們不是不夠努力，而是太熟悉同一種坐著、站著、轉頭、呼吸的方式。身體會自動走回那條最習慣的路，即使那條路並不輕鬆。",
    "費登魁斯方法提供的不是一套標準答案，而是一個慢下來觀察的環境。你透過細小的動作、休息與差異感，重新認識自己的習慣，讓身體多一點選擇。",
  ],
  methodKicker: "這和費登魁斯有什麼關係",
  methodTitle: "重新學一次「怎麼動更不費力」",
  methodTitleEmphasis: ["不", "費力"],
  methodParagraph:
    "在課堂裡，重點不是做到最大、最漂亮、最標準，是感覺：哪裡先動？哪裡跟著動？哪裡其實不需要那麼用力？當你開始分辨這些差異，改變就有機會發生。",
  features: [
    ["01", "不用矯正你", "它不急著告訴你哪個姿勢才正確，而是讓你看見自己現在的習慣。"],
    ["02", "不用忍耐疼痛", "動作可以很小、很慢、很舒服；不舒服本身就是需要被尊重的訊號。"],
    ["03", "不用變得完美", "更重要的是多一些可選擇的路徑，讓日常動作不再只剩硬撐。"],
  ],
  experienceTitle: "一分鐘小體驗：轉頭以前，先不要急著轉到最遠",
  experienceText:
    "你可以先照平常的方式轉一次，再把注意力放到一個平常不會觀察的地方。差異不一定很大，但那一點點「原來還有別的做法」，就是理解費登魁斯的入口。",
  experienceSteps: [
    {
      title: "照習慣轉一次",
      text: "坐著，輕輕把頭轉向右邊，不追求最遠，只記得大概看到哪裡。",
    },
    {
      title: "換一個觀察點",
      text: "回到中間，感覺兩邊坐骨的重量，再留意肋骨有沒有一點跟著轉。",
    },
    {
      title: "讓眼睛先走",
      text: "再次看向右邊，讓眼睛先慢慢移動，頭只是輕輕跟上。",
    },
    {
      title: "問一個問題",
      text: "這次是脖子更用力，還是身體有更多地方一起參與？",
    },
  ],
};

const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setParagraphs(containerSelector, paragraphs) {
  const paragraphsInDom = [
    ...document.querySelectorAll(`${containerSelector} p:not(.section-kicker)`),
  ];

  paragraphs.forEach((text, index) => {
    if (paragraphsInDom[index]) paragraphsInDom[index].textContent = text;
  });
}

function setMethodTitle(variant) {
  const title = document.querySelector("#method h2");
  if (!title) return;

  title.replaceChildren();

  const emphasisTerms = Array.isArray(variant.methodTitleEmphasis)
    ? variant.methodTitleEmphasis
    : [variant.methodTitleEmphasis].filter(Boolean);

  if (!emphasisTerms.length) {
    title.textContent = variant.methodTitle;
    return;
  }

  let cursor = 0;
  while (cursor < variant.methodTitle.length) {
    const match = emphasisTerms
      .map((term) => ({
        term,
        index: variant.methodTitle.indexOf(term, cursor),
      }))
      .filter((item) => item.index !== -1)
      .sort((a, b) => a.index - b.index || b.term.length - a.term.length)[0];

    if (!match) {
      title.append(variant.methodTitle.slice(cursor));
      break;
    }

    if (match.index > cursor) {
      title.append(variant.methodTitle.slice(cursor, match.index));
    }

    const emphasis = document.createElement("span");
    emphasis.className = "title-emphasis";
    emphasis.textContent = match.term;
    title.append(emphasis);
    cursor = match.index + match.term.length;
  }
}

function createExperienceSection() {
  const hero = document.querySelector(".hero");
  if (!hero || document.querySelector(".experience-section")) return;

  const section = document.createElement("section");
  section.className = "section experience-section";
  section.setAttribute("aria-labelledby", "experience-title");
  section.innerHTML = `
    <div class="experience-copy">
      <p class="section-kicker">先讓人感覺到差別</p>
      <h2 id="experience-title"></h2>
      <p data-experience-text></p>
      <p class="experience-safety">保持舒服，不忍痛、不追求角度；若有疼痛或暈眩，請停止並諮詢專業人員。</p>
    </div>
    <div class="experience-guide">
      <div class="experience-visual" aria-label="轉頭時可以觀察眼睛、肋骨與坐骨的關係">
        <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false" aria-label="暫停示意動畫" title="暫停動畫">
          <span class="motion-icon" aria-hidden="true"></span>
          <span class="sr-only" data-motion-toggle-label>暫停示意動畫</span>
        </button>
        <div class="movement-map">
          <div class="movement-figure" aria-hidden="true">
            <span class="movement-gaze"></span>
            <span class="movement-head"><span class="movement-eye"></span></span>
            <span class="movement-neck"></span>
            <span class="movement-ribs"></span>
            <span class="movement-spine"></span>
            <span class="movement-seat"></span>
          </div>
          <div class="movement-cues">
            <p><span class="cue-dot cue-eye"></span><strong>眼睛</strong><small>視線先往右邊走</small></p>
            <p><span class="cue-dot cue-ribs"></span><strong>肋骨</strong><small>感覺有沒有跟一點</small></p>
            <p><span class="cue-dot cue-seat"></span><strong>坐骨</strong><small>重量留在椅子上</small></p>
          </div>
          <p class="movement-caption">不是轉更遠，而是看見動作從哪裡開始、哪裡一起參與。</p>
        </div>
      </div>
      <ol class="experience-steps" aria-label="體驗步驟"></ol>
    </div>
  `;

  hero.insertAdjacentElement("afterend", section);
}

function setupMotionToggle() {
  const toggle = document.querySelector("[data-motion-toggle]");
  if (!toggle) return;

  const label = toggle.querySelector("[data-motion-toggle-label]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setPaused(isPaused) {
    body.classList.toggle("motion-paused", isPaused);
    toggle.setAttribute("aria-pressed", String(isPaused));

    const text = isPaused ? "播放示意動畫" : "暫停示意動畫";
    toggle.setAttribute("aria-label", text);
    toggle.title = isPaused ? "播放動畫" : "暫停動畫";
    if (label) label.textContent = text;
  }

  if (prefersReducedMotion.matches) {
    setPaused(true);
    toggle.hidden = true;
    return;
  }

  setPaused(false);
  toggle.addEventListener("click", () => {
    setPaused(!body.classList.contains("motion-paused"));
  });
}

function applySiteCopy() {
  const variant = siteCopy;
  body.dataset.contentMode = "understanding";
  body.dataset.experienceLayout = variant.experienceLayout || "guided";

  document.title = "費什麼方法？Feel What? | 費登魁斯方法";

  setText(".hero .eyebrow", variant.eyebrow);
  setText("#hero-title", variant.title);
  setText(".hero-lede", variant.lede);

  setText("#about .section-kicker", variant.aboutKicker);
  setText("#about h2", variant.aboutTitle);
  setParagraphs("#about .section-copy", variant.aboutParagraphs);

  setText("#method .section-kicker", variant.methodKicker);
  setMethodTitle(variant);
  setText("#method .section-heading p:not(.section-kicker)", variant.methodParagraph);

  document.querySelectorAll(".feature-card").forEach((card, index) => {
    const item = variant.features[index];
    if (!item) return;
    setTextWithin(card, ".feature-number", item[0]);
    setTextWithin(card, "h3", item[1]);
    setTextWithin(card, "p", item[2]);
  });

  setText("#experience-title", variant.experienceTitle);
  setText("[data-experience-text]", variant.experienceText);
  const steps = document.querySelector(".experience-steps");
  if (steps) {
    steps.replaceChildren(
      ...variant.experienceSteps.map((step) => {
        const item = document.createElement("li");
        const title = document.createElement("strong");
        const detail = document.createElement("span");
        title.textContent = typeof step === "string" ? step : step.title;
        detail.textContent = typeof step === "string" ? "" : step.text;
        item.append(title);
        if (detail.textContent) item.append(detail);
        return item;
      }),
    );
  }
}

function setTextWithin(root, selector, text) {
  const element = root.querySelector(selector);
  if (element) element.textContent = text;
}

createExperienceSection();
setupMotionToggle();
applySiteCopy();

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.12, 0.3, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}
