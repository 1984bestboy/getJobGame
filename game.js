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

function dig(prompt, choices) {
  return { prompt, choices };
}

function line(type, text, feedback, followOrExtra, extra) {
  const isFollow = followOrExtra && followOrExtra.prompt;
  const follow = isFollow ? followOrExtra : null;
  const more = isFollow ? extra : followOrExtra;
  return Object.assign({ type, text, feedback }, follow ? { follow } : {}, more || {});
}

function bindFollows(levels, table) {
  levels.forEach((level) => {
    const rows = table[level.id];
    if (!rows) return;
    rows.forEach((follow, index) => {
      if (follow && level.choices[index]) level.choices[index].follow = follow;
    });
  });
}

bindFollows(storyLevels, {
  1: [
    dig("主管問：那你今晚改完，明天誰驗收？", [
      line("good", "停下來。先寫回歸範圍，不把驗收也收成自己的夜班。", "你把被自己填滿的時程收回來了。",
        dig("主管說：高層明天要一個日期。", [
          line("good", "給階段日期，不給全部換完的日期。", "日期對得上範圍，沒有再把整次升級包下來。"),
          line("weak", "先報下週一，再私下補風險。", "口頭日期又跑在書面範圍前面。")
        ])),
      line("absorb", "我改完也自己驗完再上。", "驗收一起包下來，明天仍然沒有第二個人。")
    ]),
    dig("面試官接話：分階段的第一段，你實際做了什麼？", [
      line("good", "先讓建置從失敗回到可重複，再移命名空間。不講產品模組。", "追問仍停在版本、階段與回歸範圍。",
        dig("那回歸範圍誰確認？", [
          line("good", "相容性與關鍵路徑寫成書面，由規格負責人確認。", "範圍有人簽字，不是自己一人宣布完成。"),
          line("absorb", "我自己看過就算回歸完成。", "範圍又回到同一個人。")
        ])),
      line("leak", "補上某個內部服務與資料表，讓第一段聽起來比較具體。", "追問一開，產品細節就出去了。", { clear: ["hasStory"] })
    ]),
    dig("主管問：這次完全不做，建置失敗要放到什麼時候？", [
      line("good", "大版本這次不做，但先把建置修到可重複，並寫下下一步。", "你沒有升級故事，但留下了可接的下一步。"),
      line("weak", "維持現狀，沒有下一步。", "拒絕之後仍然沒有路徑。")
    ])
  ],
  2: [
    dig("隔天對方問：你昨晚查了什麼？", [
      line("good", "補上檢查順序、恢復時間、交接對象，並補優先順序的書面。", "夜裡沒留下的順序，白天補上了。"),
      line("absorb", "叫他們看紀錄，步驟還是只在我這裡。", "追問之後，交接仍然沒有發生。")
    ]),
    dig("對方說：書面確認等明天，你現在就先做完。", [
      line("good", "先做檢查與交接。哪項工作順延，仍等書面。", "你沒有為了今晚把優先順序也決定掉。",
        dig("交接寫到哪裡就夠？", [
          line("good", "順序、時間、下一步誰看。不寫內部主機與客戶代號。", "下一班接得上，識別沒有跟著出去。"),
          line("leak", "把主機名稱寫進交接，下一班比較快。", "交接變成另一份不該公開的名單。")
        ])),
      line("absorb", "那我今晚全部做完，明天再補書面。", "書面被你自己的通宵取代了。")
    ]),
    dig("主管說：那些代號已經在群組裡了，要不要收回？", [
      line("good", "說明哪些識別不該出現，請限制這則訊息，之後只留檢查順序。", "你把已經出去的識別當成事故，不是加速手段。"),
      line("leak", "既然出了就繼續貼，比較快。", "追問之後，識別繼續擴散。")
    ])
  ],
  3: [
    dig("高層追問：這個日期是規格簽了，還是你估的？", [
      line("good", "收回日期。寫明缺規格負責人、欄位、錯誤碼與驗收。", "追問把你估的日期和已簽的規格分開了。"),
      line("weak", "說日期是技術估計，商業範圍我先補。", "範圍仍由你補上。")
    ]),
    dig("對方說：你把缺的欄位列出來，我們就當規格用。", [
      line("good", "清單是開工條件，不是規格。時程仍等負責人簽。", "你沒有讓一份缺口清單變成契約。",
        dig("如果負責人這週不簽呢？", [
          line("good", "沒有簽核就沒有對上線的日期。可以做不依賴契約的準備。", "等待被說清楚，日期沒有偷偷填上。"),
          line("absorb", "先照我列的做，簽核補在上線後。", "你又把缺席的簽核補上了。")
        ])),
      line("absorb", "那這份清單就是規格，我依它承諾日期。", "開工條件被你說成已簽的契約。")
    ]),
    dig("面試官問：你剛說的內部路徑，可以寫進履歷嗎？", [
      line("good", "不可以。對外只留「規格未簽就不承諾日期」。", "追問把內部路徑收回來了。"),
      line("leak", "可以，這樣比較具體。", "同一條路徑又被你送到另一個場合。")
    ])
  ],
  4: [
    dig("面試官說：再具體一點，改了哪些模組？", [
      line("good", "只補階段與回歸範圍，不講模組、客戶、內部介面。", "具體停在可核對的事實。",
        dig("結果用什麼衡量？", [
          line("good", "建置可重複，回歸範圍有書面。不借用別人的營運數字。", "結果仍是你留得下的事實。"),
          line("weak", "說上線很順利，沒有可核對的範圍。", "九十秒最後變成一句評價。", { clear: ["held4"] })
        ])),
      line("leak", "點名模組與內部介面。", "追問要的具體，被你答成不該帶走的細節。", { clear: ["held4"] })
    ]),
    dig("面試官說：那些內部介面怎麼呼叫？", [
      line("good", "停下。改回版本、階段與回歸範圍。", "你把已經偏掉的故事拉回可說的事實。"),
      line("leak", "繼續講呼叫方式與客戶場域。", "第二層仍在產品細節裡。")
    ]),
    dig("面試官說：九十秒裡我需要一件事實。", [
      line("good", "改講版本、階段與回歸範圍。", "態度收成可核對的事實。", { need: "hasStory", set: ["held4"], locked: "沒有留下遷移事實，這層也補不出版本與階段。" }),
      line("weak", "再說一次你很會解決問題。", "追問要事實，你又給了態度。")
    ])
  ],
  5: [
    dig("對方只回答：框架我們用得算新。輪替呢？", [
      line("good", "再問一次：誰簽規格、值班是否輪替、加班是否另計。", "技術答案沒有把篩選問題帶過。",
        dig("對方說：值班是自願，加班看專案。", [
          line("good", "把這兩句記成尚未有輪替與另計，不在面試裡答應補位。", "你聽到了沒有制度，也沒有當場補上。"),
          line("absorb", "說自願我可以先接下。", "追問最後，界線還是交出去了。", { clear: ["held5"] })
        ])),
      line("weak", "聽到框架就說可以配合。", "你要問的三件事情被一個技術答案蓋過去。", { clear: ["held5"] })
    ]),
    dig("你還想問技術以外的事嗎？", [
      line("good", "補問簽核、輪替，以及加班是否另計。", "技術問題之後，你把篩選補上了。", { set: ["held5"] }),
      line("weak", "再問一個雲端服務的名稱。", "追問仍停在工具。")
    ]),
    dig("對方說：太好了，那值班從你開始。", [
      line("good", "收回。值班要有輪替與書面，規格未定不先補。", "示好的那句被你收回來了。"),
      line("absorb", "答應下週就排班。", "追問把口頭示好變成了開始日期。")
    ])
  ]
});

