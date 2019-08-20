# github-deploystatus

This action makes it easier to report back deploy status to github.

## Usage 

```
- name: Report success
  uses: unacast/actions/github-status@v0.9.0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    state: success

- name: Report fail
  uses: unacast/actions/github-status@v0.9.0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    state: failure
  if: failure()
```
