## select

Demo of using Select component [DEMO](https://ordamari.github.io/select/)

Select component target is to replace select tag and support filter ,multiple choice and style that.

to use this component the format of the option and value need to be:

```
format = {
  id: string | number,
  label: string | number,
  value: any
}
```

the coponents props is:

- isMultiSelect: that contain if the value need to contain multiple choice.
- options: that be array of the format
- placeholder: that show if dont have any value.
- value: that contain the selected value, if have multiple choice need to be array of format or empty array, else can be format/null/undefiend.
- onChange: callback function that get the new value

example:

```
const [value, setValue] = useState([]);
const [value2, setValue2] = useState(null);

const options = [
  { id: 1, label: 'first', value: 1 },
  { id: 2, label: 'second', value: 2 },
  { id: 3, label: 'third', value: 3 },
  { id: 4, label: 'fourth', value: 4 },
  { id: 5, label: 'fiveth', value: 5 },
]

<Select
  isMultiSelect={true}
  options={options}
  onChange={setValue}
  placeholder="Choose many"
  value={value}
/>

<Select
  isMultiSelect={false}
  options={options}
  onChange={setValue2}
  placeholder="Choose one"
  value={value2}
/>
```
