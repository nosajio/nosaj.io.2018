const ViewExperiment = require('./view-experiment');

let exp, args;

beforeAll(() => {
  args = [
    async () => console.log('one'),
    () => console.log('two'),
    () => console.log('three')
  ];

  exp = new ViewExperiment(args);
})

describe('Constructor', () => {
  test('should add array of fns to internal _fns', () => {
    expect(exp._fns).toBe(args);
  });
});

describe('.randomFn()', () => {
  test('should return one of the original fns', async () => {
    const fn = exp.randomFn();
    expect( args.includes(fn) ).toBeTruthy();
  });
});

describe('.render()', () => {
  test('should always run as async function', () => {
    expect(exp.render() instanceof Promise).toBeTruthy();
  });
})