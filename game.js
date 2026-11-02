const storyLevels = [
  {
    id: 1,
    title: "遷移",
    prompt: "週會後，主管在走道把你留下。「下週一把線上全部換上 Java 17、Spring 6、Jakarta 和 Tomcat 10。高層要看進度。」上週的建置還是失敗的。",
    choices: [
      {
        type: "absorb",
        text: "答應下週全部換完，今晚開始一人改完全部模組。",
        feedback: "時程被你自己填滿了。沒有回歸範圍，也沒有一則事後說得清的升級故事。"
      },
      {
        type: "good",
        set: ["hasStory"],
        text: "先恢復建置，再分階段遷移，並書面寫下相容性風險與回歸範圍。",
        feedback: "你留下了可複述的事實：版本、階段、回歸範圍，以及建置如何從失敗回到可重複。"
      },
      {
        type: "weak",
        text: "回覆「風險太高，這次先不要升級」，不提出路徑。",
        feedback: "升級沒有發生，面試時也沒有這則故事可用。"
      }
    ]
  },
  {
    id: 2,
    title: "傳輸中斷",
    prompt: "晚上十點，跨區傳輸中斷。群組裡沒有值班表。訊息只有一句：現在看一下。",
    choices: [
      {
        type: "absorb",
        text: "通宵一個人查完，恢復後自己收尾，不留交接。",
        feedback: "服務暫時回來了，但步驟只在你的螢幕上記得。明天仍是同一個人。"
      },
      {
        type: "good",
        text: "留下檢查順序、恢復時間與交接對象，並請對方書面確認哪項既有工作順延。",
        feedback: "你處理了中斷，也把下一班能接上的順序留下來。非上班時段的優先順序有書面。"
      },
      {
        type: "leak",
        text: "為了快，把內部主機名稱與客戶代號直接貼進群組。",
        feedback: "排查變快了一點。不該公開的識別也跟著出去了。"
      }
    ]
  },
  {
    id: 3,
    title: "沒有規格",
    prompt: "對外 API 還沒有人寫規格。高層直接問你：什麼時候可以對上線？",
    choices: [
      {
        type: "absorb",
        text: "自己補上商業範圍，並承諾一個上線日。",
        feedback: "規格的缺口被你的承諾蓋住。決策與實作變成同一個人。"
      },
      {
        type: "good",
        text: "書面寫明規格負責人不是你，列出欄位、錯誤碼與驗收，規格到位再給時程。",
        feedback: "你沒有替缺席的規格背書。開工條件與時程被拆開了。"
      },
      {
        type: "leak",
        text: "把現有系統的內部介面路徑附進信裡，當作對外規格。",
        feedback: "信送出去了。內部介面被當成可以對外講的契約。"
      }
    ]
  },
  {
    id: 4,
    title: "九十秒",
    prompt: "面試官說：用九十秒講一次你主導的架構升級。",
    choices: [
      {
        type: "good",
        need: "hasStory",
        set: ["held4"],
        text: "只講留下的事實：Java 17、Spring 6、Jakarta、Tomcat 10、分階段與回歸範圍。",
        locked: "當時沒有留下遷移事實。這則故事現在編不出來。",
        feedback: "故事有版本、有行動、有結果，也沒有帶進產品細節。"
      },
      {
        type: "leak",
        text: "補上產品模組、客戶場域與內部介面，讓故事聽起來比較具體。",
        feedback: "面試官聽到了不該離開原處的細節。"
      },
      {
        type: "weak",
        text: "只說你很會解決問題，不提版本與行動。",
        feedback: "態度有了，九十秒裡沒有一件可核對的事實。"
      }
    ]
  },
  {
    id: 5,
    title: "反問",
    prompt: "對方問：你有什麼想了解的？這是你篩團隊的時候。",
    choices: [
      {
        type: "good",
        set: ["held5"],
        text: "問規格由誰簽核、On-call 是否輪替、加班是否另計。",
        feedback: "你在進場前確認了權責、輪替與工時。技術棧留到下一題也來得及。"
      },
      {
        type: "weak",
        text: "只問用哪種雲、哪版框架，然後表示都可以配合。",
        feedback: "技術問題問完了。值班與規格由誰負責，仍然不知道。"
      },
      {
        type: "absorb",
        text: "為了示好，主動說可以一人接手值班，規格未定也能先補上。",
        feedback: "你在面試裡就把界線交出去了。"
      }
    ]
  }
];

