import type {
  CommercialPage,
  CommercialPageId,
  LocalizedText,
  ServiceProjectRelationship
} from './types';

const copy = (en: string, zh: string): LocalizedText => ({ en, 'zh-TW': zh });

export const commercialPages: Record<CommercialPageId, CommercialPage> = {
  home: {
    publishedAt: '2026-08-01',
    title: copy(
      'Web Development for Taiwan Small Businesses | Jay Hsieh',
      '台灣個人與小型企業網站開發｜謝孟哲'
    ),
    heading: copy(
      'Web development for Taiwan small businesses',
      '台灣個人與小型企業網站開發'
    ),
    description: copy(
      'Jay Hsieh plans and builds maintainable websites and web applications for individuals and small businesses in Taiwan, with English support available.',
      '謝孟哲為台灣個人與小型企業規劃及開發可維護的網站與 Web 應用程式，並可提供英文溝通支援。'
    ),
    sections: [
      {
        id: 'audience',
        heading: copy('A practical partner for a defined web need', '為明確網站需求提供務實合作'),
        paragraphs: [
          copy(
            'This service is primarily for individuals and small businesses in Taiwan that need a new public website, a clearer replacement for an existing site, or a focused application supporting a real workflow. Overseas clients who can work in English are welcome, but the pricing, working hours, and primary market context are based in Taiwan.',
            '這項服務主要面向台灣的個人與小型企業，適合需要全新公開網站、改善既有網站，或以小型應用程式支援實際工作流程的委託。海外客戶亦可使用英文合作，但價格、工作時間與主要市場情境皆以台灣為基礎。'
          ),
          copy(
            'A good project starts with a specific audience and action: explain a service, present a body of work, collect a qualified inquiry, publish product information, or replace a manual process. I help turn that purpose into page structure, content requirements, technical boundaries, and a delivery plan before development begins.',
            '合適的專案會先確認特定受眾與主要行動，例如說明服務、展示作品、蒐集有效詢問、發布商品資訊，或取代人工流程。開發前，我會協助把目的整理成頁面結構、內容需求、技術邊界與交付計畫。'
          )
        ]
      },
      {
        id: 'fit',
        heading: copy('How to judge fit before requesting a proposal', '委託前如何判斷是否適合'),
        paragraphs: [
          copy(
            'The strongest fit is a project with an owner who can make decisions, provide or approve the source material, and review work at agreed checkpoints. You do not need a technical specification. A useful starting brief names the business problem, intended visitors, required pages or actions, available content, budget range, and preferred launch window.',
            '最適合的合作情況是有明確決策者，能提供或核准原始素材，並在約定節點審查成果。您不需要先準備技術規格；有效的初步需求只要說明商業問題、目標訪客、必要頁面或行動、現有內容、預算區間與希望上線時間。'
          ),
          copy(
            'Projects that depend on an untested business model, an undefined feature list, immediate delivery, or services outside web development need discovery or specialist support before a fixed proposal is responsible. Brand identity, photography, illustration, and complete copywriting are not silently bundled into development estimates.',
            '若專案依賴尚未驗證的商業模式、未定義的功能清單、立即交付，或網站開發以外的專業服務，就需要先進行需求探索或尋找相應專家，才適合提出固定提案。品牌識別、攝影、插畫與完整文案不會默認包含在開發估價中。'
          )
        ]
      },
      {
        id: 'delivery',
        heading: copy('What the working process produces', '合作流程會產出什麼'),
        paragraphs: [
          copy(
            'Discovery confirms goals, constraints, responsibilities, and the proposal. Planning defines information architecture, user flows, content dependencies, and delivery stages. Development then proceeds through reviewable increments with automated checks appropriate to the project. Launch covers deployment, handoff, and a 30-day defect warranty.',
            '需求探索會確認目標、限制、責任與提案；規劃階段定義資訊架構、使用流程、內容相依與交付階段；開發則以可審查的小步驟進行，並依專案加入合適的自動化檢查；上線階段包含部署、交接與 30 天缺陷保固。'
          ),
          copy(
            'The result is more than a set of screens. Depending on scope, delivery may include structured content, responsive components, form or data flows, accessibility and performance checks, deployment configuration, and concise maintenance guidance. The proposal identifies exactly which of these are included.',
            '交付成果不只是畫面。依範圍可能包含結構化內容、響應式元件、表單或資料流程、無障礙與效能檢查、部署設定，以及精簡維護說明；提案會逐項列出實際包含內容。'
          )
        ]
      },
      {
        id: 'evidence',
        heading: copy('Evidence instead of unsupported promises', '以可查證內容取代無根據承諾'),
        paragraphs: [
          copy(
            'The project pages show public implementations, repositories where available, visible interface states, technical choices, and explicit limitations. They demonstrate the kind of structure and engineering work I can deliver without inventing conversion lifts, revenue figures, client testimonials, or adoption numbers that have not been independently verified.',
            '專案頁面提供可公開檢視的實作、可用的原始碼儲存庫、實際介面狀態、技術選擇與明確限制。這些資料用來呈現可交付的架構與工程能力，不會虛構未經獨立驗證的轉換率、營收、客戶推薦或使用數據。'
          )
        ]
      },
      {
        id: 'starting',
        heading: copy('What happens after you make contact', '聯絡之後會怎麼進行'),
        paragraphs: [
          copy(
            'The inquiry form asks for the service type, budget range, target timeline, and a project summary so the first reply can address fit instead of repeating basic questions. Useful summaries explain what exists today, what needs to change, who uses it, which result matters, and whether a domain, content, design material, or technical system is already in place.',
            '詢問表單會請您提供服務類型、預算區間、目標時程與專案摘要，讓第一次回覆就能討論適合度，而不是重複基本問題。有效摘要可說明目前狀況、需要改變的內容、使用者、重要成果，以及是否已有網域、內容、設計素材或技術系統。'
          ),
          copy(
            'I review whether the request matches the published services, whether important dependencies are missing, and whether the likely scope fits the stated budget and timing. A suitable request moves into a focused discovery conversation. If the request needs a different specialist, a larger delivery team, or more definition before estimation, I will state that boundary rather than offer an unreliable commitment.',
            '我會評估需求是否符合公開服務、是否缺少重要相依項目，以及可能範圍是否符合預算與時程。合適需求會進入聚焦的探索討論；若需要其他專家、更大型交付團隊，或估價前需進一步定義，我會直接說明邊界，不會做出不可靠承諾。'
          ),
          copy(
            'A proposal records scope, deliverables, exclusions, assumptions, schedule, review rounds, price, payment milestones, and acceptance expectations. Work begins after both sides accept those terms and the initial payment is complete. This written baseline protects the project when new ideas appear by making it clear whether they replace existing work, fit within the agreed scope, or require a separate change.',
            '提案會記錄範圍、交付物、排除項目、假設、時程、審查輪次、價格、付款節點與驗收期待。雙方接受條款且首期款完成後才開始工作。這份書面基準能在新想法出現時保護專案，清楚判斷它是取代既有工作、仍在約定範圍內，或需要另行變更。'
          )
        ]
      }
    ]
  },
  services: {
    publishedAt: '2026-08-01',
    title: copy('Web Development Services in Taiwan | Jay Hsieh', '台灣網站開發服務｜謝孟哲'),
    heading: copy('Web development services', '網站開發服務'),
    description: copy(
      'Compare Taiwan-based marketing websites, business sites, and small full-stack application services, including scope, delivery, and project fit.',
      '比較台灣行銷網站、作品集或企業網站與小型全端應用程式服務，包含範圍、交付內容與適合條件。'
    ),
    sections: [
      {
        id: 'choosing',
        heading: copy('Choose by business need, not by technology', '依商業需求選擇，而不是依技術名稱'),
        paragraphs: [
          copy(
            'A marketing website is the smallest focused option when one offer, campaign, event, or local service needs a clear explanation and primary action. A portfolio or business site fits several services, projects, team details, or recurring content that need a durable navigation and content system. A full-stack application is appropriate only when users, permissions, stored data, integrations, or internal operations create behavior that a content site cannot provide.',
            '行銷網站適合單一服務、活動、事件或在地業務，需要清楚說明與主要行動的情況。作品集或企業網站適合多項服務、專案、團隊資訊或持續更新內容，需要長期可維護的導覽與內容系統。只有在使用者、權限、儲存資料、系統整合或內部營運需要內容網站無法提供的行為時，才適合全端應用程式。'
          ),
          copy(
            'The service names are starting points, not rigid packages. The proposal is based on required outcomes, content readiness, integrations, risk, and review effort. Removing a critical workflow just to enter a lower price tier usually creates a weak result; reducing optional pages or deferring a secondary feature is often a safer way to control scope.',
            '服務名稱是討論起點，不是僵化套裝。提案會依必要成果、內容準備程度、整合、風險與審查工作決定。為了進入較低價格區間而移除關鍵流程通常會削弱成果；減少非必要頁面或延後次要功能，往往是更安全的範圍控制方式。'
          )
        ]
      },
      {
        id: 'inputs',
        heading: copy('What you provide and what I clarify', '您需要提供什麼，我會協助釐清什麼'),
        paragraphs: [
          copy(
            'You provide accurate business facts, ownership or permission for supplied assets, a decision maker, timely consolidated feedback, and access needed for approved integrations or deployment. Existing analytics, brand guidance, content drafts, domain details, and examples of preferred or disliked sites are useful when available, but they do not need to be polished before the first conversation.',
            '您需要提供正確商業資訊、素材所有權或使用許可、明確決策者、及時且集中的回饋，以及核准整合或部署所需的存取權。既有分析資料、品牌規範、內容草稿、網域資訊與喜歡或不喜歡的網站範例都有幫助，但初次討論前不必整理到完美。'
          ),
          copy(
            'I clarify page and feature priorities, responsive behavior, content dependencies, browser support, data boundaries, accessibility needs, deployment ownership, acceptance checks, and handoff expectations. Unknowns that could materially change cost are recorded as assumptions or discovery tasks instead of being hidden inside a fixed estimate.',
            '我會釐清頁面與功能優先順序、響應式行為、內容相依、瀏覽器支援、資料邊界、無障礙需求、部署責任、驗收檢查與交接期待。可能明顯改變成本的未知事項會列為假設或探索工作，不會隱藏在固定估價中。'
          )
        ]
      },
      {
        id: 'quality',
        heading: copy('Quality controls included in development', '開發中的品質控制'),
        paragraphs: [
          copy(
            'Responsive layouts are checked across representative phone, tablet, and desktop widths. Semantic structure, keyboard access, accessible names, contrast, and focus behavior are reviewed where relevant. Automated type, content, unit, build, and browser checks are selected according to the public interfaces and risks of the project rather than added as a ceremonial checklist.',
            '響應式版面會在具代表性的手機、平板與桌面寬度檢查。語意結構、鍵盤操作、可存取名稱、對比與焦點行為會依需求審查。型別、內容、單元、建置與瀏覽器自動化檢查會依專案的公開介面與風險選擇，而不是形式化地堆疊清單。'
          ),
          copy(
            'Performance work starts with appropriate architecture, asset sizes, and delivery behavior. Search foundations include indexable semantic content, intentional metadata, canonical URLs, and structured data when the page supports it. These practices improve technical readiness but do not guarantee rankings, leads, sales, or third-party platform decisions.',
            '效能工作從合適架構、素材大小與傳送行為開始。搜尋基礎包含可索引的語意內容、經過規劃的中繼資料、標準網址，以及頁面內容確實支援時的結構化資料。這些作法提升技術準備程度，但不保證排名、詢問、銷售或第三方平台決策。'
          )
        ]
      },
      {
        id: 'risk',
        heading: copy('Common risks to schedule and budget', '常見時程與預算風險'),
        paragraphs: [
          copy(
            'Late content, changing approvers, undocumented integrations, data migration, unclear legal requirements, and features discovered after implementation starts can affect both schedule and cost. External services can also change APIs, pricing, approval rules, or availability. The practical response is to identify dependencies early, stage uncertain work, and keep a written decision trail.',
            '延遲內容、變更核准者、未記錄的整合、資料移轉、不清楚的法規要求，以及開發開始後才發現的功能，都可能影響時程與成本。外部服務也可能改變 API、價格、審核規則或可用性。務實做法是提早找出相依項目、分階段處理不確定工作，並保留書面決策紀錄。'
          ),
          copy(
            'The listed timelines assume that required content and access arrive on schedule and feedback is consolidated within each review round. Expedited delivery, complex migration, custom commerce, regulated data, multilingual expansion beyond English and Traditional Chinese, or ongoing operations require separate evaluation.',
            '頁面所列時程假設必要內容與存取權能按時提供，且每輪審查的回饋會集中整理。急件、複雜移轉、自訂電商、受規範資料、英文與繁體中文以外的多語擴充，或持續營運服務，都需要另行評估。'
          )
        ]
      },
      {
        id: 'after-launch',
        heading: copy('Launch, warranty, and maintenance boundaries', '上線、保固與維護邊界'),
        paragraphs: [
          copy(
            'Launch includes the deployment and handoff described in the proposal. The 30-day warranty covers defects where the delivered implementation does not behave as agreed. It does not cover new features, changed content, third-party outages, credentials changed after handoff, or damage caused by unapproved modifications.',
            '上線包含提案所述的部署與交接。30 天保固涵蓋交付實作未依約定運作的缺陷；不包含新功能、內容變更、第三方中斷、交接後被更改的憑證，或未經同意修改造成的問題。'
          ),
          copy(
            'Ongoing maintenance is optional and quoted after the warranty according to expected response time, update frequency, hosting responsibility, and system risk. A site can also be handed over for independent maintenance when the agreed stack, accounts, and documentation support that model.',
            '持續維護為選擇性服務，保固後會依預期回應時間、更新頻率、主機責任與系統風險另行報價。若約定技術、帳號與文件支援自行維護，也可以完成交接後由您獨立管理。'
          )
        ]
      },
      {
        id: 'questions',
        heading: copy('Questions answered before scope is fixed', '固定範圍前要回答的問題'),
        paragraphs: [
          copy(
            'For a public site, we confirm which audiences need which information, the primary action on each page, who supplies and approves copy, how inquiries are handled, what analytics are appropriate, and who owns the domain and hosting accounts. We also identify redirects, existing search visibility, privacy disclosures, accessibility expectations, and any material that cannot be published.',
            '公開網站會確認不同受眾需要哪些資訊、每頁主要行動、誰提供與核准文案、詢問如何處理、適合哪些分析方式，以及網域與主機帳號由誰持有。同時也會找出重新導向、既有搜尋能見度、隱私揭露、無障礙期待與不能公開的素材。'
          ),
          copy(
            'For an application, we additionally confirm user roles, authentication, authoritative data, validation, failure recovery, audit needs, integrations, administrative actions, backup expectations, and operational ownership. A prototype can intentionally defer some of these, but the deferral must be visible so a demonstration is not mistaken for a production-ready system.',
            '應用程式還要確認使用者角色、驗證、權威資料來源、輸入檢查、失敗復原、稽核需求、系統整合、管理操作、備份期待與營運責任。原型可以刻意延後部分工作，但必須清楚標示，避免把展示版本誤認為可正式營運的系統。'
          ),
          copy(
            'Content readiness is assessed separately from development. Existing copy may need restructuring even when full copywriting is excluded. Images need usage rights, accurate alternative text, and known dimensions. Product, legal, medical, financial, or regulated claims remain the client’s responsibility and may require review by a qualified professional before publication.',
            '內容準備程度會與開發分開評估。即使不包含完整文案，既有文字仍可能需要重新整理。圖片必須有使用權、正確替代文字與已知尺寸。產品、法律、醫療、財務或受規範宣稱仍由客戶負責，發布前可能需要合格專業人士審查。'
          ),
          copy(
            'Finally, we define what completion means. That can include approved pages, supported browser behavior, successful form delivery, tested data operations, deployment to the agreed account, and delivery of source or maintenance notes. Clear acceptance criteria make review more objective and keep the warranty focused on defects rather than undefined expectations.',
            '最後會定義完成的意義，可能包含已核准頁面、支援瀏覽器行為、表單成功送達、經測試的資料操作、部署到約定帳號，以及交付原始碼或維護說明。清楚驗收條件能讓審查更客觀，也讓保固聚焦於缺陷，而不是未定義期待。'
          )
        ]
      }
    ]
  },
  projects: {
    publishedAt: '2026-08-01',
    title: copy(
      'Web Development Projects & Case Studies | Jay Hsieh',
      '網站開發專案與案例研究｜謝孟哲'
    ),
    heading: copy('Web development projects and case studies', '網站開發專案與案例研究'),
    description: copy(
      'Review public website and application case studies by Jay Hsieh, including scope, responsibilities, technical decisions, risks, and verifiable evidence.',
      '查看謝孟哲的公開網站與應用程式案例，包含範圍、責任、技術決策、風險與可查證證據。'
    ),
    sections: [
      {
        id: 'reading',
        heading: copy('How to read these case studies', '如何閱讀這些案例'),
        paragraphs: [
          copy(
            'Each case separates context, responsibilities, implementation choices, constraints, and verified evidence. Butter is collaborative work for another person; NRG Commerce and EvoSnake are independent product projects. That distinction matters because a public implementation can demonstrate engineering decisions without implying a paid client relationship or business outcome.',
            '每個案例都分開說明背景、責任、實作選擇、限制與可查證證據。Butter 是為他人合作製作的專案；NRG Commerce 與 EvoSnake 是獨立產品專案。這項區分很重要，因為公開實作可以證明工程決策，但不代表付費客戶關係或商業成果。'
          ),
          copy(
            'Screenshots show visible interface states, while repository and live links provide further inspection where available. Technical descriptions stay within what the source and public behavior support. No case uses invented traffic, revenue, conversion, testimonial, or adoption claims.',
            '截圖呈現可見介面狀態；若有公開儲存庫與線上連結，則可進一步檢視。技術描述限於原始碼與公開行為可支持的內容，不使用虛構流量、營收、轉換、推薦或採用數據。'
          )
        ]
      },
      {
        id: 'selection',
        heading: copy('Match evidence to the work you need', '把案例證據對應到您的需求'),
        paragraphs: [
          copy(
            'Butter is the closest reference for a focused marketing or personal presence with supplied content and static delivery. NRG Commerce demonstrates a larger business and full-stack structure with several deployable surfaces, shared contracts, a database, and operational boundaries. EvoSnake demonstrates interaction-heavy frontend state, responsive controls, dialogs, event rules, and a leaderboard flow.',
            'Butter 最接近使用既有內容、採靜態交付的聚焦行銷或個人網站。NRG Commerce 展示較大型的企業與全端架構，包含多個可部署介面、共用契約、資料庫與營運邊界。EvoSnake 則展示高度互動的前端狀態、響應式控制、對話框、事件規則與排行榜流程。'
          ),
          copy(
            'A case study is not a promise that a new project should copy the same stack. It is evidence of how decisions are made under a particular set of constraints. A proposal should start from your audience, content, workflow, ownership, and maintenance needs, then select the smallest architecture that responsibly supports them.',
            '案例不代表新專案應複製相同技術。它證明的是在特定限制下如何做決策。提案應從您的受眾、內容、流程、所有權與維護需求出發，再選擇能負責任支援這些需求的最小架構。'
          )
        ]
      },
      {
        id: 'limits',
        heading: copy('What these examples do not establish', '這些範例不能證明什麼'),
        paragraphs: [
          copy(
            'The examples do not establish future schedule, fixed cost, compatibility with an unknown legacy system, or suitability for regulated and high-scale workloads. Those questions require project-specific discovery. They also do not substitute for your responsibility to provide lawful content, permissions, business rules, and final approval.',
            '這些範例不能直接確定未來專案的時程、固定成本、未知舊系統相容性，或受規範與高流量工作負載的適用性；這些問題需要針對專案探索。它們也不能取代您提供合法內容、使用許可、商業規則與最終核准的責任。'
          )
        ]
      },
      {
        id: 'decision-records',
        heading: copy('Why the technical decisions are documented', '為什麼記錄技術決策'),
        paragraphs: [
          copy(
            'A portfolio screenshot can show polish, but it cannot explain why the code is organized a certain way, which constraints shaped the result, or how failures are handled. The written cases therefore identify scope, role, content boundaries, architecture, and tradeoffs alongside the visible interface. This makes the evidence useful when comparing a visually simple site with a system that has several applications and data responsibilities.',
            '作品截圖能呈現完成度，卻無法解釋程式為何如此組織、哪些限制塑造結果，或失敗如何處理。因此案例會在可見介面之外，記錄範圍、角色、內容邊界、架構與取捨，讓視覺簡單網站與具有多個應用程式及資料責任的系統可以被合理比較。'
          ),
          copy(
            'The same evidence-first approach applies to limitations. Static delivery is valuable when content and interactions permit it, not a universal answer. A monorepo can keep shared contracts coherent, but adds workspace and deployment coordination. An interaction-heavy game can demonstrate state modeling without proving business-system security. Naming these limits is part of showing sound judgment.',
            '同樣以證據為先的方式也適用於限制。當內容與互動允許時，靜態交付很有價值，但不是萬用答案。monorepo 能維持共用契約一致，卻增加工作區與部署協調。高度互動遊戲可展示狀態建模，但不能證明商業系統安全性。說明這些限制也是展現判斷力的一部分。'
          )
        ]
      }
    ]
  },
  about: {
    publishedAt: '2026-08-01',
    title: copy('About Jay Hsieh | Taiwan Full-Stack Developer', '關於謝孟哲｜台灣全端開發者'),
    heading: copy('About Jay Hsieh', '關於謝孟哲'),
    description: copy(
      'Meet Jay Hsieh, a Taiwan-based full-stack developer focused on maintainable websites, clear product flows, testing, performance, and reliable deployment.',
      '認識台灣全端開發者謝孟哲，專注可維護網站、清楚產品流程、測試、效能與可靠部署。'
    ),
    sections: [
      {
        id: 'approach',
        heading: copy('How I approach web development', '我的網站開發方式'),
        paragraphs: [
          copy(
            'I work across planning, frontend, backend, data, testing, and deployment, but the goal is not to use every layer on every project. The goal is to understand the public promise and operational need, then choose a structure that remains understandable after launch. Simple content sites should stay simple; applications with real state need explicit contracts and boundaries.',
            '我的工作涵蓋規劃、前端、後端、資料、測試與部署，但目的不是每個專案都使用所有層級，而是理解公開承諾與營運需求，再選擇上線後仍容易理解的架構。單純內容網站應保持簡單；具有真實狀態的應用程式則需要明確契約與邊界。'
          ),
          copy(
            'I prefer decisions that can be explained and checked: semantic page structure, manually maintainable content, typed interfaces, focused tests, visible failure handling, and deployment steps that do not depend on memory. When a requirement is uncertain, I identify the assumption rather than presenting it as settled fact.',
            '我偏好能說明也能檢查的決策：語意化頁面結構、可手動維護內容、型別化介面、聚焦測試、可見失敗處理，以及不依賴記憶的部署步驟。需求不確定時，我會明確標示假設，而不是把它當成已確認事實。'
          )
        ]
      },
      {
        id: 'collaboration',
        heading: copy('What collaboration looks like', '合作方式'),
        paragraphs: [
          copy(
            'I ask for the reason behind a requested page or feature, who must use it, what information it needs, and what failure would cost. This helps separate required behavior from preferences and identifies dependencies early. Reviews work best when feedback is consolidated, tied to the agreed goal, and delivered at the planned checkpoint.',
            '我會詢問頁面或功能背後的原因、使用者、所需資訊，以及失敗會造成的影響。這有助於區分必要行為與偏好，並提早找出相依項目。回饋若能集中整理、對應約定目標，並在規劃的審查節點提出，合作會最有效率。'
          ),
          copy(
            'Taiwan individuals and small businesses are the primary audience for commissioned work. I can also communicate and deliver in English for overseas clients. English support does not remove the need to confirm time zones, payment method, applicable terms, content ownership, and who is responsible for local legal or industry review.',
            '台灣個人與小型企業是委託服務的主要對象；海外客戶也可以英文溝通與交付。英文支援不代表可以省略時區、付款方式、適用條款、內容所有權，以及當地法規或產業審查責任的確認。'
          )
        ]
      },
      {
        id: 'proof',
        heading: copy('Public proof and ongoing learning', '公開證據與持續學習'),
        paragraphs: [
          copy(
            'The project links on this page lead to public evidence of different capabilities: Butter for a collaborative static website, NRG Commerce for full-stack architecture and commerce workflows, and EvoSnake for interactive frontend state. Credentials provide additional learning evidence, but they are not presented as substitutes for working software or as guarantees of project outcomes.',
            '本頁專案連結提供不同能力的公開證據：Butter 展示合作製作的靜態網站，NRG Commerce 展示全端架構與電商流程，EvoSnake 展示互動前端狀態。資格證明補充學習經歷，但不會被當成可運作軟體的替代品，也不保證專案成果。'
          ),
          copy(
            'I document what is verified, what is inferred, and what remains outside scope. That boundary is especially important in portfolio work, where attractive screens can otherwise hide unclear responsibilities or unsupported claims. Prospective clients should use the case details, source links, and direct conversation to evaluate fit.',
            '我會記錄已驗證內容、推論與範圍外事項。這項邊界在作品集中特別重要，因為漂亮畫面可能掩蓋不清楚的責任或無根據宣稱。潛在客戶應綜合案例細節、原始碼連結與直接討論來評估適合度。'
          )
        ]
      },
      {
        id: 'fit',
        heading: copy('When I am likely to be a good fit', '什麼情況適合找我合作'),
        paragraphs: [
          copy(
            'I am most useful when a project benefits from one person connecting content structure, interface behavior, application logic, testing, and deployment decisions. That continuity suits focused websites and small applications where communication overhead should stay low but technical boundaries still need care. Larger programmes that require several simultaneous specialist teams, round-the-clock operations, or regulated assurance need a different delivery model.',
            '當專案需要由同一人連結內容結構、介面行為、應用邏輯、測試與部署決策時，我最能提供價值。這種連續性適合希望降低溝通成本、但仍重視技術邊界的聚焦網站與小型應用程式。需要多個專業團隊同時投入、全天候營運或受規範保證的大型計畫，則需要不同交付模式。'
          ),
          copy(
            'A productive client relationship values accurate scope, direct communication, documented decisions, and review based on agreed goals. If you are still deciding what to build, that is acceptable when the first task is explicitly discovery. It is less suitable to treat a fixed development quote as permission for an unlimited and continuously changing product definition.',
            '有效合作重視正確範圍、直接溝通、書面決策，以及依約定目標進行審查。若您仍在決定要做什麼，可以明確把第一項工作定為需求探索；若把固定開發報價視為可無限持續變更產品定義，則不適合這種合作方式。'
          )
        ]
      }
    ]
  }
};

