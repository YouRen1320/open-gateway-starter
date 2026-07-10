# Contributing

Thank you for helping improve the starter.

## Before opening a pull request

1. Discuss significant architecture, data contract, directory, routing, or cross-module changes in an issue first.
2. Explain the goal, current problem, viable options, migration impact, rollback approach, and completion criteria.
3. Keep unrelated refactors out of the change.
4. Install with `npm ci` and run `npm run check`, including the public-file safety scan.

## Content and security rules

Contributions must not add:

- Real or full-format production credentials.
- Personal customer or employee information.
- Private infrastructure names, IP addresses, SSH aliases, or deployment paths.
- Unverified claims about price, uptime, compliance, customers, refunds, or service levels.
- Product-specific brand assets without clear ownership and license information.
- Controls that look functional but have no behavior or disabled explanation.

Demo values must remain fictional, visibly labeled, and invalid for production use.

## Code expectations

- Use ES modules and preserve the documented dependency direction.
- Add concise comments for component responsibilities, data sources, non-obvious mappings, and important side effects.
- Use semantic design tokens instead of hard-coded brand values in JSX.
- Preserve keyboard access, visible focus, reduced motion, and 375px layouts.
- Add or update tests for behavior and data contracts.
- Do not weaken validation to make an invalid external response appear healthy.

## Commit sign-off

By contributing, you certify that you have the right to submit the work under Apache License 2.0. Add a Developer Certificate of Origin sign-off:

```bash
git commit -s -m "Describe the change"
```

## Pull request description

Include:

- Goal and scope.
- Verified behavior and commands run.
- Screens or routes affected.
- Migration and rollback notes for breaking changes.
- Backward-compatibility compromises, if any.
- Intentional non-goals.
