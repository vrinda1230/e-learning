import Link from 'next/link';
import {useEffect,useState} from 'react';

const UserNav =()=>{
    const [current, setCurrent] = useState("");
    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname);
       //zconsole.log(window.location.pathname)    
    }, [process.browser && window.location.pathname]);
    return(
        <div className="nav flex-column nav-pills ">
 
                <a className={`nav-link ${current==="/user" && "active"}`} href="/user">Dashboard</a>
            

        </div>
    );
};

export default UserNav;