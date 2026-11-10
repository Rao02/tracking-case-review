# Candidate diagnostic contributions / 候选辨析指标

These are locally proposed operational constructions for this tracking protocol, not verified first-ever metrics. Established probability, U-statistics, variance decomposition, cycle consistency and physical trajectory distances are credited as existing tools. No correctness or dataset changes were made. All results are post-hoc exploratory diagnostics.

这里提出的是面向本项目协议的候选指标设计，不是已经核定的全球首次指标。创新需要由问题定义、可识别的量、额外揭示的现象以及冻结后的验证共同支撑，不能靠改名。第一、二类和第三类之间没有共同独立事件全覆盖，因此不计算跨不同事件集的“能力转化因果率”。

## 1. Guidance-conditioned context redistribution energy / 上下文重分配能量

For each matched event/current-guidance cell c, hold the final prompt, media, schema and high effort fixed. Let p_N(c) be native turn-3 correctness averaged over the 16 histories and p_D(c) be independent Class-1 correctness. Define delta_c=p_N(c)-p_D(c).

Net context contrast: Delta=E_c[delta_c].

Redistribution: R_ctx=E_c[delta_c^2]-(E_c[delta_c])^2.

The mean measures net change; R_ctx measures whether context is associated with heterogeneous changes across matched final conditions. Delta=0 can coexist with large R_ctx. Large R_ctx may also expose question ambiguity, not useful adaptation. Every interpretation must include event contrasts and exclusions of the known reference-frame ambiguity.

Estimator: n=3 repeated cohorts. d_cr = mean_h Y_N,chr - Y_D,cr. Let z_cr=d_cr-mean_c d_cr. R_hat=mean_c sum_{r!=s} z_cr*z_cs/[n(n-1)]. Conditional means over history use 16 independent native sessions per current guide and repeat. Draw indices across protocols are arbitrary, not shared seeds; report repeat independence assumptions and preserve negative corrected estimates.

Same final question equality is checked on actual contract objects, including all image hashes. This contrast changes native history, prior evidence and total inference budget together. It is not a pure curriculum intervention. Bootstrap resamples the 12 matched scenes/events (5,000, seed20261110); task type and source family are not multiplied into new independent events.

意义：平均提升8个百分点可能来自许多事件各提升一点，也可能主要是一个参考系约定被历史补全。该量用于区分这种结构，而不是把所有提升叫作教学成功。

## 2. Compensated action closure / 动作对应错误补偿

Class 3 A identifies an action a_hat from an observed transition; B predicts a mapping f_hat from actions to candidate outcomes. Let a* be the source reference action and o*=f*(a*) its simulator-grounded outcome. Candidate labels, diagrams and endpoint-image equality were checked on all300 matched conditions.

K=P[f_hat(a_hat)=o*].

G=P[a_hat=a* AND f_hat(a*)=o*].

U=P[a_hat!=a* AND f_hat(a_hat)=o*].

K=G+U; rho_comp=U/K if K>0, else NA.

rho_comp is the fraction of apparent cross-task consistency supported by compensating mistakes. Always report K, G and U: a low ratio with almost no consistency is not success. Each condition averages all3x3 independent A/B response pairs before event aggregation; nine products are not nine independent trials. Source-family cluster bootstrap for the ratio preserves family weights and conditions.

This is a distributional composition of independent protocols, not an observed reasoning cycle or hidden-state measurement. A/B use different inputs. Invalid parsed values are not silently repaired. The diagnostic parser may accept a unique JSON object embedded in text; these semantic scores do not erase strict-format violations. Diagram/reference correspondence does not certify unique physical inverse dynamics.

意义：模型可以“逆向判断错、正向预测也错”，但两处错误恰好互相支持。这比单独统计A分数、B分数或一致率更能暴露虚假的自洽。

## 3. Simulator-grounded action-confusion transport / 仿真对齐的动作混淆运输代价

For a B prediction action a -> outcome image j, use the gold bijection f* to recover the action a_tilde=(f*)^-1(j) that actually produced that image. Each candidate contains H=8 ordered relative waypoints w_ak=(x,y) and headings theta_ak. Define pair costs:

c_pos(a,a_tilde)=1/H sum_k ||w_ak-w_a_tilde,k||_2, meters.

c_yaw(a,a_tilde)=1/H sum_k |atan2(sin(theta_ak-theta_a_tilde,k),cos(...))|, radians (dashboard displays degrees).

Aggregate against the empirical predicted action-substitution distribution, separately for position and heading. These are fixed-correspondence transport costs; no optimal-transport minimization is performed. The name “transport” must not imply a Wasserstein distance. Correct mapping gives exactly zero; wrong but nearly identical trajectories can give small cost; full ordered paths distinguish reversals with similar endpoints. No hand-chosen weight combines meters and degrees.

All paths passed the frozen native feasibility protocol. The cost is computed on commanded complete ordered paths; it is not the actual executed target-loss cost, collision regret or official tracking score. Display actual executed examples separately. Invalid action/image mappings have undefined physical cost: report valid-pair coverage alongside the conditional cost, never assign zero or invent a large penalty. Four models each have300 questions x3 answers x4 action pairs=3,600 potential pairs. Sonnet has3,596 parsable physical pairs in this frozen snapshot.

Inference: event-level distributions aggregate six conditions (three distractor tiers x two stages). The displayed condition mean uses equal condition weights; source-family bootstrap resamples families, not the 3,600 pairs. Conditional means can be coverage-biased; do not rank a model solely by its continuous cost.

意义：错误不是同等严重的。把一条近似路径的结果认错，与把后退/方向相反路径的结果认错，不能只记同一个0分。路径顺序、空间幅度和旋转幅度共同构成更有跟踪特色的错误描述。

## Supporting metrics / 支撑分析

- Conditional MI of past guidance, with a matched future-guidance negative control and2,000 permutations; Holm across4models x2diagnostics.
- Cross-repeat ANOVA: 3main+3pair+1triple guidance effects; no physical-energy claim.
- Within-session joint-success excess relative to same-condition independent marginals; not measured single-turn improvement.
- Same-fact joint table, loss/repair conditional probabilities, signed probability flow J and bounded time-reversal JS. Borrowed from information theory/statistical-physics reasoning; not thermodynamic entropy production.
- C direct CC success, recovery DC/CDC, entry coverage and repair dependence; not same-state randomized recovery comparisons.

## Prior-art positioning and next falsification

Multi-turn unreliability is already studied: Laban et al., *LLMs Get Lost in Multi-Turn Conversation*, https://www.microsoft.com/en-us/research/publication/llms-get-lost-in-multi-turn-conversation/ . Thus error persistence or multi-turn effects alone are not first-ever contributions.

Mutual-information estimation bias: Paninski2003, https://www.cns.nyu.edu/~lcv/pubs/makeAbs.php?loc=Paninski03 . Forward/reverse trajectory distinguishability: Roldan & Parrondo2010, https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.105.150607 . Our protocols do not satisfy the thermodynamic assumptions of that physical interpretation.

Closest-neighbour literature on bidirectional consistency, consistency-with-wrong-answers, trajectory distance costs and heterogeneous treatment effects must be reviewed before any first-use claim. This page is a candidate evidence package, not such a certification. The distinctive candidate is the combined same-event tracking contract and simulator-linked cross-protocol diagnostics.

The next useful validation is a small frozen holdout: fixed-final-evidence history variants; B action masking/shuffling; randomized labels; and common-state C recovery probes. No new API or simulator calls were made for this dashboard. No private credentials, endpoint configurations or local filesystem paths enter public chart data.