bindFollows(designLevels, {
  1: [
    dig("面試官說：這些方塊各自解決什麼現在的問題？", [
      line("good", "收回圖。先寫做與不做，以及哪個指標讓步。", "方塊先讓位給範圍。", { set: ["scoped"] }),
      line("absorb", "每個方塊都先留著，以後用得到。", "追問沒有讓圖變小。")
    ]),
    dig("延遲和一致性，你讓哪一個？", [
      line("good", "借還以資料庫提交為準。逾期提醒可以晚一分鐘，不能為了快把帳記錯。", "你指出了哪一個可以讓。",
        dig("跨館即時同步為什麼不做？", [
          line("good", "每天幾千筆，即時同步的維運比漏一次同步更大。", "不做的理由是現在的量與人力。"),
          line("absorb", "那還是做，免得以後重寫。", "剛剛劃出的範圍又被加回來。", { clear: ["scoped"] })
        ])),
      line("weak", "兩個都要最好。", "追問仍沒有取捨。", { clear: ["scoped"] })
    ]),
    dig("雲與框架先放下。這個系統第一版做什麼？", [
      line("good", "借還與逾期提醒。不做推薦，也不做跨館即時同步。", "工具問題被你拉回範圍。", { set: ["scoped"] }),
      line("weak", "看他們現在用什麼，我就配合。", "第一版仍然是空的。")
    ])
  ],
  2: [
    dig("十倍讀取是哪裡來的？", [
      line("good", "是假設，用來判斷單庫夠不夠。上線後用真實比例改。", "估計被你標成假設，不是事實。",
        dig("五年後如果變成一百倍呢？", [
          line("good", "現在不拆。介面留可改，量真的上去再加讀取路徑。", "未來的倍數沒有變成今天的架構。"),
          line("absorb", "現在就按一百倍設計。", "假設的增長被提前做成系統。", { clear: ["estimated"] })
        ])),
      line("weak", "就當大家都這樣估。", "數字沒有來源，也沒有修訂方式。")
    ]),
    dig("你準備分多少庫？依據是哪一個數字？", [
      line("good", "說不出數字就不分。回到每天幾千筆，讀取先按十倍。", "拆分被一個數量級擋下來。", { set: ["estimated"] }),
      line("absorb", "先分四庫，數字以後補。", "庫的數量仍比筆數先出現。")
    ]),
    dig("給我一個每天的筆數，就算是假設。", [
      line("good", "每天幾千筆寫入，讀取先按十倍。", "追問逼出了數量級。", { set: ["estimated"] }),
      line("weak", "還是只能說不小。", "第二問仍然沒有數字。")
    ])
  ],
  3: [
    dig("樂觀鎖衝突時，你回什麼？", [
      line("good", "回可重試的衝突，不覆蓋別人的借還。", "鎖的失敗有一個對外說得清的結果。",
        dig("為什麼主鍵不用難猜的隨機字串？", [
          line("good", "這個量級用可排序整數更好寫入。需要不可猜測再換。", "主鍵是取捨，不是同時做兩套。"),
          line("weak", "兩個都做，比較安全。", "追問又把兩套主鍵都留了下來。")
        ])),
      line("leak", "把內部表名放進錯誤訊息。", "衝突回應帶出了內部名稱。", { clear: ["modeled"] })
    ]),
    dig("這些內部路徑，對外文件還留著嗎？", [
      line("good", "拿掉。契約只留借、還、查近況。", "追問把內部路徑從契約拿掉了。"),
      line("leak", "留著，對方對得到現有系統。", "對外文件仍指向內部。")
    ]),
    dig("十二個服務裡，借一本書要經過幾個？", [
      line("good", "先收成一個服務、三個介面。", "服務數量被一筆借閱收斂了。", { set: ["modeled"] }),
      line("weak", "以後再畫資料流。", "追問之後仍然沒有路徑。")
    ])
  ],
  4: [
    dig("快取你說以後再加。什麼數字會讓你真的加？", [
      line("good", "讀取延遲或資料庫負載過了這組人養得起的線，再加。現在不進主路徑。", "以後再加有一個條件，不是口頭保留。",
        dig("負載均衡後面為什麼是無狀態？", [
          line("good", "借還的事實在資料庫。服務重啟不帶走唯一狀態。", "無狀態對應的是事實放在哪裡。"),
          line("weak", "狀態放進程裡比較快。", "快取式的快，把唯一狀態放進了進程。", { clear: ["flowed"] })
        ])),
      line("absorb", "還是畫上去，開開關就好。", "註明以後再加，又被畫進第一版。", { clear: ["flowed"] })
    ]),
    dig("這三個方塊，拿掉一個，明天還能借書嗎？", [
      line("good", "能。留下讀者、負載均衡、無狀態服務、資料庫。", "拿掉之後，主路徑還在。", { set: ["flowed"] }),
      line("absorb", "不能，三個都是第一天要的。", "追問沒有讓任何方塊離開第一版。")
    ]),
    dig("用一句話說，一筆借閱從哪裡到哪裡。", [
      line("good", "讀者到負載均衡，到無狀態服務，到資料庫。", "圖被你收成一條路徑。", { set: ["flowed"] }),
      line("weak", "看圖上的箭頭。", "追問要的那一句還沒有。")
    ])
  ],
  5: [
    dig("逾期提醒如果送出兩次呢？", [
      line("good", "同一筆在窗口內只通知一次，失敗可以再試。", "重試沒有變成重複通知。",
        dig("什麼情況你會把訊息佇列加回來？", [
          line("good", "寫入慢到單庫與索引不夠，而且團隊養得起那個元件。現在不是。", "加回來有條件，不是預先畫上。"),
          line("absorb", "設計圖先畫上，比較完整。", "條件被完整性取代了。", { clear: ["traded"] })
        ])),
      line("absorb", "送兩次，讓對方一定看到。", "提醒的失敗被你用重複送出來補。", { clear: ["traded"] })
    ]),
    dig("今天的瓶頸是哪一個數字？", [
      line("good", "每天幾千筆，瓶頸還不在佇列。回到單庫、分區與索引。", "未來的架構被今天的筆數擋下。", { set: ["traded"] }),
      line("absorb", "瓶頸是以後的百萬。", "數字仍在現在還不存在的規模上。")
    ]),
    dig("三個指標你願意讓哪一個？", [
      line("good", "逾期提醒的延遲可以讓。借還的提交不可以讓。", "追問終於有一個讓步。", { set: ["traded"] }),
      line("weak", "看預算，三個都盡量。", "三個指標仍一起拉滿。")
    ])
  ]
});

