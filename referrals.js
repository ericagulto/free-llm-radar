/* ============================================================
   Free LLM Radar — referral program data
   ------------------------------------------------------------
   Read REFERRALS.md alongside this file. The terms matter.

   STATUS VALUES
     'live'      program is open, you can generate a link now
     'paid-only' reward requires the referred user to PAY — a poor fit
                 for a free-tier audience, see the note on each
     'dead'      program has ended or is not accepting participants
     'unknown'   could not verify from a primary source — do not rely on it

   PUBLIC POSTING
     Whether the program's own terms permit publishing your link on a
     public website. Several prohibit "spam or other malicious promotion
     methods" without defining the boundary. Treat 'unclear' as risky.

   YOUR LINK
     Put your own referral URL in YOUR_LINKS below. Leave it empty and
     the dashboard falls back to the plain signup URL with no referral
     tracking — that is the safe default. Never ship someone else's link.
   ============================================================ */

window.YOUR_LINKS = {
  // Fill these in from each provider's console. Leave '' to disable.
  // Example:  qoderwork_cn: 'https://qoder.com.cn/r/YOURCODE',
  qoderwork_cn: '',
  zai: '',
  workbuddy: 'https://workbuddy.ai/invite?code=VHQSZ8N6',
  minimax: '',
  bai: ''
};

