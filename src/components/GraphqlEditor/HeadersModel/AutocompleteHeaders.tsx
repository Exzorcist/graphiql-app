function Autocomplete() {
  return (
    <datalist id="headers" className="bg-slate-600">
      <option value="WWW-Authenticate">WWW-Authenticate</option>
      <option value="Authorization">Authorization</option>
      <option value="Cache-Control">Cache-Control</option>
      <option value="Connection">Connection</option>
      <option value="Keep-Alive">Keep-Alive</option>
      <option value="Access-Control-Allow-Origin">Access-Control-Allow-Origin</option>
      <option value="Access-Control-Allow-Credentials">Access-Control-Allow-Credentials</option>
      <option value="Access-Control-Allow-Headers">Access-Control-Allow-Headers</option>
      <option value="Access-Control-Allow-Methods">Access-Control-Allow-Methods</option>
      <option value="Access-Control-Expose-Headers">Access-Control-Expose-Headers</option>
      <option value="Access-Control-Max-Age">Access-Control-Max-Age</option>
      <option value="Access-Control-Request-Headers">Access-Control-Request-Headers</option>
      <option value="Access-Control-Request-Methods">Access-Control-Request-Methods</option>
      <option value="apollo-federation-include-trace">apollo-federation-include-trace</option>
      <option value="apollographql-client-name">apollographql-client-name</option>
      <option value="apollographql-client-version">apollographql-client-version</option>
    </datalist>
  );
}
export default Autocomplete;

export const headersdata = [
  'WWW-Authenticate',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Keep-Alive',
  'Access-Control-Allow-Origin',
  'Access-Control-Allow-Credentials',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Methods',
  'Access-Control-Expose-Headers',
  'Access-Control-Max-Age',
  'Access-Control-Request-Headers',
  'Access-Control-Request-Methods',
  'apollo-federation-include-trace',
  'apollographql-client-name',
  'apollographql-client-version',
];