bindFollows(cacheLevels, {
  1: [
    dig("兩個寫入只有一個成功時，讀者看到什麼？", [
      line("good", "可能看到舊值。所以不更新快取，資料庫提交後再刪除。", "失敗的那一次被你說成舊值，不是再蓋一次。", { set: ["aside"] }),
      line("absorb", "再寫一次快取，把新值蓋回去。", "追問之後仍是兩次寫入在競速。")
    ]),
    dig("提交後再刪，還有沒有機會留下舊值？", [
      line("good", "有。刪除可能失敗，未命中也可能讀到還沒跟上的從庫。", "你把日常會發生的兩件事說在理論交錯前面。",
        dig("那條很窄的讀寫交錯，你怎麼帶過？", [
          line("good", "點到即可。時間留給刪除失敗與從庫回填。", "窄的那條沒有佔掉回答。"),
          line("weak", "把時間花在證明那條交錯不會發生。", "常見的失敗被你放掉了。")
        ])),
      line("weak", "幾乎沒有，因為寫入比讀取慢。", "你把少見的理由說成不會發生。")
    ]),
    dig("這段等待要蓋過什麼？", [
      line("good", "蓋不過主從延遲與停頓。改成提交後刪除。", "經驗值被你收回了。", { set: ["aside"] }),
      line("weak", "抓個經驗值，例如五百毫秒。", "第二個數字仍然沒有上界。")
    ])
  ],
  2: [
    dig("新加一個寫入點時，誰保證它有重試？", [
      line("good", "不靠記得。提交後的日誌裡有這筆變更，消費者負責刪除。", "新的寫入點不必再接一次重試。", { set: ["relay"] }),
      line("absorb", "靠檢查清單，上線前看過。", "保證仍靠人記得。")
    ]),
    dig("消費者為什麼只刪除，不寫入新值？", [
      line("good", "刪除可以重複做。寫入新值會在事件亂序時把舊值蓋回去。", "你把亂序說成不寫入新值的理由。",
        dig("未命中為什麼不讀從庫？", [
          line("good", "從庫可能還沒有這次提交。舊值再填回，會留到過期。", "回填的來源被你限定在主庫。"),
          line("weak", "從庫可以分攤讀取，這比較重要。", "分攤讀取把舊值又填了回去。", { clear: ["relay"] })
        ])),
      line("leak", "順便把新值寫進快取，少一次回源。", "消費者又變成另一次更新快取。", { clear: ["relay"] })
    ]),
    dig("如果下一次更新要等一天呢？", [
      line("good", "舊值會留一天。改由日誌變更重試刪除。", "等待下一次更新被你換成可靠刪除。", { set: ["relay"] }),
      line("weak", "閱讀數舊一天可以接受，所以不用補。", "可接受的延遲被你說成不必刪除。")
    ])
  ],
  3: [
    dig("過期設太短會怎樣？", [
      line("good", "讀取打回資料庫。過期只是髒值的終點，不是一致性本身。", "短過期的代價被你說出來了。",
        dig("刪除已經會成功，為什麼還要過期？", [
          line("good", "日誌、消費者、網路都會停。沒有過期，髒值沒有終點。", "過期被放在刪除失敗之後，不是拿來取代刪除。"),
          line("absorb", "那就把過期拿掉，少一次回收。", "終點被你拿掉了。", { clear: ["ttl"] })
        ])),
      line("weak", "設短一點就比較接近強一致。", "短過期又被說成強一致。", { clear: ["ttl"] })
    ]),
    dig("消費者停了一小時，這把鍵會怎樣？", [
      line("good", "沒有過期就一直是舊的。補上過期當終點。", "停擺的那一小時有了終點。", { set: ["ttl"] }),
      line("absorb", "消費者恢復後會刪，期間舊的也可以。", "期間被你說成不必有終點。")
    ]),
    dig("這一秒裡，餘額可以是舊的嗎？", [
      line("good", "不可以。短過期不是強一致。閱讀數才用過期當終點。", "你把閱讀數的終點和餘額分開了。", { set: ["ttl"] }),
      line("weak", "一秒可以當作夠即時。", "餘額仍被一個短窗口蓋過去。")
    ])
  ],
  4: [
    dig("庫存扣減呢？", [
      line("good", "跟餘額一樣，不進快取。用資料庫的鎖或版本。", "另一個不能舊的數字，你用同一條界線擋下。",
        dig("版本號能取代刪除失敗的那段窗口嗎？", [
          line("good", "不能。它只能拒絕較舊的覆寫。刪除沒發生時，舊值還在。", "版本號的界限被你說清了。"),
          line("weak", "能。比較新的版本蓋過去就好。", "刪除失敗的窗口被你說成版本能補。", { clear: ["direct"] })
        ])),
      line("absorb", "庫存讀很多，還是放快取，再加分散式鎖。", "不能舊的數字又進了快取。", { clear: ["direct"] })
    ]),
    dig("鎖住之後，快取還省到什麼？", [
      line("good", "省不到併發。餘額改回資料庫。", "串行化之後，快取這一層被你拿掉了。", { set: ["direct"] }),
      line("absorb", "還是少打一點資料庫。", "鎖與快取仍疊在一起。")
    ]),
    dig("幾百毫秒內如果扣了兩次款呢？", [
      line("good", "第二次可能看到舊餘額。所以餘額不進快取。", "短窗口裡的兩次扣款被你當成不能接受。", { set: ["direct"] }),
      line("weak", "窗口很短，實務上可以。", "兩次扣款仍落在舊餘額上。")
    ])
  ]
});

