let affection = 0; // 好感度

// ====== 劇本（加入 A/B 分支） ======
const script = [
  { name: "？？？", text: "……你終於嚟到呢座城市喇。" },
  { name: "主角", text: "呢度就係… City Lights？同我想像中有啲唔同。" },
  { name: "？？？", text: "哈哈，真正嘅故事，先啱啱開始啫。" },

  // 出現選項
  { choice: true, text: "你想點做？" },

  // ====== A 分支 ======
  { branch: "A", name: "主角", text: "我想四圍行下，熟習下環境先。" },
  { branch: "A", name: "？？？", text: "好啊，我帶你去市中心。" },

  // ====== B 分支 ======
  { branch: "B", name: "主角", text: "我有啲攰，想返旅館休息下。" },
  { branch: "B", name: "？？？", text: "咁都好，休息好啲先有精神冒險。" }
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
  choices.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  index++;
  showLine();
});

// ====== 選項 B ======
choiceB.addEventListener("click", () => {
  currentBranch = "B";
  choices.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  index++;
  showLine();
});

// ====== 初始化 ======
showLine();
