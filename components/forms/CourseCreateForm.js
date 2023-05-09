import {Select, Button, Avatar, Badge} from'antd';
const {Option} = Select;

const CourseCreateForm =(
   { handleSubmit,
    handleChange,
    handleImage,
    values,
    setValues,
    preview,
    uploadButtonText,
    handleImageRemove = (f)=> f,
    editPage = false,
})=>{
    //for setting price range of courses 
     const children =[]
     for(let i= 100.00; i<=2599.99; i+=100){
         children.push(<Option key={i.toFixed(2)}>₹{i.toFixed(2)}</Option>)
     }

    return (
       <>
         {values && (
            <form onSubmit={handleSubmit}>
            <div className="form-row pb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
      
            <div className="form-row ">
              <textarea
                name="description"
                cols='7'
                rows='7'
                value={values.description}
                className="form-control"
                onChange={handleChange}      
              ></textarea>
            </div>
      
            <div className="form-row pt-3 pb-3">
              <div className="col">
                <div className="form-row">
                  <Select
                    style={{width:"98%"}}
                    size="large"
                    value={values.paid}
                    onChange={v=>setValues({...values, paid: v, price: 0})}
                  >
                    <Option value={true}>Paid</Option>
                    <Option value={false}>Free</Option>
                  </Select>
                </div>
              </div> 
              {values.paid && (
                  <div  className="form-group">
                      <Select
                        defaultValue="₹100"
                        style={{width:"100%"}}
                        onChange={ (v)=>setValues({...values, price:v})}
                        tokenSeparators={[,]}
                        size="large"
                      > 
                          {children}
                      </Select>
                  </div>)}
            </div>
            <div className="form-row">
              <input
                type="text"
                name="category"
                className="form-control"
                placeholder="Category"
                value={values.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-row pt-3">
            <div className="col">
                <div className="form-row form-control">
                  <label className="btn btn-outline-secondary btn-block form-control text-left">
                    {uploadButtonText}
                    <input 
                      type="file"
                      style={{width:"100%"}}
                      name="image"
                      onChange={handleImage}
                      accept="image/*"
                      hidden
                    />
                  </label>
  
                  {preview && (
                    <Badge count="X" onClick={handleImageRemove} className="pointer">
                   <div className="form-row"  style={{width:" 100%"}}>
                     <Avatar width={400} src={preview}/>
                </div>
                </Badge>
            )}
  
            {editPage && values.image && (
                <Avatar width={400} src={values.image.Location}/>
            )}
           </div>
                
            </div>
            
            </div>
      
            <div className="row pt-3" >
               <div className="col" >
                 <Button
                   onClick={handleSubmit}
                   
                   disabled={values.loading || values.uploading}
                   className="btn btn-primary "
                   loading={values.loading}
                   type="primary"
                   size="large"
                   shape="round"
                 >
                   {values.loading? "Saving..." : "Save & Continue"} 
                 </Button>
               </div>
            </div>
          </form>
         ) }
       </>
     ); 
}

 export default CourseCreateForm;