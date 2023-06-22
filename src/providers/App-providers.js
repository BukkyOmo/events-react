import { createContext } from "react";

export const AppContext = createContext({});

// const AppProvider = (props) => {
//     const [state, setState] = useState({
//         data: [],
//         token: null
//     });

//     return (
//         <AppContext.Provider value={[state, setState]}>
//             {props.children}
//         </AppContext.Provider>

//     )
// }

// export default AppProvider;
