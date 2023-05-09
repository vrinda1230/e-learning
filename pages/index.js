import {useState, useEffect} from 'react';
import axios from 'axios';
import CourseCard from '../components/cards/CourseCard';

const Index = ({courses}) =>{
    return(
        <>
           <h1 className="jumbotron text-center bg-primary square p-5" style={{width: "100% !important"}}>Placement Hub</h1>
           <div className="container-fluid">
               <div className=" row ">
                   {courses.map((course)=>(
                       <div key={course._id} className="col-md-4">
                          {/* { <pre>{JSON.stringify(course, null, 4)}</pre>} */}
                          <CourseCard course={course}/>
                       </div>
                   ))}
               </div>

           </div>
        </> 
    );
};

//for the sake of SEO 
export async function getServerSideProps(){
    const {data} = await axios.get(`${process.env.API}/courses`);
    return {
        props:{
           courses: data,
        },
    };
}

export default Index;