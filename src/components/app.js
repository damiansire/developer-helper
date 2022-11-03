import { h } from "preact";
import { Router } from "preact-router";

import Header from "./header";

// Code-splitting is automated for `routes` directory
import BoolCondition from "../routes/bool-condition";

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <BoolCondition path="/" />
    </Router>
  </div>
);

export default App;
