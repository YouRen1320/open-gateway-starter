# Security policy

## Supported versions

Security fixes are applied to the latest release on the default branch. Pre-release snapshots and modified deployments are not independently supported.

## Reporting a vulnerability

Use GitHub private vulnerability reporting for the repository. Include:

- A concise description and affected route or module.
- Reproduction steps or a minimal proof of concept.
- The security impact.
- Any suggested mitigation.

Do not include credentials, personal data, or exploit details in a public issue.

If private vulnerability reporting is not enabled, open a public issue requesting a private maintainer contact without disclosing the vulnerability itself.

## Response expectations

Maintainers should acknowledge a complete report within five business days, assess severity, and coordinate disclosure after a fix or mitigation is available. These are project response targets, not a commercial SLA.

## Scope boundary

This repository is a frontend starter. It does not provide a secure place for model-provider keys, payment credentials, session secrets, or private tokens. A deployed derivative is responsible for its own backend, authentication, authorization, storage, logging, privacy, and incident response controls.
