import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import axios from 'axios';

// useCallback, useMemo, React.memo
interface PageI {
    onClick: () => void,
    count: number
}

type Name = {
    common: string,
    nativeName: {},
    official: string
}

interface CountryI {
    name: Name,
    continents: string[]
}
const Page = memo(({ onClick, count }: PageI) => {
    console.log('page is being rendered===')
    return (
        <>
            <h1>Hello World</h1>
            <button onClick={onClick}>Click me to increase count</button>
            <p>Count in page: {count}</p>
        </>
    )
})

let numberOfRender = 0;
export default function Memoise() {
    const [count, setCount] = useState(0);
    const [countries, setCountries] = useState<CountryI[]>([])

    const onClick = useCallback(() => {
        setCount(count => count + 1)
    }, []);
    const value = 1;

    const dataFetch = async () => {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        // const response = data.json()
        // console.log(data, 'data')
        setCountries(data)
    }

    // "https://run.mocky.io/v3/b3bcb9d2-d8e9-43c5-bfb7-0062c85be6f9"
    useEffect(() => {
        dataFetch()
    }, [])

    numberOfRender++
    console.log('rendered', numberOfRender)
    console.log(countries, 'countries')

    const before = performance.now()
    const sortCountries = [...countries].sort((a: any, b: any) => {
        // console.log('re do oooo')
        const nameA = a.name.official.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.official.toUpperCase(); // ignore upper and lowercase

        // sort in an ascending order
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    const after = performance.now() - before;
    console.log(after, 'after')

    const a = performance.now();
    let b;
    return (
        <>
            {a}
            {/* <div>Memoise</div>
            <button onClick={onClick}>Click me</button>
            <div>{count}</div>
            <Page onClick={onClick} count={count} />
            <h1>Countries</h1> */}
            <ul>
                {sortCountries.map(country => (
                    <li>{country.name.official}</li>
                ))}
            </ul>
            {b = performance.now() - a}
            {console.log(b, 'b')}
        </>
    )
}