const designLevels = [
  {
    id: 1,
    title: "邊界 · 5 分",
    prompt: "面試官說：設計全市圖書館的借還。每天大約幾千筆，近一週查得多，一年以上很少查。團隊只有幾個人。請開始。",
    choices: [
      {
        type: "absorb",
        text: "先畫訊息佇列、容器編排與一排微服務方塊。",
        feedback: "圖先畫滿了。做什麼、不做什麼，以及延遲和一致性誰讓步，都還沒說。"
      },
      {
        type: "good",
        set: ["scoped"],
        text: "先寫範圍：做借還與逾期提醒，不做跨館即時同步、不做推薦。並說明延遲、一致性、可用性不能一次全要。",
        feedback: "任何系統都不能同時拉滿所有指標。先講業務能容忍的延遲與一致性。"
      },
      {
        type: "weak",
        text: "先問對方想用哪家雲、哪版框架。",
        feedback: "工具問完了。範圍與服務水準還是空的。"
      }
    ]
  },
  {
    id: 2,
    title: "容量 · 5 分",
    prompt: "面試官點頭：範圍先這樣。那量級呢？",
    choices: [
      {
        type: "good",
        set: ["estimated"],
        text: "每天幾千筆寫入，讀取先按十倍估。五年總量仍是單庫，現在不需要分庫。",
        feedback: "數字先寫下來，再決定要不要拆。這個量級拆庫只會增加維運。"
      },
      {
        type: "absorb",
        text: "不寫數字，直接說要分庫分表與分散式快取。",
        feedback: "容量沒估，架構已經先變重了。"
      },
      {
        type: "weak",
        text: "只說流量應該不小，細節上場再看。",
        feedback: "沒有數量級，後面的選型就沒有依據。"
      }
    ]
  },
  {
    id: 3,
    title: "契約 · 10 分",
    prompt: "面試官問：介面與資料你怎麼定？",
    choices: [
      {
        type: "good",
        set: ["modeled"],
        text: "先定借、還、查近況。借還表用書與時間的複合索引，併發用樂觀鎖。主鍵用可排序整數，並說明隨機字串留到需要不可猜測時再換。",
        feedback: "契約與索引先於服務數量。主鍵策略是取捨，不是口號。"
      },
      {
        type: "leak",
        text: "把現有系統的內部路徑與表名寫進對外契約。",
        feedback: "內部名稱被當成可以對外講的介面。"
      },
      {
        type: "weak",
        text: "表以後再補，先把服務拆成十二個。",
        feedback: "方塊變多了，一筆借還怎麼存還沒有。"
      }
    ]
  },
  {
    id: 4,
    title: "路徑 · 15 分",
    prompt: "面試官說：畫一張圖。時間還有一刻鐘。",
    choices: [
      {
        type: "good",
        set: ["flowed"],
        text: "只畫一條：讀者、負載均衡、無狀態服務、資料庫。快取與佇列註明量上來才加。",
        feedback: "快樂路徑看得到。還沒需要的元件留在註記，不進第一版。"
      },
      {
        type: "absorb",
        text: "每個方塊都先做：佇列、分散式快取、跨區複本。",
        feedback: "圖很完整。團隊要先養的是這張圖，不是借還本身。"
      },
      {
        type: "weak",
        text: "方塊畫了很多，沒標一筆借還怎麼走完。",
        feedback: "有架構圖，沒有資料流。"
      }
    ]
  },
  {
    id: 5,
    title: "權衡 · 10 分",
    prompt: "面試官問：哪裡會壞？為什麼現在不做得更分散？",
    choices: [
      {
        type: "good",
        set: ["traded"],
        text: "日增幾千筆，單台資料庫配分區與索引就夠。介面預留以後可改，實作先不上訊息佇列。逾期提醒失敗可重試，同一筆不重複通知。",
        feedback: "沒有最好的架構，只有這個量級與這組人養得起的妥協。假設通知會失敗，所以做成可重試。"
      },
      {
        type: "absorb",
        text: "為了以後的百萬量，現在就上訊息佇列、跨區與長交易補償。",
        feedback: "未來的量被提前做成今天的維運。核心瓶頸還沒出現。"
      },
      {
        type: "weak",
        text: "承諾同時做到強一致、很低的延遲，以及四個九的可用性。",
        feedback: "三個指標同時拉滿。沒有說哪個可以讓。"
      }
    ]
  }
];

