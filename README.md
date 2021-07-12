# package-json-badges

Serverless badges from your `package.json` with Github Actions.

![build](https://raw.githubusercontent.com/action-badges/package-json-badges/badges/.badges/main/build-status.svg)
![coverage](https://raw.githubusercontent.com/action-badges/package-json-badges/badges/.badges/main/coverage.svg)
![tag](https://raw.githubusercontent.com/action-badges/package-json-badges/badges/.badges/github-tag.svg)
![license](https://raw.githubusercontent.com/action-badges/package-json-badges/badges/.badges/main/package-license.svg)
![node](https://raw.githubusercontent.com/action-badges/package-json-badges/badges/.badges/main/package-node-version.svg)

Examples:

```yaml
name: Make package.json Badges
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Make version Badge
        uses: action-badges/package-json-badges@0.2.2
        with:
          file-name: package-version.svg
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          integration: version

      - name: Make license badge
        uses: action-badges/package-json-badges@0.2.2
        with:
          file-name: package-license.svg
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          integration: license

      - name: Make node version badge
        uses: action-badges/package-json-badges@0.2.2
        with:
          file-name: package-node-version.svg
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          integration: node-version
```

All of the standard action-badges [parameters](https://github.com/action-badges/core/blob/main/docs/github-action.md#parameters) can also be used.

