# Completed three-model analysis protocol

Scope: frozen offline development answers for GPT-6.1-Sol, GPT-6.1-Terra and
Claude-Sonnet-5-5. This analysis sends no API requests, changes no quiz/gold,
and does not stop acquisition. The artifact is an interactive experiment
report/dashboard, not a submission-ready static figure package.

Expected per model: class1 1836 independent answers (612 conditions x3);
class2 6912 turns (768 three-turn sequences x3 conversations);
class3 378 answers (126 subquestions x3). Total27378 actual answer records.

Primary scoring reuses the frozen T025 v3 scorer for class1/2 and frozen EN6
source-reference labels for class3. Genuine malformed/refused/wrong answers
remain in denominators. Outer JSON fences may be parsed, strict format
reported separately. No unit rescue, correctness filtering or gold edits.

Audit every selected raw SHA256, unique client slot and request nonce when
present. Verify class2 exact previous-response IDs, raw hashes and route
binding. Reused provider IDs are descriptive audit flags; they do not prove
duplicates when raw envelopes differ or certify backend independence.

Within-model: class1 effort x advice grid, task/chain/source strata, components
and bbox sensitivity, repeated-answer consistency; class2 final-turn accuracy,
three-turn joint success, advice-path cube, historical contamination and
matched same12-event high-effort independent comparison; class3 option
difficulty, task, Q1/Q2, rejected-option roles, repeated-answer reliability,
confidence/Brier/ECE with explicit valid-confidence coverage.

Cross-model: exact same input slots, separate cohorts. Aggregate event means;
95% percentile intervals resample scenes (4000, fixedseed20261108), not calls
or turns. Contrasts are paired event means clustered by scene; sign-flip
inference is exploratory, Holm-adjusted within declared contrast family.
Class3 additional episode-family clustering sensitivity is reported.

Cross-class synthesis uses a profile rather than pooled micro accuracy:
class1 high effort, class2 final turn(high), class3(all high). Different events,
answer schemas and supports prevent interpreting the profile as one general
tracking-success score. A matched family subset is exploratory, not a new
benchmark split. Class1/2 task tiers are between events: missing two task
variants/event means no within-event task-difficulty causal claim/full3Dgrid.

Conversation versus independent comparison matches event/final advice but
changes context, supplied prior questions/images, and inference budget; it
does not isolate a causal curriculum effect. Three successes per question
are repeats, not three independent episodes. Normal/hard designed option
strata need not yield monotone accuracy. Class3 reference is observed action
correspondence, not unseen forecast, optimal control or successful recovery.

Text analysis: exposed answer/reasoning only, versioned lexical self-revision
markers and small qualitative examples. Marker counts measure visible text
patterns, not hidden reasoning or a proven error-correction mechanism.

No WM, closed-loop runtime, official SR/TR/CR, held-out paper-ready evidence,
independent human annotation or unique novelty claims. Historical State
Summary and retired action/format pilots are excluded from these totals.

Outputs: source manifest, audited scored answer CSV/JSONL, aggregate JSON,
per-case texts without credentials/private paths, local standalone SVG
interactive report, downloadable tables, browser verification, public URL.