const shipLevels = [
  {
    id: 1,
    title: "約定",
    prompt: "面試官擦掉半張圖。舊支付還在扣款。六個人、三十天，不能停機，也不能扣兩次。你從哪裡開始？",
    choices: [
      {
        type: "absorb",
        text: "先改識別碼。今晚就把新欄位設成必填。",
        feedback: "舊列還沒有這欄。必填會讓正在跑的寫入失敗。"
      },
      {
        type: "good",
        set: ["invariants"],
        text: "先寫不能打破的約定：一筆邏輯支付只對一個穩定識別碼，重試不能再扣，結果不明走對帳。",
        feedback: "上線順序排在業務契約後面。圖先讓位給不能扣錯的三句。"
      },
      {
        type: "weak",
        text: "先把新架構圖再畫完整。",
        feedback: "圖更完整了。正在處理的那一筆扣款還沒有主人。"
      }
    ]
  },
  {
    id: 2,
    title: "擴欄",
    prompt: "識別碼要改，舊資料沒有這欄。你怎麼改表？",
    choices: [
      {
        type: "good",
        set: ["expanded"],
        text: "先加可空欄，程式同時讀新舊，補歷史，再加限制，最後才拿掉舊欄。索引用並行建立，並限制等鎖時間。",
        feedback: "變更可以重跑，舊程式在限制加上之前仍讀得動。"
      },
      {
        type: "absorb",
        text: "直接加必填和唯一索引，一次切過去。",
        feedback: "空值與建索引的鎖會撞上正在寫入的支付。"
      },
      {
        type: "weak",
        text: "約一個停機窗，把表鎖住改完。",
        feedback: "停機仍有已送出、結果還沒回來的扣款。鎖表沒有回答它們。"
      }
    ]
  },
  {
    id: 3,
    title: "雙寫",
    prompt: "新舊系統都要知道這筆支付。你怎麼同步？",
    choices: [
      {
        type: "good",
        set: ["outbox"],
        text: "同一筆資料庫交易寫下支付與待送事件，再由轉送程式送到佇列。消費端用事件識別碼去掉重複。",
        feedback: "提交成功就留有待送紀錄。重送是預期，所以消費端要認得同一筆。"
      },
      {
        type: "absorb",
        text: "資料庫提交後立刻送佇列，失敗再重試。",
        feedback: "兩次寫入沒有原子性。提交之後、送出之前的失敗會讓下游不知道這筆支付。"
      },
      {
        type: "leak",
        text: "把內部帳號路徑和客戶代號放進事件，讓下游好對。",
        feedback: "對帳需要的是支付識別碼與狀態，不是另一份內部名單。"
      }
    ]
  },
  {
    id: 4,
    title: "切換",
    prompt: "新舊消費者都能呼叫會扣款的第三方。你怎麼切？",
    choices: [
      {
        type: "good",
        set: ["cutover"],
        text: "同一筆只有一個所有者。切之前寫好退回：新消費者停，所有權還給舊的。不明結果不由兩邊各判一次。",
        feedback: "有副作用的呼叫不並行。退回路徑在放量之前就寫下來。"
      },
      {
        type: "absorb",
        text: "新舊一起消費，誰先成功算誰。",
        feedback: "兩邊都可能去扣。事後對帳補不回已經扣出的第二次。"
      },
      {
        type: "weak",
        text: "先切百分之十，失敗再看。",
        feedback: "百分之十裡的逾時仍然是不明結果。沒有所有權，比例只是縮小同一個問題。"
      }
    ]
  },
  {
    id: 5,
    title: "沉默",
    prompt: "三十天裡，財務與風控要看風險。會上有人一直說沒問題，也不補充。",
    choices: [
      {
        type: "good",
        set: ["spoken"],
        text: "把沉默當成還沒看到風險，不是同意。問進行中的扣款、對帳差異、誰可以喊停。檢查每週給財務、風控和值班看。",
        feedback: "沒問題不是訊號。反對要有地方落地，不明結果要有人看得懂。"
      },
      {
        type: "absorb",
        text: "他最熟系統。沒說話就是沒風險，照計畫全量切。",
        feedback: "熟悉被你聽成通過。缺口要等他以後自己說。"
      },
      {
        type: "weak",
        text: "會後私訊問一次還好嗎。",
        feedback: "還好嗎、還好。這次私訊沒有問到任何一筆進行中的扣款。"
      }
    ]
  }
];

