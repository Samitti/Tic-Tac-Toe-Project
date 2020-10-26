import gameModule from '../index';

test('check draw', () => {
  expect(gameModule.drawChecker()).toBe(false);
});