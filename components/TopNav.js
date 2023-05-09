import {useState, useEffect, useContext} from "react";
import {Menu} from "antd";
import Link from "next/link";
import {
        AppstoreOutlined, 
        CoffeeOutlined, 
        LoginOutlined,
        LogoutOutlined,
        UserAddOutlined,
        CarryOutOutlined,
        TeamOutlined
} from '@ant-design/icons';
import {Context} from '../context';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const {Item, SubMenu, ItemGroup} = Menu;

const TopNav = () =>{
    const [current, setCurrent] = useState("");

    const {state, dispatch} = useContext(Context);
    const {user} = state;

    const router = useRouter();

    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
       //zconsole.log(window.location.pathname)    
    }, [process.browser && window.location.pathname])

    const logout = async()=>{
        dispatch({ type: "LOGOUT"});
        window.localStorage.removeItem("user");
        const {data} = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]} className="mb-2 my-nav">
           <Item key='/' 
           onClick={(e)=> setCurrent(e.key)} 
           icon={<AppstoreOutlined/>}>
               <a href="/">App</a>
              
           </Item>
           {user && user.role && user.role.includes("Instructor")? (
               <Item key='/instructor/course/create' 
               onClick={(e)=> setCurrent(e.key)}
               icon={<CarryOutOutlined/>}>
                   <a href="/instructor/course/create">Create Course</a>
               </Item>
           ): (
            <Item key='/user/become-instructor' 
            onClick={(e)=> setCurrent(e.key)}
            icon={<TeamOutlined/>}>
                <a href="/user/become-instructor">Become Instructor</a>
            </Item>
           )}

           { user=== null &&  (
               <>
               <Item key='/login' 
               onClick={(e)=> setCurrent(e.key)}
               icon={<LoginOutlined/>}>
                   <a href="/login">Login</a>
                  
               </Item>
    
               <Item key='/register'
               onClick={(e)=> setCurrent(e.key)} 
               icon={<UserAddOutlined/>}>
                   <a href="/register">Register</a>
                  
               </Item>
               </>
           )}

           {/* <Item>
               <Link href="/login">
                   <a>Login</a>
               </Link>
           </Item>
 
           <Item>
               <Link href="/register">
                   <a>Register</a>
               </Link> 
           </Item> */}
           
           {user!=null && (
             <SubMenu 
                 icon={<CoffeeOutlined />} 
                 title={user && user.name} 
                 className="float-end"
             >
                  <ItemGroup>
                      <Item key="/user">
                          <a href='/user'>Dashboard</a>
                      </Item>
                  <Item onClick= {logout} >
                      Logout
                   </Item>
                  </ItemGroup>
              </SubMenu>
           )}

            {user && user.role && user.role.includes("Instructor") && (
               <Item key='/instructor' 
               onClick={(e)=> setCurrent(e.key)}
               icon={<TeamOutlined/>}
               className="float-end"
               >
                   <a href="/instructor">Instructor</a>
               </Item>
           )}

        </Menu>
    );
};

export default TopNav;

// import {useState, useEffect, useContext} from "react";
// import {Menu} from "antd";
// import Link from "next/link";
// import {
//   AppstoreOutlined, 
//   CoffeeOutlined, 
//   LoginOutlined,
//   LogoutOutlined,
//   UserAddOutlined,
//   CarryOutOutlined,
//   TeamOutlined
// } from '@ant-design/icons';
// import {Context} from '../context';
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/router";

// const {Item, SubMenu, ItemGroup} = Menu;

// const TopNav = () =>{
//   const [current, setCurrent] = useState("");

//   const {state, dispatch} = useContext(Context);
//   const {user} = state;

//   const router = useRouter();

//   useEffect(()=>{
//     process.browser && setCurrent(window.location.pathname)
//   }, [process.browser && window.location.pathname])

//   const logout = async()=>{
//     dispatch({ type: "LOGOUT"});
//     window.localStorage.removeItem("user");
//     const {data} = await axios.get("/api/logout");
//     toast(data.message);
//     router.push("/login");
//   };

//   return (
//     <Menu mode="horizontal" selectedKeys={[current]} className="mb-2 my-nav">
//       <Item key='/' onClick={(e)=> setCurrent(e.key)} icon={<AppstoreOutlined/>}>
//         <a href="/" style={{ color: "white" }}>App</a>
//       </Item>
//       {user && user.role && user.role.includes("Instructor")? (
//         <Item key='/instructor/course/create' onClick={(e)=> setCurrent(e.key)} icon={<CarryOutOutlined/>}>
//           <a href="/instructor/course/create" style={{ color: "white" }}>Create Course</a>
//         </Item>
//       ): (
//         <Item key='/user/become-instructor' onClick={(e)=> setCurrent(e.key)} icon={<TeamOutlined/>}>
//           <a href="/user/become-instructor" style={{ color: "white" }}>Become Instructor</a>
//         </Item>
//       )}
//       { user=== null &&  (
//         <>
//           <Item key='/login' onClick={(e)=> setCurrent(e.key)} icon={<LoginOutlined/>} style={{backgroundColor: "black"}}>
//                   <a href="/login" style={{ color: "white" }}>Login</a>
//           </Item>
//           <Item key='/register' onClick={(e)=> setCurrent(e.key)} icon={<UserAddOutlined/>}>
//             <a href="/register" style={{ color: "white" }}>Register</a>
//           </Item>
//         </>
//       )}
//       {user!=null && (
//         <SubMenu icon={<CoffeeOutlined />} title={user && user.name} className="float-end">
//           <ItemGroup>
//             <Item key="/user">
//               <a href='/user'>Dashboard</a>
//             </Item>
//             <Item onClick={logout}>Logout</Item>
//           </ItemGroup>
//         </SubMenu>
//       )}
//       {user && user.role && user.role.includes("Instructor") && (
//         <Item key='/instructor' onClick={(e)=> setCurrent(e.key)} icon={<TeamOutlined/>} className="float-end">
//           <a href="/instructor">Instructor</a>
//         </Item>
//       )}
//     </Menu>
//   );
// };

// export default TopNav;

