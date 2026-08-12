import type { CommercialPage, CommercialPageId, LocalizedText, ServiceProjectRelationship } from './types';

const copy = (en: string, zh: string): LocalizedText => ({ en, 'zh-TW': zh });

export const commercialPages: Record<CommercialPageId, CommercialPage> = {
  home: {
    publishedAt: '2026-08-01',
    title: copy(
      'Web Development for Taiwan Small Businesses | Jay Hsieh',
      '台灣個人與小型企業網站開發｜謝孟哲'
    ),
    heading: copy('Web development for Taiwan small businesses', '台灣個人與小型企業網站開發'),
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
            'I work primarily with individuals and small businesses in Taiwan that need a clear public website or a focused web application. Overseas clients can work with me in English, while pricing, working hours, and market context remain Taiwan-based.',
            '我主要協助台灣個人與小型企業建立清楚的公開網站或聚焦的 Web 應用程式。海外客戶也能以英文合作，但價格、工作時間與市場情境仍以台灣為基礎。'
          )
        ]
      },
      {
        id: 'fit',
        heading: copy('How to judge fit before requesting a proposal', '委託前如何判斷是否適合'),
        paragraphs: [
          copy(
            'A good fit has a clear decision maker, a defined audience or workflow, and someone who can provide content and review milestones. You only need to share the problem, required pages or actions, available material, budget range, and preferred launch window—not a technical specification.',
            '合適的專案需要明確決策者、清楚受眾或流程，以及能提供內容並按節點審查的人。您不必準備技術規格，只要說明問題、必要頁面或行動、現有素材、預算區間與希望上線時間。'
          )
        ]
      },
      {
        id: 'starting',
        heading: copy('What happens after you make contact', '聯絡之後會怎麼進行'),
        paragraphs: [
          copy(
            'Send the service type, budget, timeline, and a short description of what exists and what should change. I will check fit and missing dependencies, then suggest a focused discovery call or clearly explain when the request needs more definition or another specialist.',
            '請提供服務類型、預算、時程，以及目前狀況與希望改變內容的簡短說明。我會確認適合度與缺少的相依項目，再安排聚焦的需求討論；若需求仍需定義或其他專家，也會直接說明。'
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
        heading: copy('Which service should I choose?', '我該選擇哪一項服務？'),
        paragraphs: [
          copy(
            'Choose a marketing site for one focused offer, a portfolio or business site for several services or projects, and a full-stack application when users, stored data, permissions, or integrations are essential. Final scope follows the required outcome rather than a rigid package.',
            '單一聚焦服務適合行銷網站；多項服務或專案適合作品集或企業網站；若必須處理使用者、資料、權限或整合，才需要全端應用程式。最終範圍會依必要成果決定，而不是套用僵化方案。'
          )
        ]
      },
      {
        id: 'inputs',
        heading: copy('What do I need to provide?', '我需要提供什麼？'),
        paragraphs: [
          copy(
            'Provide accurate business facts, permission for supplied assets, one decision maker, consolidated feedback, and necessary account access. Draft content, brand guidance, domain details, analytics, and reference sites are useful but do not need to be polished before the first conversation.',
            '請提供正確商業資訊、素材使用權、明確決策者、集中回饋與必要帳號存取。內容草稿、品牌規範、網域資訊、分析資料與參考網站很有幫助，但初次討論前不必整理得很完整。'
          )
        ]
      },
      {
        id: 'quality',
        heading: copy('What quality checks are included?', '開發包含哪些品質檢查？'),
        paragraphs: [
          copy(
            'The project receives responsive, semantic, keyboard, accessibility, performance, and search-readiness checks appropriate to its risks. Type, content, unit, build, and browser tests are selected around the behavior being delivered; these foundations do not guarantee rankings or sales.',
            '專案會依風險進行響應式、語意、鍵盤操作、無障礙、效能與搜尋基礎檢查。型別、內容、單元、建置與瀏覽器測試會對應實際交付行為，但這些基礎不保證排名或銷售。'
          )
        ]
      },
      {
        id: 'risk',
        heading: copy('What can change the schedule or budget?', '哪些因素會改變時程或預算？'),
        paragraphs: [
          copy(
            'Late content, changing approvers, undocumented integrations, migration work, unclear legal requirements, and newly discovered features can affect both. Listed timelines assume timely access and consolidated feedback; urgent work, regulated data, complex commerce, or additional languages need separate review.',
            '內容延遲、核准者變更、未記錄的整合、資料移轉、不清楚的法規需求與新增功能，都可能影響時程與預算。公開時程假設能按時取得資料與集中回饋；急件、受規範資料、複雜電商或額外語言需另行評估。'
          )
        ]
      },
      {
        id: 'after-launch',
        heading: copy('What happens after launch?', '上線後會怎麼處理？'),
        paragraphs: [
          copy(
            'Handoff and a 30-day defect warranty are included as defined in the proposal. New features, content changes, third-party outages, and unapproved modifications are outside that warranty; optional ongoing maintenance can be quoted separately.',
            '提案所定義的交接與 30 天缺陷保固會包含在專案中。新功能、內容變更、第三方中斷與未經同意的修改不在保固內；持續維護可另外報價。'
          )
        ]
      },
      {
        id: 'questions',
        heading: copy('What is confirmed before scope is fixed?', '固定範圍前會確認什麼？'),
        paragraphs: [
          copy(
            'For websites, we confirm audiences, page actions, content ownership, inquiries, hosting, privacy, redirects, and accessibility. Applications also require user roles, authentication, authoritative data, validation, recovery, integrations, administration, backups, and clear acceptance criteria.',
            '網站會確認受眾、頁面行動、內容責任、詢問流程、主機、隱私、重新導向與無障礙需求。應用程式還要確認使用者角色、驗證、權威資料、輸入檢查、復原、整合、管理、備份與清楚驗收條件。'
          )
        ]
      }
    ]
  },
  projects: {
    publishedAt: '2026-08-01',
    title: copy('Web Development Projects & Case Studies | Jay Hsieh', '網站開發專案與案例研究｜謝孟哲'),
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
    sections: []
  }
};

export const serviceProjectRelationships: readonly ServiceProjectRelationship[] = [
  { serviceId: 'marketing-site', projectSlugs: ['butter-personal-website'] },
  {
    serviceId: 'portfolio-business-site',
    projectSlugs: ['nrg-commerce']
  },
  { serviceId: 'full-stack-application', projectSlugs: ['nrg-commerce', 'evosnake'] }
] as const;

export function projectSlugsForService(serviceId: ServiceProjectRelationship['serviceId']) {
  return (
    serviceProjectRelationships.find((relationship) => relationship.serviceId === serviceId)?.projectSlugs ??
    []
  );
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
