import { getFetchErrorMsg, getSchemaReloadMsg } from '@/redux/slices/graphql/utils';

describe('getSchemaReloadMsg', () => {
  it('should return correct data [getSchemaReloadMsg]', () => {
    expect(getSchemaReloadMsg('eng')).toBe('Schema successfully reloaded');
  });
});

describe('getFetchErrorMsg', () => {
  it('should return correct data [getFetchErrorMsg]', () => {
    const error = { status: 404, data: { key: 'value' } };
    expect(getFetchErrorMsg(error, 'eng')).toBe('{"key":"value"}');
  });
});