bindFollows(shipLevels, {
  1: [
    dig("舊列沒有冪等鍵。必填欄位會怎樣？", [
      line("good", "先停。沒有鍵的舊列會讓變更失敗，或擋住正在寫入的支付。", "必填被你從第一步拿掉了。", { set: ["invariants"] }),
      line("absorb", "先上，失敗的列今晚再補。", "今晚補的時候，扣款還在進來。")
    ]),
    dig("第三方逾時了。這筆算失敗嗎？", [
      line("good", "不算。逾時只代表不知道。重試沿用同一把冪等鍵。", "未知沒有被你判成失敗。",
        dig("兩台機器同時看到這把鍵還不存在。誰可以去扣？", [
          line("good", "資料庫用唯一約束或列鎖搶所有權。單機的 synchronized 鎖不住另一台。", "所有權在資料庫，不在某一台的記憶體。"),
          line("weak", "在程式裡加 synchronized。", "鎖只活在一台機器裡。另一台仍會去扣。", { clear: ["invariants"] })
        ])),
      line("absorb", "當失敗，立刻用新的請求再扣一次。", "不知道結果的那一次，被你再送成第二筆。", { clear: ["invariants"] })
    ]),
    dig("圖再完整，第一筆正在處理的扣款誰負責？", [
      line("good", "先寫約定，再談圖。進行中的扣款走對帳，不重扣。", "圖被你放回契約後面。", { set: ["invariants"] }),
      line("weak", "上線當天再指定負責人。", "三十天的第一天仍然沒有主人。")
    ])
  ],
  2: [
    dig("補歷史補到一半失敗呢？", [
      line("good", "補寫可以重跑。限制還不加，舊程式仍讀得動。", "失敗停在可重跑，沒有提前鎖死。",
        dig("為什麼不在尖峰直接建唯一索引？", [
          line("good", "一般建索引會擋住寫入。用並行建立，並限制等鎖時間。", "索引的做法被你和尖峰的寫入分開。"),
          line("weak", "索引很小，鎖一下沒關係。", "小索引仍會等鎖。正在扣的寫入會排在後面。", { clear: ["expanded"] })
        ])),
      line("absorb", "失敗就加上必填，逼剩下的列一次補齊。", "補不完的列會被必填擋在寫入之外。", { clear: ["expanded"] })
    ]),
    dig("舊列是空的。必填通過嗎？", [
      line("good", "不通過。先加可空欄，補完再限制。", "空值被你留在可空階段。", { set: ["expanded"] }),
      line("absorb", "給空字串當預設，一樣算有值。", "空字串會變成假的識別碼，之後難以分辨補過沒有。")
    ]),
    dig("停機窗裡還有一筆已送出、結果還沒回來的扣款。", [
      line("good", "不靠停機。擴欄期間讀寫都要認得新舊，這筆走對帳。", "停機沒有消去不明結果。", { set: ["expanded"] }),
      line("weak", "停機前先把進行中的扣款標成失敗。", "還沒回來的結果被你先判死。")
    ])
  ],
  3: [
    dig("轉送程式送出後、標記已送之前當掉呢？", [
      line("good", "會再送一次。消費端用同一把事件識別碼去掉重複。", "至少送達一次被你說成消費端的工作。",
        dig("兩台應用同時處理同一筆。誰可以打第三方？", [
          line("good", "資料庫先原子搶下這筆。搶到的才能打，搶輸的讀已有結果。", "外部副作用只有一個所有者。"),
          line("absorb", "兩台都打，下游會處理重複。", "下游若沒有同一把鍵，兩次扣款都是真的。", { clear: ["outbox"] })
        ])),
      line("weak", "把佇列調成精確一次，消費端就不用管。", "佇列的精確一次包不住對第三方的那次呼叫。", { clear: ["outbox"] })
    ]),
    dig("資料庫已提交，佇列那次沒送成。", [
      line("good", "這就是雙寫。改成同一筆交易留下待送事件。", "送失敗不再等於這筆從紀錄裡消失。", { set: ["outbox"] }),
      line("absorb", "加一個每分鐘重試送佇列的背景工作，資料庫不用改。", "背景工作仍靠記得有哪些提交還沒送出。")
    ]),
    dig("事件裡的客戶代號，可以進別的系統或履歷嗎？", [
      line("good", "不可以。事件只留支付識別碼與狀態。", "對帳資訊被你收成識別碼。"),
      line("leak", "可以，對帳比較快。", "內部代號又被送到另一處。")
    ])
  ],
  4: [
    dig("舊工人的租約過期，新工人已接手。舊工人的請求這時回來了。", [
      line("good", "舊工人拿過期代幣不能再打第三方，也不能覆寫新狀態。", "過期的工作者被你擋在副作用之外。",
        dig("怎麼證明部分失敗時仍不會扣兩次？", [
          line("good", "測逾時、重送、兩台同時搶、租約過期後舊工人回來。不只測成功路徑。", "證明的是失敗路徑，不是快樂路徑。"),
          line("weak", "整合測試把成功扣款跑過就好。", "成功路徑沒有碰到你要防的那些競態。", { clear: ["cutover"] })
        ])),
      line("absorb", "把租約調長，這種情況就不會發生。", "再長的租約仍會被一次更長的停頓超過。", { clear: ["cutover"] })
    ]),
    dig("兩邊都認為自己該扣。你怎麼知道第三方收過幾次？", [
      line("good", "事先不知道。所以不能並行。先定所有權，再允許一個消費者去扣。", "並行被你從方案裡拿掉。", { set: ["cutover"] }),
      line("absorb", "對帳可以事後把多的退掉。", "退款補不回已經發生的第二次扣款體驗，也多一次外部副作用。")
    ]),
    dig("百分之十裡有一筆逾時。這百分之十繼續嗎？", [
      line("good", "先停擴大。這筆走對帳，所有權不拆開。", "比例沒有蓋過不明結果。", { set: ["cutover"] }),
      line("weak", "繼續放量，逾時比例還低。", "低比例裡的那一筆仍可能被扣兩次。")
    ])
  ],
  5: [
    dig("他說：講了也不會改，所以我先做。", [
      line("good", "這是訊號。把可以喊停的條件寫進計畫，讓反對有地方落地。", "沉默被你聽成還沒被接住的反對。",
        dig("檢查要給誰看？", [
          line("good", "財務對帳、風控、值班都能看到未完成與不明結果，不只工程群。", "看風險的人包含會被扣款影響的部門。"),
          line("weak", "工程內部看板就夠。", "財務與風控仍只聽得到沒問題。", { clear: ["spoken"] })
        ])),
      line("absorb", "那就讓他做完，三十天後再回顧。", "回顧排在全量切換之後。喊停沒有發生。", { clear: ["spoken"] })
    ]),
    dig("上週的不明扣款他沒有提。現在算誰的風險？", [
      line("good", "算計畫的缺口。沒有回報就另開檢查，不把沉默當成通過。", "漏報被你收成檢查，不是個人品格問題。", { set: ["spoken"] }),
      line("weak", "算他個人漏報，計畫不用改。", "計畫仍把沉默當成沒有風險。")
    ]),
    dig("私訊回覆：都好。你收得下嗎？", [
      line("good", "不收。改問具體的進行中扣款與對帳差異。", "都好沒有被你當成檢查完成。", { set: ["spoken"] }),
      line("weak", "收。他說都好就是都好。", "私訊停在同一句沒有內容的回答。")
    ])
  ]
});

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
  invariants: false,
  expanded: false,
  outbox: false,
  cutover: false,
  spoken: false,
  index: 0,
  phase: "title",
  last: null,
  ending: "",
  history: []
};

