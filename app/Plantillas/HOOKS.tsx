import React, { useState, useEffect } from 'react'

export default function HOOKS() {
    /**useState: Este hook te permite agregar estado a los componentes funcionales.
     * Puedes usarlo para almacenar y actualizar valores en el estado del componente. */
    const [count, setCount] = useState(0);


    /**useEffect: Este hook te permite realizar efectos secundarios en tus componentes funcionales.
     * Puedes usarlo para ejecutar código después de que el componente se monte, se actualice o se desmonte. */
    useEffect(() => {
        document.title = `You clicked ${count} times`;
      }, [count]);
      

  return (
    <div>
      {/** Este es el uso de useState */}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}


/**useContext: Este hook te permite acceder al contexto de React desde un componente funcional.
 * Puedes usarlo para consumir valores proporcionados por un Context.Provider en componentes descendientes. */
import React, { useContext } from 'react';
import MyContext from './MyContext';

function MyComponent() {
  const value = useContext(MyContext);
  return <p>{value}</p>;
}

/**useReducer: Este hook es una alternativa a useState que te permite gestionar el estado del componente con acciones.
 * Es útil cuando el estado del componente es más complejo o tiene una lógica más avanzada. */
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}