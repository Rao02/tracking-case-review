# Insight / evidence audit — 2026-11-10

This audit supersedes any implication that the three candidate metrics already establish new model mechanisms. No raw answers, gold, quiz content or running queues were changed; no new API/simulator calls were made.

## What was actually missing

Context redistribution, compensated closure, and WP transport had been computed. Their presentation was incomplete: the first two lacked an immediate four-model comparison with uncertainty, and the mean WP cost mixed error frequency with magnitude. Joint-session excess was computed but mainly downloadable. Gain–harm bounds were a mathematical definition/identification warning, not an executed empirical result. More formulas do not fill these gaps.

## An important negative diagnostic

For each A/B condition, retain A's error frequency and B's response distribution, and uniformly permute the three non-reference A labels. This descriptive exchangeability benchmark gives U0. It does not assert that physical wrong directions are exchangeable in reality; it asks whether observed compensated errors exceed a simple explanation based on existing errors.

|Model|Observed wrong-but-consistent mass U|Wrong-label benchmark U0|U−U0, pp [family bootstrap 95%]|
|---|---:|---:|---:|
|Sol|0.0370%|0.0123%|+0.0247 [0, +0.0712]|
|Terra|0.1852%|0.1481%|+0.0370 [−0.1481, +0.2550]|
|Sonnet|6.6296%|6.8642%|−0.2346 [−1.1821, +0.7531]|
|DPSK|3.2963%|2.3951%|+0.9012 [+0.1331, +1.7038]|

Sonnet's 25.43% compensated fraction of apparent agreement is a real descriptive decomposition, but is not evidence of unusually aligned errors beyond this benchmark. DPSK has exploratory positive excess under this particular reference distribution. This is not a confirmatory test, proof of hidden self-correction, or a novel model mechanism.

WP error magnitude conditional on a wrong valid pair: Sol0.0528m (21 wrong pairs); Terra0.1256m (103); Sonnet0.1810m (2633); DPSK0.1300m (830). These are commanded complete-path distances, not target loss or collision penalties. Sol's tiny wrong-pair population must remain visible. Intervals resample 44 original source families, not action pairs as independent units.

Saved C tree uniform-label success is7/27=25.93%. Always choose A/B/C yields20.20/34.34/23.23%. These are no-vision controls computed from the exact tree, not new model runs. Best fixed label B is an in-sample diagnostic, not a tuned held-out baseline. Root state distributions are directly comparable across models; downstream recovery populations are model-selected.

## Stronger tracking-specific questions and missing evidence

1. **Does past information support a current target state, or anchor the model to a stale state?** Existing history associations and three matched-box events cannot establish this. Need timestamp-aligned same-event tests holding the current visual evidence and final question fixed while varying the age of past evidence. Identity/position/occlusion facts must be simulator-verified, and a stale statement must have actually been true at its timestamp. Do not equate longer reasoning traces with better temporal grounding.
2. **Does state recognition translate into task-viable motion?** A identifies a generating reference path, not the uniquely safe/best following path. B measures outcome correspondence. Neither proves use of WP or task relevance. Need action masking, relabeling/reassignment with recomputed gold, and same-current-state state-description/action tests. Defining a conditional recognition-to-action gap requires exact matched states, target identity and viable-action sets; no such three-class joint cohort has yet been certified.
3. **Can the model recover from a shared deviation rather than merely recover from an easier set of self-selected states?** Existing C paths distinguish self-created deviations from repair, but cannot fairly rank recovery across models. Need every model queried at the same saved after_D/after_CD nodes, with identical current evidence and allowed choices. Report event entry counts and oracle reachability under the fixed horizon. C engineering gates were manually selected, so held-out physical difficulty and threshold sensitivity are still necessary before paper-level generalization claims.

## Small additional package (proposed, not launched)

