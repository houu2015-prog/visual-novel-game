function changeBackground(imgName) {
  const bg = document.getElementById("bg");

  // 淡出
  bg.classList.add("bg-hidden");

  setTimeout(() => {
    // 換背景
    bg.style.backgroundImage = `url("../img/${imgName}")`;

    // 淡入
    bg.classList.remove("bg-hidden");
  }, 500);
}

let affection = 0; // 好感度

// ====== 劇本（加入 A/B 分支 + 結局） ======
const script = [
  { name: "？？？", text: "……你終於嚟到呢座城市喇。" },
  { name: "主角", text: "呢度就係… City Lights？同我想像中有啲唔同。" },
  { bg: "bg-home.jpg" }
  { name: "？？？", text: "哈哈，真正嘅故事，先啱啱開始啫。" },

  // 出現選項
  { choice: true, text: "你想點做？" },

  // ====== A 分支 ======
  { branch: "A", name: "主角", text: "我想四圍行下，熟習下環境先。" },
  { branch: "A", name: "？？？", text: "好啊，我帶你去市中心。" },

  // ====== B 分支 ======
  { branch: "B", name: "主角", text: "我有啲攰，想返旅館休息下。" },
  { branch: "B", name: "？？？", text: "咁都好，休息好啲先有精神冒險。" },

  // ====== 結局前提示 ======
  { ending: true, text: "（你嘅選擇，悄悄改變咗佢對你嘅感覺…）" },

  // Good End
  { endType: "good", text: "Good End：佢望住你，眼神變得柔和——你哋嘅故事，正式開始。" },

  // Bad End
  { endType: "bad", text: "Bad End：佢同你保持住禮貌距離，故事喺沉默中慢慢散去。" }
];

let index = 0;
let currentBranch = null;

// ====== DOM ======
const nameBox = document.getElementById("name-box");
const textBox = document.getElementById("text-box");
const nextBtn = document.getElementById("next-btn");
const choices = document.getElementById("choices");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");

// ====== 顯示對白 ======
function showLine() {
  const line = script[index];

  // 如果係選項
  if (line.choice) {
    nextBtn.classList.add("hidden");
    choices.classList.remove("hidden");
    textBox.textContent = line.text;
    nameBox.textContent = "";
    return;
  }

  // 如果係分支，但唔係玩家揀嗰條 → 跳過
  if (line.branch && line.branch !== currentBranch) {
    index++;
    showLine();
    return;
  }

  // ====== 結局判定 ======
  if (line.ending) {
    nextBtn.classList.add("hidden");

    setTimeout(() => {
      let endingLine;

      if (affection >= 1) {
        endingLine = script.find(s => s.endType === "good");
      } else {
        endingLine = script.find(s => s.endType === "bad");
      }

      nameBox.textContent = "";
      textBox.textContent = endingLine.text;
    }, 500);

    return;
  }

  // 顯示正常對白
  nameBox.textContent = line.name || "";
  textBox.textContent = line.text || "";
}

// ====== 下一句 ======
nextBtn.addEventListener("click", () => {
  index++;
  if (index >= script.length) {
    nextBtn.textContent = "完結";
    nextBtn.disabled = true;
    return;
  }
  showLine();
});

// ====== 選項 A ======
choiceA.addEventListener("click", () => {
  currentBranch = "A";
  affection += 1; // A 選項加好感
  choices.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  index++;
  showLine();
});

// ====== 選項 B ======
choiceB.addEventListener("click", () => {
  currentBranch = "B";
  affection -= 1; // B 選項減好感
  choices.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  index++;
  showLine();
});

// ====== 初始化 ======
showLine();
