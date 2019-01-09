workflow "Build" {
  on = "push"
  resolves = "Docker build"
}

action "Lint" {
  uses = "actions/action-builder/shell@master"
  runs = "make"
  args = "lint"
}

action "Test" {
  uses = "actions/action-builder/shell@master"
  runs = "make"
  args = "test"
}

action "Docker build" {
  needs = ["Lint", "Test"]
  uses = "actions/action-builder/docker@master"
  runs = "make"
  args = "build"
}
