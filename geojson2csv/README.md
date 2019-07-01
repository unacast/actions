# geojson2csv
Github Action for tansforming geojson FeatureCollections to CSVs with WKT geometry. 

## Usage

## Example Workflow file

An example workflow to transform a geojson in the repository

```
workflow "Deploy geometries" {
  on = "deployment"
  resolves = "Transform to csv"
}

action "Transform to csv" {
  uses = "unacast/actions/geojson2csv@master"
  runs = "geojson2csv"
  args = "input.geojson output.csv"
}
```