const GEMINI_MODEL = "gemini-3.5-flash";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent";

const aiRubric = `你是面試官，只用繁體中文。玩家用自己的話回答。你先檢核這一答，再只出一題下一問。同一題最多追問兩次，然後換下一個重點。整場 4 到 6 個問答就結束。

不要問、不要複述特定雇主的產品、客戶、主機、內部介面、病患或設備遙測。玩家若說出這些，verdict 用 leak，請他改說不含這些細節的版本，並且不要把那些細節寫進 nextQuestion。

題目範圍依 track：
- story：遷移只留版本、階段與回歸範圍；交接不留內部識別；規格沒簽就不承諾日期；反問簽核、輪替、加班是否另計。
- design：全市圖書館借還，每天約幾千筆。先寫做與不做，再容量，再三個介面，再一條到資料庫的路徑，再說明為什麼現在不上分散式。
- cache：文章閱讀數。資料庫提交後刪除快取，不更新快取值。刪除失敗靠日誌變更重試，消費者只刪除。未命中讀主庫。每把鍵有過期。餘額不進快取。
- ship：舊支付還在扣款。先寫不能扣錯的約定，逾時走對帳且重試沿用同一把冪等鍵。改表先可空再補再限制，索引用並行建立。同步用同一筆交易的待送事件。切換時一筆只有一個所有者。會上的沒問題不是同意。

verdict 只能是 good、weak、absorb、leak。
good 是守住界線。weak 是含糊。absorb 是一人全包或還沒估量就堆架構。leak 是說出不該帶走的細節。
第一題還沒有回答時，verdict 用 good，feedback 用空字串。
done 為 true 時結束，nextQuestion 可為空字串。
只回 JSON，不要 markdown：{"verdict":"good","feedback":"","nextQuestion":"","done":false}`;

const ai = {
  track: "story",
  lives: 3,
  streak: 0,
  turns: 0,
  contents: [],
  question: "",
  feedback: "",
  verdict: "",
  error: "",
  busy: false,
  phase: "setup"
};

function aiLives() {
  return "●".repeat(ai.lives) + "○".repeat(Math.max(0, 3 - ai.lives));
}

function aiParse(text) {
  const raw = text.replace(/```json|```/g, "").trim();
  return JSON.parse(raw);
}

async function aiAsk(key) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: aiRubric }] },
      contents: ai.contents,
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json"
      }
    })
  });
  const body = await response.text();
  if (!response.ok) throw new Error(body.slice(0, 320));
  const data = JSON.parse(body);
  const text = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts || [])
    .map((part) => part.text || "")
    .join("");
  if (!text) throw new Error("模型沒有回文字。");
  return aiParse(text);
}

function aiApply(result) {
  const verdict = result.verdict || "weak";
  if (ai.turns > 0) {
    if (verdict === "good") ai.streak = 0;
    if (verdict === "weak") {
      ai.lives -= 1;
      ai.streak = 0;
    }
    if (verdict === "absorb" || verdict === "leak") {
      ai.lives -= 1;
      ai.streak += 1;
    }
  }
  ai.verdict = verdict;
  ai.feedback = result.feedback || "";
  ai.question = result.nextQuestion || "";
  ai.contents.push({ role: "model", parts: [{ text: JSON.stringify(result) }] });
  if (result.done || ai.lives <= 0 || ai.streak >= 2 || ai.turns >= 6) ai.phase = "end";
  else ai.phase = "ask";
}

