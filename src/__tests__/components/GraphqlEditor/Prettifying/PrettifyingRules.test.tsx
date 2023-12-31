import { prettifying } from '@/components/GraphqlEditor/Prettifying/PrettifyingRules';

describe('prettifying', () => {
  it('should format the query string', () => {
    const query = `subscription Sub {
        users {id}
      }
      mutation Mut {
        delete_users(where:{id: {_eq:"df"}
        }) {...someFragmant}}
      fragment someFragmant on users_mutation_response {affected_rows returning {id}}`;
    const result = prettifying(query);

    expect(result).toMatchSnapshot();
  });
});
