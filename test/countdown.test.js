const { countdownTimer } = require('../src/countdown');
jest.useFakeTimers();

describe('countdownTimer', () => {
  test('should log remaining time at intervals and stop at 0', () => {
    console.log = jest.fn();

    // ✅ Spy before function runs
    const clearSpy = jest.spyOn(global, 'clearInterval');

    const startTime = 5;
    const interval = 1000;
    const timerId = countdownTimer(startTime, interval);

    // ✅ Advance one extra interval to ensure final tick runs
    jest.advanceTimersByTime((startTime + 1) * interval);

    // ✅ Check if console.log was called the right number of times
    expect(console.log).toHaveBeenCalledTimes(startTime);
    for (let i = startTime; i > 0; i--) {
      expect(console.log).toHaveBeenCalledWith(i);
    }

    // ✅ Verify that clearInterval was called with correct ID
    expect(clearSpy).toHaveBeenCalledWith(timerId);
  });
});