const cacheLevels = [
  {
    id: 1,
    title: "順序",
    prompt: "面試官問：文章閱讀數放進快取。資料庫更新之後，快取怎麼處理？",
    choices: [
      {
        type: "absorb",
        text: "兩條一起寫：先改快取，再改資料庫，讀取比較快。",
        feedback: "兩次寫入沒有原子性。慢的那次會把舊值留在快取裡，直到過期。"
      },
      {
        type: "good",
        set: ["aside"],
        text: "不更新快取值。資料庫提交成功後刪除這把鍵。",
        feedback: "併發寫入時，更新快取會讓舊值蓋住新值。先刪再更新，又會被同時的讀取把舊值填回去。基準是提交後再刪。這條仍有很窄的交錯，實務上更常壞在刪除失敗，以及從庫把舊值填回。"
      },
      {
        type: "weak",
        text: "先刪快取，更新資料庫，睡幾十毫秒再刪一次。",
        feedback: "這段等待沒有可靠上界。網路、停頓、主從延遲都會讓它不夠或太長。"
      }
    ]
  },
  {
    id: 2,
    title: "刪除失敗",
    prompt: "資料庫已經提交，刪快取時網路斷了。怎麼讓這把鍵最後一定失效？",
    choices: [
      {
        type: "absorb",
        text: "每個寫入點自己抓例外，失敗再送進佇列重試。",
        feedback: "刪除失敗有補上。每個寫入點都要記得做，漏一處就留下髒值。"
      },
      {
        type: "good",
        set: ["relay"],
        text: "應用只提交資料庫。用提交後的日誌變更送出事件，消費者重試刪除，只刪除、不寫回新值。未命中時讀主庫。",
        feedback: "提交成功，日誌裡就有這筆變更。消費者可以重複刪除。若改把新值寫進快取，事件亂序會把舊值寫回去。未命中若讀還沒跟上的從庫，舊值會被填回，直到過期。"
      },
      {
        type: "weak",
        text: "刪失敗就算了，等下次有人再更新。",
        feedback: "下次更新不一定來。髒值會留到過期。"
      }
    ]
  },
  {
    id: 3,
    title: "過期",
    prompt: "刪除與重試都有了。鍵還要不要設過期時間？",
    choices: [
      {
        type: "good",
        set: ["ttl"],
        text: "每把鍵都設過期。這只讓最壞情況會自己收斂，不取代刪除。",
        feedback: "過期是未知故障的底線。窗口裡仍可能是舊值。設太短，讀取會全部打回資料庫。"
      },
      {
        type: "absorb",
        text: "不過期。刪除路徑已經保證成功。",
        feedback: "刪除、日誌、消費者都可能停。沒有過期，髒值沒有終點。"
      },
      {
        type: "weak",
        text: "設成一秒，這樣就幾乎是強一致。",
        feedback: "短過期只是讓舊值早点消失，中間那段仍然是舊的，資料庫也被打得更兇。"
      }
    ]
  },
  {
    id: 4,
    title: "強一致",
    prompt: "面試官改口：如果是帳戶餘額，一秒的舊值都不能接受呢？",
    choices: [
      {
        type: "good",
        set: ["direct"],
        text: "餘額不進快取。直接讀寫資料庫，用列鎖或版本檢查。閱讀數可以接受短暫舊值，餘額不行。",
        feedback: "強一致的數字留在資料庫事務裡。快取解決的是可容忍延遲的讀取，不是餘額。"
      },
      {
        type: "absorb",
        text: "用分散式讀寫鎖把讀寫串起來，餘額也放快取。",
        feedback: "鎖把訪問串行化了。多一層快取，少了快取的吞吐，通常不值得。"
      },
      {
        type: "weak",
        text: "把過期縮到幾百毫秒，當作強一致。",
        feedback: "幾百毫秒裡仍是舊餘額。這不構成強一致。"
      }
    ]
  }
];

