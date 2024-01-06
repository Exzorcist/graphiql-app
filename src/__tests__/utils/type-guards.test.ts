import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils/type-guards';

describe('isFetchBaseQueryError', () => {
  it('should return true for a valid FetchBaseQueryError object', () => {
    const error = { status: 404 };
    expect(isFetchBaseQueryError(error)).toBe(true);
  });
});

describe('isErrorWithMessage', () => {
  it('should return true for a valid error object with a message', () => {
    const error = { message: 'Not Found' };
    expect(isErrorWithMessage(error)).toBe(true);
  });
});