window.REFERRALS = {
  disclosureShort:
    'Some signup links on this page are referral links. If you sign up through one, ' +
    'this site earns platform credits at no extra cost to you.',

  disclosureLong:
    'Referral disclosure. Some links on this page are referral links. If you create an account ' +
    'through one, the site operator earns platform credits or rewards from that provider, at no ' +
    'additional cost to you. This is a material connection and you should weigh it when reading ' +
    'any recommendation here. Referral availability does not affect an offer\'s position in the ' +
    'default sort order — sorting is driven by the sort control you select, and you can filter to ' +
    'hide referral-linked offers entirely. Offers with no referral program are listed on equal ' +
    'terms. We do not accept payment for placement, and no provider has editorial input into ' +
    'these descriptions.',

  // Maps an offer id (from data.js) to a referral program id above.
  // Kept here rather than in data.js so the daily refresh job cannot wipe it.
  offerRefs: {
    // 'qoder' in data.js is Qoder *international* (client-bound, no live referral programme).
    // The live referral programme is QoderWork CN — a different product on the same platform,
    // so it is not mapped to an existing offer.
    zhipu: 'zai',
    glmnight: 'zai',
    'zcode-trust': 'zai',
    'zcode-weekend': 'zai',
    minimaxcode: 'minimax',
    minimaxplat: 'minimax',
    // WorkBuddy is both an offer and a programme. The offer was added on 29 Sep so the
    // invite link has a real row to live in — the programme alone had nowhere to render.
    workbuddy: 'workbuddy'
  },

  programs: [
    {
      id: 'qoderwork_cn',
      provider: 'QoderWork CN',
      status: 'live',
      reward: '200 Credits per successful referral',
      bonus: '+1,000 Credits per 5 successful referrals',
      cap: '200 referrals / 40,000 Credits lifetime',
      trigger: 'Referred user registers, logs into the client, and consumes at least 1 Credit within 14 days',
      paidRequired: false,
      publicPosting: 'unclear',
      termsUrl: 'https://help.aliyun.com/zh/lingma/qoderwork-cn-new-user-credits-claim-and-referral-reward-program-terms-and-conditions',
      getLinkUrl: 'https://qoder.com.cn/referral',
      note: 'The best fit on this list for a free-tier audience — payout triggers on free usage, not payment. ' +
            'Terms prohibit spam, unsolicited messages and "other malicious promotion methods" without defining ' +
            'the boundary, and require compliance with advertising law plus truthful representation. A public ' +
            'directory is defensible; mass-posting the link is not.'
    },
    {
      id: 'zai',
      provider: 'Z.ai / GLM',
      status: 'paid-only',
      reward: '10% of the referred user\'s first order value, in Credits',
      bonus: 'Additional 10% of the total for every cumulative 30 valid referrals',
      cap: 'No upper limit on invites',
      trigger: 'Referred user completes their FIRST PAID SUBSCRIPTION within 72 hours of registering',
      paidRequired: true,
      publicPosting: 'unclear',
      termsUrl: 'https://docs.z.ai/devpack/credit-campaign-rules',
      getLinkUrl: 'https://z.ai/subscribe?invitedialog=true',
      note: 'Payout requires a paid subscription, and you must land 3 paying referrals before anything is ' +
            'released — accrued rewards sit pending until then. Terms explicitly prohibit "artificial engagement": ' +
            'paying for services, joining booster groups, or exchanging non-genuine social engagement to complete ' +
            'tasks. Fraud detection runs on phone, email, device ID, IP and payment account, and associated ' +
            'accounts are disqualified together. Credits are non-transferable and non-refundable.'
    },
    {
      id: 'workbuddy',
      provider: 'WorkBuddy (Tencent)',
      status: 'live',
      reward: '50 points when the referred user first uses the product, +100 more if they use it on 3 days within 7 days',
      bonus: 'Both sides +500 points if the referred user pays for a personal upgrade within 30 days',
      cap: 'Not stated in the published rules',
      trigger: 'Referred user registers through your link AND actually uses the product — registration alone does not count',
      paidRequired: false,
      publicPosting: 'unclear',
      termsUrl: 'https://www.workbuddy.cn/events/invite/',
      getLinkUrl: 'https://www.workbuddy.cn/events/invite/',
      note: 'VERIFIED from the official event page. One of only two programmes here that pays on FREE usage — ' +
            'no purchase needed. The referred user gets 2,000 points on signup, so the offer is genuinely ' +
            'attractive to share. WINDOW: the event runs to 30 September 2026, so it may close imminently. ' +
            'Rewards are platform points, not cash — they offset your own WorkBuddy usage. A separate, older ' +
            'campaign at copilot.tencent.com/fission (100 Credits/invite, 3,000 for the invitee) is marked ' +
            'ended; do not cite it.'
    },
    {
      id: 'minimax',
      provider: 'MiniMax',
      status: 'paid-only',
      reward: 'Credits equal to 10% of what the referred user actually pays on an eligible order',
      bonus: '—',
      cap: 'No cap stated in the official FAQ',
      trigger: 'Referred user completes an eligible PAID order on a Token Plan subscription',
      paidRequired: true,
      publicPosting: 'unclear',
      termsUrl: 'https://platform.minimax.io/docs/token-plan/faq',
      getLinkUrl: 'https://platform.minimax.io/subscribe/coding-plan',
      note: 'VERIFIED from the official Token Plan FAQ. The referred user gets a 10% checkout discount, which ' +
            'is the genuinely shareable half of this programme. Your side pays only on a paid order. Credits ' +
            'expire 90 days after issue, can only offset MiniMax Open Platform API fees, and cannot be ' +
            'withdrawn or transferred. Fraudulent refunds on the referred order revoke the reward. A free-tier ' +
            'audience will almost never trigger this.'
    },
    {
      id: 'bai',
      provider: 'B.AI',
      status: 'unknown',
      reward: 'Documented 300,000-Credit gift pack for registering via an invite code',
      bonus: 'Inviters earn a Coin rebate (base 1% of valid top-ups)',
      cap: '—',
      trigger: 'Referred user registers through the invite link',
      paidRequired: false,
      publicPosting: 'unclear',
      termsUrl: null,
      getLinkUrl: 'https://chat.b.ai',
      note: 'Blockchain-based platform with a documented invite gift pack. Gift credits expire 30 days after ' +
            'issuance. Third-party reported only — verify terms before publishing.'
    },
    {
      id: 'qoder_intl',
      provider: 'Qoder (international)',
      status: 'dead',
      reward: 'Was 200 Credits per referral + 1,000 per 5',
      bonus: '—',
      cap: 'Was 100 successful referrals per calendar month',
      trigger: '—',
      paidRequired: false,
      publicPosting: 'n/a',
      termsUrl: 'https://docs.qoder.com/zh/events/referral.md',
      getLinkUrl: null,
      note: 'ENDED. Qoder\'s own terms state the invite programme closed on 30 January 2026, and that ' +
            'historical invitations can no longer earn Credits. Several blogs still list this as active — ' +
            'they are out of date. Do not build around it.'
    }
  ]
};
