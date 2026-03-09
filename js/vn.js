
// ====== 視覺小說最基本劇本 ======
const script = [
  { name: "？？？", text: "……你終於嚟到呢座城市喇。" },
  { name: "主角", text: "呢度就係… City Lights？同我想像中有啲唔同。" },
  { name: "？？？", text: "哈哈，真正嘅故事，先啱啱開始啫。" },
  { name: "", text: "（你感覺到夜風中有少少涼意，同時又有種莫名嘅期待。）" }
];

let index = 0;

// ====== DOM ======
const nameBox = document.getElementById("name-box");
const textBox = document.getElementById("text-box");
const nextBtn = document.getElementById("next-btn");

// ====== 顯示對白 ======
function showLine(i) {
  const line = script[i];
  nameBox.textContent = line.name;
  textBox.textContent = line.text;
}

// ====== 下一句 ======
nextBtn.addEventListener("click", () => {
  index++;
  if (index >= script.length) {
    nextBtn.textContent = "完結";
    nextBtn.disabled = true;
    return;
  }
  showLine(index);
});

// ====== 初始化 ======
showLine(index);
