import gameModule from '../index';

test('board', () => {
  expect(gameModule.winChecker()).toBe(false);
});