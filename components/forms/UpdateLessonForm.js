import {Button, Progress, Switch} from 'antd';
import {CloseCircleOutlined, CloseCircleFilled} from '@ant-design/icons';
import ReactPlayer from 'react-player';

const UpdateLessonForm =({
    current, 
    setCurrent, 
    handleUpdateLesson, 
    uploading, 
    uploadVideoButtonText, 
    handleVideo, 
    progress,
})=>{
    return <div className="container pt-3">
        <form onSubmit={handleUpdateLesson}>
            <input
              type="text"
              className="form-control square"
              onChange={(e)=> setCurrent({...current, title: e.target.value})}
              value={current.title}
              autoFocus
              required
            />

            <textarea
              className="form-control mt-3"
              cols="7"
              rows="7"
              onChange={(e)=> setCurrent({...current, content: e.target.value})}
              value={current.content}
            ></textarea>

            <div>
               {!uploading && current.video && current.video.Location && (
                   <div className="pt-2 d-flex justify-content-center">
                       <ReactPlayer
                         url={current.video.Location}
                         width="410 px"
                         height="240 px"
                         controls
                       />
                   </div>
                )}

             <label className="btn btn-dark btn-block text-left mt-3 form-control">
                {uploadVideoButtonText}
                <input onChange={handleVideo} type="file" accept="video/*" hidden/>
               </label>
            </div>

           {/* <hr/> */}
            {progress > 0 && (
                <Progress
                   className="d-flex justify-content-center pt-2 form-control"
                   percent={progress}
                   steps={10}
                />
            )}

            <div className="d-flex justify-content-between">
                <span className="pt-3 ">Preview</span>
                <Switch 
                    className="float-right mt-2" 
                    disabled={uploading} 
                    checked={current.free_preview}
                    name="free_preview"
                    onChange={(v)=> setCurrent({...current, free_preview: v})}
                />
            </div>

            <Button 
              onClick={handleUpdateLesson} 
              className="col mt-3 form-control" 
              size="large"
              type="primary"
              loading={uploading}
              shape="round"
            >Save</Button>
        </form>
    </div>
};

export default UpdateLessonForm;