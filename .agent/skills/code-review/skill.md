# Skill: Automated Code Review

## Description
Use this skill when the user asks for a code review, pulls request analysis, or code quality check on modified files or specific modules.

## Review Focus Areas
Evaluate the provided code against the following standards:
1. **Correctness & Edge Cases:** Look for null pointers, unhandled exceptions, boundary condition bugs, and logical flaws.
2. **Performance & Resource Management:** Identify inefficient loops, missing database indexing patterns, N+1 queries, or unreleased resources.
3. **Maintainability & Readability:** Check for clean naming conventions, single-responsibility principle violations, and overly complex methods.
4. **Security:** Flag hardcoded secrets, injection vulnerabilities, or insecure data handling.

## Execution Steps
1. **Identify Changes:** Scan the specified files, git diff, or code snippet provided by the user.
2. **Categorize Feedback:** Group findings by severity (Critical/Bug, Warning/Performance, Suggestion/Style).
3. **Provide Actionable Fixes:** For every issue found, explain *why* it's a problem and provide a concise code snippet showing the corrected implementation.
*Verification:* Ensure all suggested code changes compile cleanly and do not introduce breaking interface changes.