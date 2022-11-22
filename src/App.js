
import 'antd/dist/antd.css';
import './App.css'
import React  from 'react';
import TaskContainer from "./components/Duck";
import {Provider} from "react-redux";
import store from "./store"
  function App() {
  return (
    <div className="App">
        <div className="Content">
      <Provider store={store}>
      <TaskContainer></TaskContainer>
      </Provider>
        </div>
    </div>
  );
}

export default App;
