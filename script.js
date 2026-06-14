const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const variantCopy = {
  source: {
    label: "資料介紹版",
    note: "偏向整理網路與官方資料，適合說明名詞、形式與背景。",
    title: "費登魁斯方法",
    eyebrow: "身心教育 · 動作覺察 · 自我學習",
    lede:
      "透過溫和、可探索的動作，引導你重新感覺身體如何組織自己，在日常動作裡找到更多選擇與自在。",
    draft: "校稿版：內容、講師介紹與聯絡資訊仍在確認中。",
    intro: [
      ["第一版介紹網站", "內容可由受訓者後續校稿與調整。"],
      ["非醫療承諾", "以身心教育與動作學習角度說明。"],
    ],
    aboutKicker: "關於這個練習",
    aboutTitle: "從「用力變好」轉向「更清楚地感覺」",
    aboutParagraphs: [
      "費登魁斯方法是一種以動作和覺察為核心的身心教育方式。它不要求你模仿標準姿勢，而是透過小而清楚的動作探索，讓神經系統有機會找到更有效率、更舒服的組織方式。",
      "第一版網站先以初學者能理解的語氣介紹方法、課程形式與常見疑問。等受訓者確認內容後，可以再補上個人故事、受訓歷程、課程地點與正式聯絡資訊。",
    ],
    methodKicker: "什麼是費登魁斯方法",
    methodTitle: "用動作探索，讓身體學會更多可能",
    methodParagraph:
      "這套方法由 Moshe Feldenkrais 發展，常被描述為一種透過動作與自我覺察來改善功能的教育系統。重點不是追求完美姿勢，而是學習辨認習慣、減少不必要的用力，並在安全範圍內建立更多選擇。",
    features: [
      ["01", "慢下來", "透過細緻、可控制的速度，讓身體有時間感覺差異，而不是急著完成動作。"],
      ["02", "少一點力氣", "練習常鼓勵輕柔與舒適，讓你觀察哪裡其實不需要一直出力。"],
      ["03", "多一些選擇", "當動作不只剩一種做法，日常行走、坐下、轉身與休息都可能變得更有彈性。"],
    ],
    experienceTitle: "先理解名詞，再理解課堂",
    experienceText:
      "資料介紹版適合回答「它是什麼、有哪些形式、和哪些概念有關」。但初次接觸者常常還需要一個身體上的小線索，才比較容易明白為什麼這不是伸展或按摩。",
    experienceSteps: ["讀到方法的定義", "知道團體課與個別課", "理解它是身體學習而非醫療承諾"],
  },
  understanding: {
    label: "理解引導版",
    note: "偏向我們討論出的說法，先讓人有感覺，再補上方法名稱。",
    title: "身體也需要新的選擇",
    eyebrow: "如果你總是放鬆不了，也許不是你不夠努力",
    lede:
      "費登魁斯不是要你把身體控制得更正確，而是透過很小、很慢、很舒服的動作，發現自己平常怎麼用力，然後讓身體有機會試試看別的做法。",
    draft: "比較版：目前用來討論網站說法，正式內容仍需校稿。",
    intro: [
      ["先有感覺", "讓人先體會「原來我還可以這樣動」。"],
      ["再有理解", "再說明這是一種身體學習，而不是療效保證。"],
    ],
    aboutKicker: "先從一個常見困惑開始",
    aboutTitle: "為什麼我明明想放鬆，身體卻還是很用力？",
    aboutParagraphs: [
      "很多時候，我們不是不夠努力，而是太熟悉同一種坐著、站著、轉頭、呼吸的方式。身體會自動走回那條最習慣的路，即使那條路並不輕鬆。",
      "費登魁斯方法提供的不是一套標準答案，而是一個慢下來觀察的環境。你透過細小的動作、休息與差異感，重新認識自己的習慣，讓身體多一點選擇。",
    ],
    methodKicker: "這和費登魁斯有什麼關係",
    methodTitle: "它比較像是用身體重新學一次「怎麼動比較不費力」",
    methodParagraph:
      "在課堂裡，重點不是做到最大、最漂亮、最標準，而是感覺：哪裡先動？哪裡跟著動？哪裡其實不需要那麼用力？當你開始分辨這些差異，改變才有機會發生。",
    features: [
      ["01", "不是矯正你", "它不急著告訴你哪個姿勢才正確，而是讓你看見自己現在的習慣。"],
      ["02", "不是忍耐疼痛", "動作可以很小、很慢、很舒服；不舒服本身就是需要被尊重的訊號。"],
      ["03", "不是變得完美", "更重要的是多一些可選擇的路徑，讓日常動作不再只剩硬撐。"],
    ],
    experienceTitle: "30 秒小體驗：轉頭以前，先不要急著轉到最遠",
    experienceText:
      "坐著，慢慢看向左邊。不要拉到極限，只感覺眼睛、下巴、肩膀、肋骨有沒有一起參與。回到中間，休息一下，再轉一次。第二次有沒有一點不同？",
    experienceSteps: ["先做一次熟悉的動作", "注意身體哪些地方參與", "休息後再做一次，感覺差異"],
  },
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

function createVersionSwitch() {
  const heroActions = document.querySelector(".hero-actions");
  if (!heroActions || document.querySelector(".version-switch")) return;

  const switcher = document.createElement("div");
  switcher.className = "version-switch";
  switcher.setAttribute("aria-label", "內容版本切換");
  switcher.innerHTML = `
    <p class="version-switch-title">版本比較</p>
    <div class="version-switch-controls" role="group" aria-label="選擇內容版本">
      <button type="button" data-version-button="understanding">理解引導版</button>
      <button type="button" data-version-button="source">資料介紹版</button>
    </div>
    <p class="version-switch-note" data-version-note></p>
  `;

  heroActions.insertAdjacentElement("afterend", switcher);

  switcher.querySelectorAll("[data-version-button]").forEach((button) => {
    button.addEventListener("click", () => applyVariant(button.dataset.versionButton));
  });
}

function createExperienceSection() {
  const introBand = document.querySelector(".intro-band");
  if (!introBand || document.querySelector(".experience-section")) return;

  const section = document.createElement("section");
  section.className = "section experience-section";
  section.setAttribute("aria-labelledby", "experience-title");
  section.innerHTML = `
    <div class="experience-copy">
      <p class="section-kicker">先讓人感覺到差別</p>
      <h2 id="experience-title"></h2>
      <p data-experience-text></p>
    </div>
    <ol class="experience-steps" aria-label="體驗步驟"></ol>
  `;

  introBand.insertAdjacentElement("afterend", section);
}

function applyVariant(variantName) {
  const variant = variantCopy[variantName] || variantCopy.understanding;
  body.dataset.contentMode = variantName;
  localStorage.setItem("feldenkraisContentVariant", variantName);

  document.title =
    variantName === "source"
      ? "費登魁斯方法 | 資料介紹版"
      : "身體也需要新的選擇 | 費登魁斯方法";

  setText(".hero .eyebrow", variant.eyebrow);
  setText("#hero-title", variant.title);
  setText(".hero-lede", variant.lede);
  setText(".draft-note", variant.draft);

  document.querySelectorAll(".intro-grid article").forEach((article, index) => {
    const item = variant.intro[index];
    if (!item) return;
    setTextWithin(article, "strong", item[0]);
    setTextWithin(article, "span", item[1]);
  });

  setText("#about .section-kicker", variant.aboutKicker);
  setText("#about h2", variant.aboutTitle);
  setParagraphs("#about .section-copy", variant.aboutParagraphs);

  setText("#method .section-kicker", variant.methodKicker);
  setText("#method h2", variant.methodTitle);
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
      ...variant.experienceSteps.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
      }),
    );
  }

  document.querySelectorAll("[data-version-button]").forEach((button) => {
    const isActive = button.dataset.versionButton === variantName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  setText("[data-version-note]", variant.note);
}

function setTextWithin(root, selector, text) {
  const element = root.querySelector(selector);
  if (element) element.textContent = text;
}

createVersionSwitch();
createExperienceSection();
applyVariant(localStorage.getItem("feldenkraisContentVariant") || "understanding");

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