function deck() {
  if (state.mode === "design") return designLevels;
  if (state.mode === "cache") return cacheLevels;
  if (state.mode === "ship") return shipLevels;
  return storyLevels;
}

function mark() {
  if (state.mode === "design") return "四十五分";
  if (state.mode === "cache") return "快取";
  if (state.mode === "ship") return "上線";
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
        <span>第 ${state.index + 1} / ${deck().length} 關 · ${level.title}${state.depth ? ` · 追問 ${state.depth}` : ""}</span>
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
  if (state.mode === "ship") {
    if (state.invariants && state.expanded && state.outbox && state.cutover && state.spoken) return "win";
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

const shipOutline = "舊支付還在扣款時，先寫不能打破的約定：一筆只對一個識別碼，重試不再扣，逾時走對帳。改表先加可空欄、同時讀新舊、補歷史、再加限制，索引用並行建立。同步用同一筆交易的待送事件，消費端去掉重複。切換時一筆只有一個所有者，並先寫退回。會上的沒問題不是同意，檢查要給財務、風控和值班看。";

function endingCopy(kind) {
  if (kind === "win" && state.mode === "design") {
    return ["可帶走", "下面這段按五步講。題目是圖書館借還，不帶任何既有產品。"];
  }
  if (kind === "win" && state.mode === "cache") {
    return ["可帶走", "下面這段按一致性分層講。閱讀數可以舊一下，餘額不行。"];
  }
  if (kind === "win" && state.mode === "ship") {
    return ["可帶走", "下面這段按上線順序講。舊支付還在扣款，不能停，也不能扣兩次。"];
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
  if (state.mode === "ship") {
    return ["流程走完", "五問走完了。缺的上線判斷寫在下面。"];
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
  if (state.mode === "ship") {
    const items = [];
    if (!state.invariants) items.push("缺約定：一筆只對一個識別碼，重試不再扣，逾時走對帳。");
    if (!state.expanded) items.push("缺擴欄：先可空、再補歷史、再限制。索引不要在尖峰擋住寫入。");
    if (!state.outbox) items.push("缺待送事件：同一筆交易留下事件，消費端去掉重複。");
    if (!state.cutover) items.push("缺切換：一筆只有一個所有者，並先寫退回。");
    if (!state.spoken) items.push("缺沉默：沒問題不是同意。檢查要給財務、風控和值班看。");
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
  const shipWin = state.invariants && state.expanded && state.outbox && state.cutover && state.spoken;
  if (state.mode === "ship" && shipWin) {
    blocks.push(`<h2>上線順序</h2><p class="script" id="script">${shipOutline}</p><button id="copy">複製順序</button>`);
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
        <p class="sub">選擇題可離線。AI 面試用你自己的 Gemini 金鑰，依原話追問。</p>
        <div class="choices">
          <button class="primary" id="start">九十秒：職場與故事</button>
          <button id="design">四十五分：系統設計</button>
          <button id="cache">快取：雙寫一致性</button>
          <button id="ship">上線：不停機更換</button>
          <button id="ai">AI 面試：出題、檢核、再追問</button>
        </div>
        <ul class="rules">
          <li>九十秒：分階段遷移、留下交接、規格不到位就不承諾日期。通關要有故事、面試界線、反問界線。</li>
          <li>四十五分：先問範圍與量級，再畫一條路徑，最後講為什麼現在不堆架構。題目是圖書館借還。</li>
          <li>快取：提交後刪除，用日誌變更重試，未命中讀主庫，過期兜底。餘額不進快取。</li>
          <li>上線：先寫不能扣錯的約定，再擴欄、待送事件、單一所有者。會上的沒問題不是同意。</li>
          <li>每一題答完會再追問。守住的回答再挖一層，含糊或失守停在一層。下一題由上一題的回答決定。</li>
        </ul>
      </article>`;
    document.getElementById("start").onclick = () => begin("story");
    document.getElementById("design").onclick = () => begin("design");
    document.getElementById("cache").onclick = () => begin("cache");
    document.getElementById("ship").onclick = () => begin("ship");
    document.getElementById("ai").onclick = () => startAi();
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
          const text = state.mode === "design" ? designOutline : state.mode === "cache" ? cacheOutline : state.mode === "ship" ? shipOutline : storyScript;
        await navigator.clipboard.writeText(text);
          copy.textContent = "已複製";
        } catch (error) {
          copy.textContent = "請直接選取講稿";
        }
      };
    }
    return;
  }

  const level = state.beat || deck()[state.index];
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
        state.depth = 0;
        state.beat = null;
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
        follow: null,
        feedback: "沒有留下遷移事實，這則九十秒編不出可核對的版本與階段。"
      };
    }
    return choice;
  });

  app.innerHTML = `
    ${header()}
    <article class="card">
      ${state.depth ? `<div class="kicker">追問 ${state.depth}</div>` : ""}
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
  if (choice.clear) choice.clear.forEach((key) => { state[key] = false; });
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
  const base = deck()[state.index].title;
  state.history.push({ title: state.depth ? `${base}追問${state.depth}` : base, type: choice.type });
  if (state.streak >= 2 || state.lives <= 0) {
    state.ending = "fail";
    state.phase = "end";
  } else if (choice.follow && state.depth < 2) {
    state.beat = choice.follow;
    state.depth += 1;
    state.phase = "level";
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
    invariants: false,
    expanded: false,
    outbox: false,
    cutover: false,
    spoken: false,
    index: 0,
    depth: 0,
    beat: null,
    phase: "level",
    last: null,
    ending: "",
    history: []
  });
  render();
}

window.returnToTitle = () => {
  state.phase = "title";
  render();
};

render();
