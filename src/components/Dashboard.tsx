import React, { useState, useMemo, useCallback } from 'react';
import '../App.css';

let renderCount = 0;

const SortedList = ({ list, sortFunction }) => {
  console.log('sorted list render')

  const sortedList = useMemo(() => {
    console.log('render count in sort names')
    return [...list].sort(sortFunction);
  }, [list, sortFunction]);

  return <div>SortedList: {sortedList.join(', ')}</div>
}

const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const [names] = useState(['dog', 'cat', 'snake', 'bat', 'lizard']);

  const total = count1 + count2;

  const sortFunction = useCallback((a: string, b: string) => a.localeCompare(b) , []) ;

  renderCount++;

  return (
    <>
      <button onClick={() => setCount1(count1 => count1 + 1)}>Counter 1: {count1}</button>{' '}
      <button onClick={() => setCount2(count2 => count2 + 1)}>Counter 1: {count2}</button>
      <br />
      <p>Names: {names.join(', ')}</p>
      <br />
      <SortedList list={names} sortFunction={sortFunction} />
      <br />
      <p>This component has rendered {renderCount} times.</p>
      <br />
      <p>Total: {total}</p>
    </>
  )
}

const NameDisplay = () => {
  const [names] = useState(['Wura', 'Tobi', 'Kemi', 'Bukola']);

  const sortNames = [...names].sort();

  console.log(sortNames, 'sort func')

  renderCount++
  return (
    <div>
      <p>Names: {names.join(', ')}</p>
      <p>SortedNames : {sortNames.join(', ')}</p>
      <p>This component has rendered {renderCount} times.</p>
    </div>
  )
}

interface Form {
  firstname?: string;
  lastname?: string;
  age?: number;
}

const Form = () => {
  const [data, setData] = useState<Form>({
    firstname: '',
    lastname: '',
    age: 0
  });

  console.log('component is rendered')

  const handleChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    // const [name, value] = evt.currentTarget;
    setData({
      ...data,
      [evt.currentTarget.name]: evt.currentTarget.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data, 'data')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={data?.firstname} name='firstname' onChange={handleChange} />
      <input type='text' value={data?.lastname} name='lastname' onChange={handleChange} />
      <input type='number' value={data?.age} name='age' onChange={handleChange} />
      <button onSubmit={handleSubmit}>Submit</button>
    </form>
  )
}

let renderC = 0;
const Dashboard: React.FC = (): JSX.Element => {
  renderC++;
  return (
    <main>
      <h1>App</h1>
      <Counter />
      {/* <Counter name='Counter 2' /> */}
      <p>{' '}</p>
      <p>Render count for the whole app: {renderC}</p>
      {/* <NameDisplay /> */}
      <Form />
    </main>)
    ;
}

export default Dashboard;

