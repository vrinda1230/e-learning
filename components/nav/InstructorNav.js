import Link from 'next/link';
import {useEffect,useState} from 'react';

const InstructorNav =()=>{
    const [current, setCurrent] = useState("");
    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname);
       //zconsole.log(window.location.pathname)    
    }, [process.browser && window.location.pathname]);
    return(
        <div className="nav flex-column nav-pills">
 
                <a className={`nav-link ${current==="/instructor" && "active"}`} href="/instructor">Dashboard</a>
                <a className={`nav-link ${current==="/instructor/course/create" && "active"}`} href="/instructor/course/create">Course Create</a>

            

        </div>
    );
};

export default InstructorNav;