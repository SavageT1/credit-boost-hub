-- Add two SEO-focused blog posts
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  meta_description,
  published,
  published_at
)
VALUES
(
  'What Credit Score Do You Need to Buy a House? (And How Tradelines May Help)',
  'what-credit-score-do-you-need-to-buy-a-house',
  'Learn common mortgage score ranges, what lenders review beyond score, and where authorized-user tradelines may fit into your preparation strategy.',
  '<h2>Quick answer: it depends on the loan type</h2><p>There is not one single score for every mortgage. In many cases, lenders also review debt-to-income, payment history, reserves, and recent credit activity.</p><ul><li><strong>Conventional:</strong> often stronger pricing with higher scores.</li><li><strong>FHA:</strong> may allow lower scores, but requirements vary by lender.</li><li><strong>VA/USDA:</strong> lender overlays still apply even when program minimums differ.</li></ul><h2>What lenders usually look at besides score</h2><ul><li>Recent late payments</li><li>Credit utilization trends</li><li>Collections/charge-offs and dispute activity</li><li>Debt-to-income ratio</li></ul><h2>Where tradelines may help</h2><p>Authorized-user tradelines may help certain profiles by improving average age or utilization mix. They are not guaranteed to increase approval odds and should be paired with overall profile cleanup.</p><h2>Best next step before applying</h2><p>Review your full report 60-90 days before mortgage shopping. Resolve inaccuracies first, then evaluate whether tradelines fit your timeline.</p>',
  'What credit score is needed to buy a house? Learn typical score ranges by loan type and where tradelines may help your mortgage prep strategy.',
  true,
  now()
),
(
  'How Many Tradelines Do You Really Need? A Practical Guide',
  'how-many-tradelines-do-you-really-need',
  'A realistic framework for deciding whether you need 1, 2, or more tradelines based on profile depth, utilization, and derogatory history.',
  '<h2>There is no universal number</h2><p>The right number of tradelines depends on your current profile. Thin files often respond differently than established files with heavy negatives.</p><h2>General planning framework</h2><ul><li><strong>Thin/new profile:</strong> 1-2 may be enough to test impact.</li><li><strong>Moderate profile:</strong> often 1-3 depending on utilization and account age.</li><li><strong>Negative-heavy profile:</strong> repair-first is usually smarter before adding more lines.</li></ul><h2>When adding more may not help much</h2><p>If you have recent late payments, open collections, or severe derogatories, additional tradelines can have limited effect until core issues are addressed.</p><h2>Use a target-score strategy</h2><p>Set a target range, track utilization, and evaluate changes over time instead of expecting one-step results. Tradelines are one tool in a broader profile strategy.</p>',
  'How many tradelines do you need? Use this practical framework to choose 1-3 tradelines based on your profile and avoid overbuying.',
  true,
  now()
);