const state = {
  mode: "story",
  lives: 3,
  streak: 0,
  hasStory: false,
  held4: false,
  held5: false,
  scoped: false,
  estimated: false,
  modeled: false,
  flowed: false,
  traded: false,
  aside: false,
  relay: false,
  ttl: false,
  direct: false,
  index: 0,
  phase: "title",
  last: null,
  ending: "",
  history: []
};

function deck() {
  if (state.mode === "design") return designLevels;
  if (state.mode === "cache") return cacheLevels;
  return storyLevels;
}

function mark() {
  if (state.mode === "design") return "四十五分";
  if (state.mode === "cache") return "快取";
  return "九十秒";
}

const app = document.getElementById("app");

function livesText() {
  return "●".repeat(state.lives) + "○".repeat(Math.max(0, 3 - state.lives));
}

function header() {
  if (state.phase === "title") return "";
  const level = deck()[state.index];
  return `
    <div class="top">
      <div class="mark">${mark()}</div>
      <div class="stats">
        <span>第 ${state.index + 1} / ${deck().length} 關 · ${level.title}</span>
        <span class="lives" aria-label="生命 ${state.lives}">${livesText()}</span>
      </div>
    </div>`;
}

function endingKind() {
  if (state.lives <= 0 || state.streak >= 2) return "fail";
  if (state.mode === "design") {
    if (state.scoped && state.estimated && state.modeled && state.flowed && state.traded) return "win";
    return "incomplete";
  }
  if (state.mode === "cache") {
    if (state.aside && state.relay && state.ttl && state.direct) return "win";
    return "incomplete";
  }
  if (state.hasStory && state.held4 && state.held5) return "win";
  return "incomplete";
}

const storyScript = "線上後端要升到 Java 17、Spring 6、Jakarta 與 Tomcat 10，當時建置是失敗的。我先把建置恢復成可重複，再分階段處理命名空間與依賴相容，並書面留下相容性風險與回歸範圍。升級路徑說得清楚，時程也沒有一次填滿。";

const questionCard = [
  "對外契約由誰撰寫、誰簽核？",
  "On-call 是否輪替，結束後有沒有補休？",
  "加班是否另計，還是預設由同一人補上？"
];

const designOutline = "先收斂：做借還與逾期提醒，不做跨館即時同步與推薦。延遲、一致性、可用性先排優先。每天幾千筆、讀取按寫入十倍估，五年仍是單庫。介面先三個：借、還、查近況；複合索引與樂觀鎖夠用。圖只畫讀者、負載均衡、無狀態服務、資料庫。量級不夠就不上佇列與分散式快取；介面預留演進，逾期提醒失敗可重試且不重複通知。";

const cacheOutline = "閱讀數用旁路快取：資料庫提交後刪除，不在寫入時更新快取。刪除失敗不靠每個業務點重試，而靠提交後的日誌變更；消費者只刪除，可以重複做。未命中讀主庫。每把鍵有過期時間，只作為最終一致的底線。餘額不進快取，用資料庫的鎖或版本。";

function endingCopy(kind) {
  if (kind === "win" && state.mode === "design") {
    return ["可帶走", "下面這段按五步講。題目是圖書館借還，不帶任何既有產品。"];
  }
  if (kind === "win" && state.mode === "cache") {
    return ["可帶走", "下面這段按一致性分層講。閱讀數可以舊一下，餘額不行。"];
  }
  if (kind === "win") {
    return ["可帶走", "下面這則講稿可以進面試。產品內容留在原處。"];
  }
  if (kind === "fail") {
    return ["界線失守", state.streak >= 2
      ? "連續兩次把工作或細節全包下來。遊戲在這裡停下。"
      : "生命用完了。今天不再進下一關。"];
  }
  if (state.mode === "design") {
    return ["流程走完", "五步走完了。缺的步驟寫在下面。"];
  }
  if (state.mode === "cache") {
    return ["流程走完", "四問走完了。缺的判斷寫在下面。"];
  }
  return ["流程走完", "五關都結束了。缺的項目寫在下面，下一輪補上那一項即可。"];
}

