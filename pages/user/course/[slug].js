import {useRouter} from 'next/router';
import {useState, useEffect , createElement} from 'react';
import axios from 'axios';
import StudentRoute from '../../../components/routes/StudentRoute';
import {Button, Menu, Avatar,Form} from 'antd';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import {PlayCircleOutlined, CheckCircleFilled, MinusCircleFilled, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';

const {Item} = Menu;

const SingleCourse = () =>{
    const [clicked, setClicked] = useState(-1);
    const [collapsed, setCollapsed]= useState(false);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({lessons: []}); //when one wants to access course.lessons
    const [completedLessons, setCompletedLessons] = useState([]);
    // force state update
    const [updateState, setUpdateState] = useState(false);
    //router
    const router= useRouter();
    const {slug} = router.query;

    useEffect(()=>{
        if(slug) loadCourse();
    }, [slug]);

    useEffect(()=>{
        if(course) loadCompleteLessons();
    }, [course])

    const loadCourse = async()=>{
        const {data} = await axios.get(`/api/user/course/${slug}`);
        setCourse(data);
    };

    const loadCompleteLessons = async ()=>{
        const {data} = await axios.post(`/api/list-completed`, {
            courseId: course._id,
        });
        console.log('Completed lessons', data);
        setCompletedLessons(data);
    };

    const markComplete = async ()=>{
        //console.log("send this lesson id to mark as completed");
        const {data} = await axios.post(`/api/mark-completed`,{
            courseId: course._id,
            lessonId: course.lessons[clicked]._id,
        });
        console.log(data);
        setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
    };

    const markIncomplete = async()=>{
        try{
            const {data} = await axios.post(`/api/mark-incompleted`,{
                courseId: course._id,
                lessonId: course.lessons[clicked]._id,
            });
            console.log(data);
            const all = completedLessons;
            const index = all.indexOf(course.lessons[clicked]._id ) //-1
            if(index > -1){
                all.splice(index, 1);
                setCompletedLessons(all);
                setUpdateState(!updateState);
            }
        }catch (err){
            console.log(err);
        }
    }

    return (
        <StudentRoute>
             {/* <h1>{ JSON.stringify(course, null, 4)}</h1> */}
             <div className="row">
                 <div style={{maxWidth: 340}}>
                     <Button 
                        onClick={()=> setCollapsed(!collapsed)} 
                        className="text-primary mt-1 btn-block mb-2 "
                    >
                       {createElement( collapsed ? MenuUnfoldOutlined : MenuFoldOutlined) }{" "} 
                       {!collapsed && "Lessons"}   
                    </Button>
                     <Menu
                       defaultSelectedKeys={[clicked]}
                       inlineCollapsed={collapsed}
                       style={{height: "80vh", overflow: "scroll" }}
                     >
                         {course.lessons.map((lesson, index)=>(
                             <Item 
                                onClick={()=> setClicked(index)} 
                                key={index} 
                                icon={<Avatar>{index +1 }</Avatar>}
                             >
                                   {lesson.title.substring(0,30)}{" "}
                                   {completedLessons.includes(lesson._id) ?  (
                                      <CheckCircleFilled 
                                         className="float-end text-primary ml-2"
                                         style={{marginTop: "14px"}}
                                      />
                                    ):(
                                      <MinusCircleFilled 
                                         className="float-end text-danger ml-2"
                                         style={{marginTop: "14px"}}
                                      />
                                     )}
                              </Item>
                         ))}
                     </Menu>
                 </div>

                 <div className="col">
                     {/* {JSON.stringify(clicked)} */}
                     {clicked !== -1 ? (
                          <>
                             <div className="col alert alert-primary square">
                                 <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                                {completedLessons.includes(course.lessons[clicked]._id) ? (
                                     <span className=" pointer float-end" onClick={markIncomplete}>
                                     Mark as incomplete
                                 </span>
                                ): (
                                    <span className=" pointer float-end" onClick={markComplete}>
                                    Mark as completed
                                </span>
                                )}
                             </div>
                             {/* {JSON.stringify(course.lessons[clicked])} */}
                             {course.lessons[clicked].video && 
                                course.lessons[clicked].video.Location && (
                             <>
                             
                                 <div className="wrapper">
                                     <ReactPlayer 
                                        className="player" 
                                        url={course.lessons[clicked].video.Location}
                                        width="100%"
                                        height="100%"
                                        controls
                                        onEnded={()=> markComplete()}
                                     />
                                 </div>

                                 <div className="wrapper">
                                 
                                 </div>
                               
                             </>
                            )}
                              <ReactMarkdown
                                    children={course.lessons[clicked].content}
                                    className="single-post"
                                    
                                />
                          </>
                      ): (
                          <div className="d-flex justify-content-center p-5">
                              <div className="text-center p-5">
                                  <PlayCircleOutlined className="text-primary display-1 p-5"/>
                                  <p className="lead">Click on the lessons to start learning</p>
                              </div>
                          </div>
                      )}
                 </div>
             </div>
        </StudentRoute>
    );
}

export default SingleCourse;