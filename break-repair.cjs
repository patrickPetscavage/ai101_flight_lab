// Run with Node. Real source and tests execute in isolated contexts.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'flight-core.js'), 'utf8');
const tests = fs.readFileSync(path.join(__dirname, 'tests.js'), 'utf8');
if (!source.includes('state.speed * dt')) throw Error('Expected expression missing');
function run(label, code) {
  console.log('\n' + label);
  const context = vm.createContext({console, process: {exitCode: 0}});
  vm.runInContext(code, context);
  vm.runInContext(tests, context);
  return context.process.exitCode;
}
const before = run('BEFORE: expect 11 passes', source);
const broken = run('BROKEN: expect duration and 7-meter checks to fail', source.replace('state.speed * dt', 'state.speed'));
const after = run('RESTORED: expect 11 passes', source);
if (before !== 0 || broken !== 1 || after !== 0) process.exitCode = 1;
