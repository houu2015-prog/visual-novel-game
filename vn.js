function changeBackground(imgName) {
  const bg = document.getElementById("bg");

  // 淡出
  bg.classList.add("bg-hidden");

  setTimeout(() => {
    // 換背景
    bg.style.backgroundImage = `url("img/${imgName}")`;

    // 淡入
    bg.classList.remove("bg-hidden");
  }, 500);
}

// ⭐⭐ 角色淡入淡出（正確位置：獨立函式） ⭐⭐
function showCharacters(leftImg, rightImg) {
  const left = document.getElementById("char-left");
  const right = document.getElementById("char-right");

  // 左角色
  if (leftImg) {
    left.src = `img/${leftImg}`;
    left.style.opacity = 1;
  } else {
    left.style.opacity = 0;
  }

  // 右角色
  if (rightImg) {
    right.src = `img/${rightImg}`;
    right.style.opacity = 1;
  } else {
    right.style.opacity = 0;
  }
}


 

let affection = 0; // 好感度

// ====== 劇本（加入 A/B 分支 + 結局 + 背景切換） ======
const script = [
  // ====== 開場：夜景 ======
{ bg: "bg-night.jpg" },
{ name: "？？？", right: "girl-normal.png", text: "……你終於嚟到 City Lights 喇。" },
{ name: "主角", left: "mc-normal.png", text: "你係…？點解會喺度等我？" },
{ name: "少女", right: "girl-smile.png", text: "我叫璃音。今晚開始，你嘅命運會同我連結。" },

// ====== 背景切換：夜景 → 房間 ======
{ bg: "bg-room.jpg" },
{ name: "璃音", right: "girl-normal.png", text: "呢度係我嘅房間。放心，我唔會對你做啲奇怪嘢。" },
{ name: "主角", left: "mc-normal.png", text: "……你講得好似我應該要擔心咁。" },

// ====== 選項 1 ======
{ choice: true, text: "你想點回應璃音？" },

// ====== A 分支：友善 ======
{ branch: "A", name: "主角", left: "mc-smile.png", text: "多謝你帶我嚟呢度。我相信你。" },
{ branch: "A", name: "璃音", right: "girl-blush.png", text: "……你咁講，我會唔會太開心咗啲。" },

// ====== B 分支：冷淡 ======
{ branch: "B", name: "主角", left: "mc-normal.png", text: "我唔係好明白你想點。可以講清楚啲？" },
{ branch: "B", name: "璃音", right: "girl-sad.png", text: "……原來你係呢種人。" },

// ====== 劇情合流 ======
{ name: "璃音", right: "girl-normal.png", text: "其實，我搵你係因為——" },

// ====== 背景切換：房間 → 神秘空間 ======
{ bg: "bg-dimension.jpg" },
{ name: "璃音", right: "girl-serious.png", text: "呢度係『交界之地』。只有被選中嘅人先入到嚟。" },
{ name: "主角", left: "mc-surprised.png", text: "我？被選中？為咩事？" },
{ name: "璃音", right: "girl-serious.png", text: "因為……你係唯一可以拯救我世界嘅人。" },

// ====== 選項 2 ======
{ choice: true, text: "你點回應璃音嘅請求？" },

// ====== A2：接受 ======
{ branch: "A2", name: "主角", left: "mc-smile.png", text: "如果你需要我，我會幫你。" },
{ branch: "A2", name: "璃音", right: "girl-blush.png", text: "……多謝你。我真係好開心。" },

// ====== B2：拒絕 ======
{ branch: "B2", name: "主角", left: "mc-normal.png", text: "我唔係英雄。你搵錯人喇。" },
{ branch: "B2", name: "璃音", right: "girl-sad.png", text: "……原來你真係咁諗。" },

// ====== 結局前提示 ======
{ ending: true, text: "（你嘅選擇，決定咗璃音對你嘅信任……）" },

// ====== Good End ======
{ endType: "good", text: "Good End：璃音握住你嘅手，微笑著迎向未知嘅未來。" },

// ====== Bad End ======
{ endType: "bad", text: "Bad End：璃音轉身離去，交界之地慢慢崩塌，你再見唔到佢。" },

// ====== Secret End（好感度 ≥ 3） ======
{ endType: "secret", text: "Secret End：璃音輕輕抱住你——『我一直都相信你。』" }

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

  // 背景切換
  if (line.bg) {
    changeBackground(line.bg);
    index++;
    showLine();
    return;
  }

  // 顯示角色立繪（淡入淡出）
  showCharacters(line.left, line.right);

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
 // ====== 結局判定 ======
if (line.ending) {
  nextBtn.classList.add("hidden");

  setTimeout(() => {
    let endingLine;

    // Secret End（好感度 ≥ 3）
    if (affection >= 3) {
      endingLine = script.find(s => s.endType === "secret");
    }
    // Good End（好感度 ≥ 1）
    else if (affection >= 1) {
      endingLine = script.find(s => s.endType === "good");
    }
    // Bad End（其他）
    else {
      endingLine = script.find(s => s.endType === "bad");
    }

    nameBox.textContent = "";
    textBox.textContent = endingLine.text;

    // 停止遊戲
    nextBtn.disabled = true;
    choices.classList.add("hidden");
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
// ====== 選項 A（第一次 + 第二次） ======
choiceA.addEventListener("click", () => {
  // 第一次選項
  
  if (index === 7) {        // 第一次選項
    currentBranch = "A";
    affection += 1;
  } else if (index === 17) { // 第二次選項
    currentBranch = "A2";
    affection += 2;
  }

  choices.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  index++;
  showLine();
});


// ====== 選項 B（第一次 + 第二次） ======
choiceB.addEventListener("click", () => {
  // 第一次選項
 
  if (index === 7) {        // 第一次選項
    currentBranch = "B";
    affection -= 1;
  } else if (index === 17) { // 第二次選項
    currentBranch = "B2";
    affection -= 1;
  }

  choices.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  index++;
  showLine();
});



// ====== 初始化 ======
showLine();