export const serviceProjectRelationships: readonly ServiceProjectRelationship[] = [
  { serviceId: 'marketing-site', projectSlugs: ['butter-personal-website'] },
  {
    serviceId: 'portfolio-business-site',
    projectSlugs: ['butter-personal-website', 'nrg-commerce']
  },
  { serviceId: 'full-stack-application', projectSlugs: ['nrg-commerce', 'evosnake'] }
] as const;

export function projectSlugsForService(serviceId: ServiceProjectRelationship['serviceId']) {
  return serviceProjectRelationships.find((relationship) => relationship.serviceId === serviceId)
    ?.projectSlugs ?? [];
}

export function serviceIdsForProject(projectSlug: ServiceProjectRelationship['projectSlugs'][number]) {
  return serviceProjectRelationships
    .filter((relationship) => relationship.projectSlugs.includes(projectSlug))
    .map((relationship) => relationship.serviceId);
}

export function relatedProjectSlugs(projectSlug: ServiceProjectRelationship['projectSlugs'][number]) {
  const serviceIds = serviceIdsForProject(projectSlug);
  return [
    ...new Set(
      serviceProjectRelationships
        .filter((relationship) => serviceIds.includes(relationship.serviceId))
        .flatMap((relationship) => relationship.projectSlugs)
        .filter((slug) => slug !== projectSlug)
    )
  ];
}
