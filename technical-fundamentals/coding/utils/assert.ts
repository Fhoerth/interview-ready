export function assert<T>(value: T, msg?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(msg ?? 'Assertion failed: value is null or undefined');
  }
}
