import {useContext, useEffect, useState} from 'react';
import {Context} from '../../context';
import UserRoute from "../../components/routes/UserRoute";
import axios from 'axios';
import {Avatar} from 'antd';
import {SyncOutlined, PlayCircleOutlined} from '@ant-design/icons';

const UserIndex = ()=>{
    const{
        state:{user},
    } = useContext(Context); 
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        loadCourses()
    },[]);

    const loadCourses = async ()=>{
       try{
            setLoading(true);
            const {data} = await axios.get('/api/user-courses');
            setCourses(data);
            setLoading(false);

       }catch(err){
           console.log(err);
           setLoading(false);
       }
    }

    return(
        <UserRoute>
            {loading && (
                <SyncOutlined  
                   spin
                   className="d-flex justify-content-center display-1 text-danger p-5"
                />
            )}
        <h1 className="jumbotron text-center square p-5">
         User dashboard
        </h1>
        {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

        {/* show list of courses */}
        {courses && courses.map(course=>(
            <div className="d-flex">
            <div key={course._id} className="flex-shrink-0">
                <Avatar 
                   size={100} 
                   shape="square" 
                   src={course.image ? course.image.Location : '/course.png'}
                />
            </div>
                
                    <div className="flex-grow-1 ms-3">
                       <a href={`/user/course/${course.slug}`} className="pointer">
                           <h5 className="mt-2 text-primary">{course.name}</h5>
                       </a>
                       <p style={{marginTop: '-10px', fontSize : '18px'}}>{course.lessons.length} lessons</p>
                       <p className="text-muted" style={{marginTop: '-15px', fontSize : '15px'}}>
                           By {course.instructor.name}
                       </p>
                    </div>
                    <div className="col-md-3 mt-3 text-center">
                    <a href={`/user/course/${course.slug}`} className="pointer">
                        <PlayCircleOutlined className="h2 pointer text-primary"/>
                     </a>
                    </div>
                
           
            </div>
        ))}

    </UserRoute>
    );
};

export default UserIndex;


