import GraphQLEditor from './components/GraphQLEditor/GraphQLEditor';
import ThemeProvider from './providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <GraphQLEditor />
    </ThemeProvider>
  );
}

export default App;