function aiRender() {
  const app = document.getElementById("app");
  const fileWarning = location.protocol === "file:"
    ? `<p class="err">現在是用檔案網址打開。瀏覽器可能擋住 Gemini。請改用本機網站網址打開這份頁面。</p>`
    : "";

  if (ai.phase === "setup") {
    app.innerHTML = `
      <article class="card">
        <div class="kicker">GEMINI</div>
        <h1>AI 面試</h1>
        <p class="sub">你用自己的話答。模型依界線檢核，再出下一題。金鑰只留在這個分頁。</p>
        ${fileWarning}
        <div class="choices">
          <button data-track="story" class="${ai.track === "story" ? "primary" : ""}">九十秒</button>
          <button data-track="design" class="${ai.track === "design" ? "primary" : ""}">四十五分</button>
          <button data-track="cache" class="${ai.track === "cache" ? "primary" : ""}">快取</button>
          <button data-track="ship" class="${ai.track === "ship" ? "primary" : ""}">上線</button>
        </div>
        <p class="note">Gemini API 金鑰。不會寫進檔案。</p>
        <input id="gemKey" type="password" autocomplete="off" value="">
        <p class="err" id="aiError"></p>
        <div class="choices">
          <button class="primary" id="aiGo">${ai.busy ? "出題中" : "開始"}</button>
          <button id="aiBack">回選擇題</button>
        </div>
      </article>`;
    app.querySelectorAll("button[data-track]").forEach((button) => {
      button.onclick = () => {
        const typed = document.getElementById("gemKey").value;
        ai.track = button.dataset.track;
        aiRender();
        document.getElementById("gemKey").value = typed;
      };
    });
    document.getElementById("aiBack").onclick = () => window.returnToTitle();
    document.getElementById("aiGo").onclick = () => aiBegin();
    document.getElementById("aiError").textContent = ai.error;
    return;
  }

  if (ai.phase === "end") {
    const failed = ai.lives <= 0 || ai.streak >= 2;
    app.innerHTML = `
      <article class="card">
        <div class="kicker">結局</div>
        <h1>${failed ? "界線失守" : "這輪守住了"}</h1>
        <p class="prompt" id="aiEnd"></p>
        <p class="note">生命 ${aiLives()} · ${ai.turns} 答</p>
        <button class="primary" id="aiAgain">再一輪</button>
        <button id="aiBack">回選擇題</button>
      </article>`;
    document.getElementById("aiAgain").onclick = () => startAi();
    document.getElementById("aiBack").onclick = () => window.returnToTitle();
    document.getElementById("aiEnd").textContent = ai.feedback || "問答結束。";
    return;
  }

  const known = { good: "留下", weak: "含糊", absorb: "失守", leak: "失守" };
  const tag = known[ai.verdict] || "";
  const tagClass = ai.verdict === "good" ? "good" : ai.verdict === "weak" ? "weak" : tag ? "bad" : "";
  app.innerHTML = `
    <div class="top">
      <div class="mark">AI 面試</div>
      <div class="stats">
        <span>第 ${ai.turns + 1} 題</span>
        <span class="lives">${aiLives()}</span>
      </div>
    </div>
    <article class="card">
      ${tag ? `<div class="tag ${tagClass}">${tag}</div>` : ""}
      <p class="feedback" id="aiFeedback"></p>
      <p class="prompt" id="aiQuestion"></p>
      <textarea id="answer" placeholder="用自己的話回答"></textarea>
      <p class="err" id="aiError"></p>
      <button class="primary" id="aiSend">${ai.busy ? "檢核中" : "送出"}</button>
    </article>`;
  document.getElementById("aiFeedback").textContent = ai.feedback;
  document.getElementById("aiQuestion").textContent = ai.question;
  document.getElementById("aiError").textContent = ai.error;
  document.getElementById("aiSend").onclick = () => aiAnswer();
}

async function aiBegin() {
  const input = document.getElementById("gemKey");
  const key = input ? input.value.trim() : "";
  if (!key) {
    ai.error = "要有 Gemini API 金鑰才能出題。";
    aiRender();
    return;
  }
  sessionStorage.setItem("geminiKey", key);
  ai.error = "";
  ai.busy = true;
  ai.lives = 3;
  ai.streak = 0;
  ai.turns = 0;
  ai.feedback = "";
  ai.verdict = "";
  ai.contents = [{ role: "user", parts: [{ text: "開始。track=" + ai.track + "。請出第一題。" }] }];
  aiRender();
  try {
    aiApply(await aiAsk(key));
  } catch (error) {
    ai.error = "呼叫 Gemini 失敗。" + error.message;
    ai.phase = "setup";
  }
  ai.busy = false;
  aiRender();
}

async function aiAnswer() {
  const answer = document.getElementById("answer").value.trim();
  if (!answer || ai.busy) return;
  const key = sessionStorage.getItem("geminiKey") || "";
  ai.busy = true;
  ai.error = "";
  ai.turns += 1;
  ai.contents.push({ role: "user", parts: [{ text: answer }] });
  aiRender();
  try {
    aiApply(await aiAsk(key));
  } catch (error) {
    ai.turns -= 1;
    ai.contents.pop();
    ai.error = "這一答沒送成。" + error.message;
  }
  ai.busy = false;
  aiRender();
}

function startAi() {
  ai.phase = "setup";
  ai.error = "";
  ai.busy = false;
  ai.feedback = "";
  ai.verdict = "";
  const saved = sessionStorage.getItem("geminiKey") || "";
  aiRender();
  const input = document.getElementById("gemKey");
  if (input && saved) input.value = saved;
}