function gaps() {
  if (state.mode === "design") {
    const items = [];
    if (!state.scoped) items.push("缺邊界：先寫做什麼、不做什麼，以及哪個指標讓步。");
    if (!state.estimated) items.push("缺容量：先寫每天筆數與讀寫比，再決定要不要拆。");
    if (!state.modeled) items.push("缺契約：先定借、還、查近況，以及索引與鎖。");
    if (!state.flowed) items.push("缺路徑：只畫一條從讀者到資料庫的快樂路徑。");
    if (!state.traded) items.push("缺權衡：這個量級用單庫、分區與索引，不上分散式。");
    return items;
  }
  if (state.mode === "cache") {
    const items = [];
    if (!state.aside) items.push("缺順序：提交資料庫後刪除，不要更新快取值，也不要靠睡一段再刪。");
    if (!state.relay) items.push("缺可靠刪除：用提交後的日誌變更重試刪除，未命中讀主庫。");
    if (!state.ttl) items.push("缺過期：每把鍵都要有終點，但不能拿短過期假裝強一致。");
    if (!state.direct) items.push("缺邊界：餘額留在資料庫，不進快取。");
    return items;
  }
  const items = [];
  if (!state.hasStory) items.push("缺遷移故事：關卡 1 要留下分階段與回歸範圍。");
  else if (!state.held4) items.push("故事留過，但面試沒有只用那些事實。");
  if (!state.held5) items.push("缺反問：要問到簽核、輪替，以及加班是否另計。");
  return items;
}

function takeawayHtml() {
  const blocks = [];
  const designWin = state.scoped && state.estimated && state.modeled && state.flowed && state.traded;
  if (state.mode === "design" && designWin) {
    blocks.push(`<h2>四十五分鐘大綱</h2><p class="script" id="script">${designOutline}</p><button id="copy">複製大綱</button>`);
  }
  const cacheWin = state.aside && state.relay && state.ttl && state.direct;
  if (state.mode === "cache" && cacheWin) {
    blocks.push(`<h2>快取一致性口訣</h2><p class="script" id="script">${cacheOutline}</p><button id="copy">複製口訣</button>`);
  }
  if (state.mode === "story" && state.hasStory && state.held4) {
    blocks.push(`<h2>九十秒講稿</h2><p class="script" id="script">${storyScript}</p><button id="copy">複製講稿</button>`);
  }
  if (state.mode === "story" && state.held5) {
    blocks.push(`<h2>篩團隊的三題</h2><ol class="questions">${questionCard.map((q) => `<li>${q}</li>`).join("")}</ol>`);
  }
  const missing = gaps();
  if (missing.length) {
    blocks.push(`<h2>還缺</h2><ul class="end-list">${missing.map((item) => `<li>${item}</li>`).join("")}</ul>`);
  }
  if (state.history.length) {
    const label = { good: "留下", weak: "含糊", absorb: "失守", leak: "失守" };
    blocks.push(`<h2>各關結果</h2><ul class="end-list">${state.history.map((item) => `<li>${item.title}：${label[item.type]}</li>`).join("")}</ul>`);
  }
  return blocks.join("");
}

