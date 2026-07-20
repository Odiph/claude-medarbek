# Goal 2 — Decide the Use Case (within the issue)

The issue is the space. A **use case** is one concrete situation inside it where we do **one job for one actor** — narrow enough to build and test by December. One issue holds many use cases; we pick the single sharpest one to prove first.

A good use case is: **one actor · one job · one trigger · a clear "done."**

> Weak (still an issue): "help HOAs engage members."
> Strong (a use case): "when a board member hosts a community event, they collect RSVPs and run live widgets so more residents show up and participate."

---

## Step 1 — List candidate use cases within the issue
Brainstorm the concrete situations the issue shows up in. Aim for 4–6.

| # | Use case (one actor, one job, one trigger) |
|---|---|
| A | |
| B | |
| C | |
| D | |

## Step 2 — Score them
Score 1 (low) – 5 (high). Highest total is our first use case.

| Use case | Pain intensity | How testable this week (cheap to prove?) | Reachable customers | Path to revenue | Buildable by Dec (MVP) | Total |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|
| A | | | | | | |
| B | | | | | | |
| C | | | | | | |
| D | | | | | | |

**Weight testability + reachability highest right now.** We can't validate what we can't test cheaply or customers we can't reach — a high-pain use case we can't get in front of is not the one to start with.

## Step 3 — Write the use-case statement
For the winner:

> When **[actor]** hits **[trigger]**, they need to **[job]**, so that **[outcome]**. We'll know it worked when **[observable signal]**.

## Step 4 — Name the riskiest assumption
Every use case rests on one belief that, if wrong, sinks it. Name it.

> This use case only works if we're right that: ____________________

## Step 5 — Define the first test
The smallest thing that attacks that assumption. The **community-event pilot** is the leading candidate — but tie it to a specific assumption, or it's just a demo.

| | Fill in |
|---|---|
| Assumption under test | |
| Cheapest test (interview / pilot / fake-door / concierge) | |
| Signal = validated | |
| Signal = killed | |

---

## Definition of done for Thursday
- [ ] One issue statement locked (from [Goal 1](./01-define-the-issue.md))
- [ ] 4–6 candidate use cases listed and scored
- [ ] One use case chosen, statement written
- [ ] Its riskiest assumption named
- [ ] First test defined with a pass/fail signal

**Then we stop.** No features, no roadmap, no revenue model until the first test returns a signal — and we hold the issue fixed until **$100k**.
