import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route path="/" component={Navbar} />
      </header>
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/new-day" component={NewDay} />
    </div>
  );
}

export default App;
