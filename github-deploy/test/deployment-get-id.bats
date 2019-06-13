#!/usr/bin/env bats

#load bootstrap

PATH="$PATH:$BATS_TEST_DIRNAME/../bin"

export GITHUB_EVENT_PATH="$BATS_TEST_DIRNAME/fixtures/deployment.json"

@test "deployment event" {
  run deployment-get-id
  [ "$status" -eq 0 ]
  [ "$output" = "87972451" ]
}

@test "GITHUB_EVENT_PATH not set" {
  skip "this probably does not have the right behaviour?"
  unset GITHUB_EVENT_PATH
  run deployment-get-id
  [ "$status" -ne 0 ]
}

@test "other event" {
  export GITHUB_EVENT_PATH="$BATS_TEST_DIRNAME/fixtures/pull_request_event.json"
  run deployment-get-id
  [ "$status" -eq 0 ]
  [ "$output" = "" ]
}
