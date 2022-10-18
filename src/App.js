import { useState } from 'react';
import './App.scss';
import { Select } from './components/Select';

const options = [
  { id: 1, label: 'first', value: 1 },
  { id: 2, label: 'second', value: 2 },
  { id: 3, label: 'third', value: 3 },
  { id: 4, label: 'fourth', value: 4 },
  { id: 5, label: 'fiveth', value: 5 },
]

function App() {
  const [value, setValue] = useState([]);
  const [value2, setValue2] = useState(null);
  return (
    <div className="App">
      <Select
        isMultiSelect={true}
        options={options}
        onChange={setValue}
        placeholder="asdsad"
        value={value}
      />

      <Select
        isMultiSelect={false}
        options={options}
        onChange={setValue2}
        placeholder="asdsad"
        value={value2}
      />
    </div>
  );
}

export default App;
