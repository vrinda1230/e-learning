import { useReducer, createContext, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
//initial state

const initialState ={
    user: null,
};

//create context
const Context = createContext();

//root reducer
const rootReducer = (state, action) =>{
    switch (action.type){
        case "LOGIN":
            return { ...state, user: action.payload};
        case "LOGOUT":
            return { ...state, user: null};
        default:
            return state;
    }
};

//context provider
const Provider = ({children}) =>{
    const [state, dispatch] = useReducer(rootReducer, initialState);

    //router
    const router = useRouter();

    useEffect(()=>{
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });
    },[]);

    axios.interceptors.response.use(
        function(response){
            //any sttaus code that lie within the range of 200 cause this function to trigger
            return response;

        },function(error){
            //any status code that lie outside the range of 200 can trigger this function
            let res= error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest){
                //taken from official documentation
                return new Promise((resolve, reject)=>{
                    axios
                      .get("/api/logout")
                      .then((data)=>{
                          console.log('/401 error > logout');
                          dispatch({type:'LOGOUT'});
                          window.localStorage.removeItem("user");
                          router.push("/login");
                      })
                      .catch((err)=>{
                          console.log("AXIOS INTERCEPT ERROR",err);
                          reject(error);
                      });
                });
            }
            return Promise.reject(error);
        }
    );

    useEffect(()=>{
        const getCsrfToken = async () =>{
            const {data} = await axios.get("/api/csrf-token");
            //console.log("CSRF", data);
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
        };

        getCsrfToken();
    },[]);

    return(
        <Context.Provider value ={{state, dispatch}}>{children}</Context.Provider>
    );
};

export {Context, Provider};