Use 24 events per relevant protocol, 8 each STT/AT/DT; balance scenes, source mode, turns, occlusion and encounters. Reusing existing analysed cases produces a mechanism-validation set, not independent held-out confirmation. To make confirmatory/generalization claims, freeze separately source-isolated new events; old control answers cannot be inherited by those new events. AB/C need not silently share event IDs: audit exact state/image/target equivalence before any cross-protocol claim. Old exact matching control slots may be reused; modified requests get new IDs. All proposed counts below are per four models and three complete independent answers, with high effort accepted at the provider. No capped/truncated answers count.

- WP dependence:24 AB events ×2 stages ×3 conditions(full, masked action, reassign actions to labels with gold recomputed) ×3 draws ×4 models =1,728 calls. Reuse the 576 original full calls only if the exact contract matches; at least1,152 new calls. This tests dependence and assignment invariance, not just recognizability of image layout.
- Shared-state recovery:24 C events ×2 saved deviation nodes ×3 draws ×4 models =576 new standalone calls. They measure current-state recovery. Any native-history comparison is a separate protocol, not silently pooled.
- Stale-information control:24 source-separated events ×4 conditions(none, current, actual0.6s-old, actual1.2s-old evidence) ×3 draws ×4 models =1,152 new calls. The two ages are provisional manually chosen design points; admit only cases with exact source coverage and verified state change. Hold final question/current evidence fixed and length/style-match the three nonempty advice conditions; report the no-advice length difference. Select the age points on calibration scenes before freezing a held-out set. No monotonic stale-information effect is assumed.

Minimum new calls if originals match:2,880 across four models; without exact original-control reuse,3,456. The latter is the relevant count for fully new source-held-out cases. This is a feasible offline evidence package, not an autonomous controller/harness project. Do not launch automatically from this audit. All need case construction, contract validation and frozen calibration/held-out separation first. If the intended central claim is only descriptive benchmark behavior, narrower claims can be supported without every proposed test; causal action dependence, stale-state anchoring or general recovery capability cannot.

## Metric priorities

Main: same-fact preservation/update; simulator-defined viable-action selection and bounded failure; shared-state recovery. Supporting: repeated-error distribution and component scores. Exploratory: history MI/ANOVA, context redistribution and wrong-error alignment. Physical-language metaphors and additional formula counts are not evidence of novelty. External first-use claims require a separate systematic prior-art review.

## Directly observed process attrition, not a new-mechanism claim

Let L=P(final failure | root action is C or D). Both root choices have an oracle-successful continuation in the saved tree. This is loss of a finite-budget success opportunity under the model’s own later choices, not irreversible physical failure. Root states are shared, but model-selected post-root states are different.

|Model|Failure after viable root|Failures/entries|95% source-family interval|
|---|---:|---:|---:|
|gpt-6.1-sol|21.54%|53/246|[14.05%, 29.43%]|
|gpt-6.1-terra|40.38%|105/260|[31.60%, 49.79%]|
|claude-sonnet-5-5|51.09%|140/274|[42.93%, 60.93%]|
|deepseek-v4.1-flash|42.28%|115/272|[34.03%, 52.96%]|

## Temporal component audit

Computed from the same frozen Class-1 scored source: 11 temporal events ×3 efforts ×3 draws =99 answers per guidance/model. Four guides give396 answers/model. Outcomes are disjoint: full correctness; correct event membership with partial order error; correct membership with complete reversal (Kendall tau−1); membership error. Across all four models' false-guide cohorts (396 answers), none had correct membership plus complete reversal. That does not establish misleading-advice resistance: membership errors and partial order errors remain, and the false prompt may jointly advise including unrelated images and reversing chronology. Factor-specific advice controls are needed for attribution.

## Additional annotation/identifiability gap

AB gold and DESIGN metadata explicitly retain independent human ambiguity review pending. A gold denotes the generating reference correspondence, not the uniquely viable or best tracking policy; multiple hidden paths can be consistent with sparse views. Before promoting A to planning evidence, independently inspect an appropriately balanced sample for answer identifiability and acceptability of alternatives. This cannot be solved by a more sophisticated score. Current B covers all24 outcome-label permutations; the former sequential A→1 pattern is not a constant current gold.