function render() {
  if (state.phase === "title") {
    app.innerHTML = `
      <article class="card">
        <div class="kicker">SIDE PROJECT</div>
        <h1>九十秒</h1>
        <p class="sub">三種面試練習。生命 3。連續兩次失守即結束。</p>
        <div class="choices">
          <button class="primary" id="start">九十秒：職場與故事</button>
          <button id="design">四十五分：系統設計</button>
          <button id="cache">快取：雙寫一致性</button>
        </div>
        <ul class="rules">
          <li>九十秒：分階段遷移、留下交接、規格不到位就不承諾日期。通關要有故事、面試界線、反問界線。</li>
          <li>四十五分：先問範圍與量級，再畫一條路徑，最後講為什麼現在不堆架構。題目是圖書館借還。</li>
          <li>快取：提交後刪除，用日誌變更重試，未命中讀主庫，過期兜底。餘額不進快取。</li>
        </ul>
      </article>`;
    document.getElementById("start").onclick = () => begin("story");
    document.getElementById("design").onclick = () => begin("design");
    document.getElementById("cache").onclick = () => begin("cache");
    return;
  }

  if (state.phase === "end") {
    const [title, body] = endingCopy(state.ending);
    app.innerHTML = `
      ${header()}
      <article class="card">
        <div class="kicker">結局</div>
        <h1>${title}</h1>
        <p class="prompt">${body}</p>
        ${takeawayHtml()}
        <button class="primary" id="again">再玩一次</button>
      </article>`;
    document.getElementById("again").onclick = () => {
      state.phase = "title";
      render();
    };
    const copy = document.getElementById("copy");
    if (copy) {
      copy.onclick = async () => {
        try {
          const text = state.mode === "design" ? designOutline : state.mode === "cache" ? cacheOutline : storyScript;
        await navigator.clipboard.writeText(text);
          copy.textContent = "已複製";
        } catch (error) {
          copy.textContent = "請直接選取講稿";
        }
      };
    }
    return;
  }

  const level = deck()[state.index];
  if (state.phase === "feedback") {
    const tag = state.last.type === "good" ? "good" : state.last.type === "weak" ? "weak" : "bad";
    const label = state.last.type === "good" ? "留下" : state.last.type === "weak" ? "含糊" : "失守";
    app.innerHTML = `
      ${header()}
      <article class="card">
        <div class="tag ${tag}">${label}</div>
        <p class="feedback">${state.last.feedback}</p>
        <button class="primary" id="next">${state.index === deck().length - 1 ? "看結局" : "下一關"}</button>
      </article>`;
    document.getElementById("next").onclick = () => {
      if (state.index === deck().length - 1) {
        state.ending = endingKind();
        state.phase = "end";
      } else {
        state.index += 1;
        state.phase = "level";
      }
      render();
    };
    return;
  }

  const choices = level.choices.map((choice) => {
    if (choice.need && !state[choice.need]) {
      return {
        ...choice,
        type: "weak",
        text: choice.locked,
        set: [],
        feedback: "沒有留下遷移事實，這則九十秒編不出可核對的版本與階段。"
      };
    }
    return choice;
  });

  app.innerHTML = `
    ${header()}
    <article class="card">
      <p class="prompt">${level.prompt}</p>
      <div class="choices">
        ${choices.map((choice, i) => `<button data-i="${i}">${choice.text}</button>`).join("")}
      </div>
    </article>`;

  app.querySelectorAll("button[data-i]").forEach((button) => {
    button.onclick = () => choose(choices[Number(button.dataset.i)]);
  });
}

function choose(choice) {
  if (choice.set) choice.set.forEach((key) => { state[key] = true; });
  if (choice.type === "good") state.streak = 0;
  if (choice.type === "absorb" || choice.type === "leak") {
    state.lives -= 1;
    state.streak += 1;
  }
  if (choice.type === "weak") {
    state.lives -= 1;
    state.streak = 0;
  }
  state.last = choice;
  state.history.push({ title: deck()[state.index].title, type: choice.type });
  if (state.streak >= 2 || state.lives <= 0) {
    state.ending = "fail";
    state.phase = "end";
  } else {
    state.phase = "feedback";
  }
  render();
}

function begin(mode) {
  Object.assign(state, {
    mode,
    lives: 3,
    streak: 0,
    hasStory: false,
    held4: false,
    held5: false,
    scoped: false,
    estimated: false,
    modeled: false,
    flowed: false,
    traded: false,
    aside: false,
    relay: false,
    ttl: false,
    direct: false,
    index: 0,
    phase: "level",
    last: null,
    ending: "",
    history: []
  });
  render();
}

render();
