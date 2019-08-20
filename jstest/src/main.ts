import upperCase from 'upper-case';
import * as core from '@actions/core';
async function run() {
    console.log(upperCase("jstest is running: " + core.getInput("secret")));
}

run()