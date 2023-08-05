import { useForm } from "react-hook-form";
import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CreateNews = () => {
    const {register, handleSubmit,setValue}=useForm();
    const imageHostKey="faaaee3275f3c09ab74770dc7af1cb21";
    const onSubmit=(data)=>{
        console.log(data)
        const image=data.image_url[0];
        console.log(image);
        const formData=new FormData();
        formData.append('image',image);
        console.log("Formdata:",formData);
        const url=`https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`

        fetch(url,{
            method:"POST",
            body:formData
        })
        .then((res)=>res.json())
        .then((imgData)=>{
           if(imgData.success)
           {
            const newPost={
               id:data.id,
               title:data.title,
               description:data.description,
               author:data.author,
               release_date:data.release_date,
               category:data.category,
               comment_count:data.comment_count,
               image_url:imgData.data.url,
               ckeditor_value: data.ckeditor_value,
            }
            fetch('/api/news',{
            method:"POST",
            headers:{
               'content-type':'application/json',
            },
            body:JSON.stringify(newPost)
            })
            .then(res=>res.json())
            .then(result=>{
               console.log(result);
            })
           }
        });
    }
    return (
        <div>
             <form 
             className=""
             onSubmit={handleSubmit(onSubmit)}
             name="form_item_path"
             layout="vertical"
             style={{
                width:"50%",
                margin:"50px auto"
             }}
             >
             <input 
             {...register("id")}
             placeholder="Id"
             style={{
                marginBottom:"10px 0px"
             }}
             />
               <input 
             {...register("title")}
             placeholder="Title"
             />
              <input 
             {...register("description")}
             placeholder="Description"
             style={{
                marginBottom:"10px 0px"
             }}
             />
              <input 
             {...register("author")}
             placeholder="Author"
             />
                <input 
             {...register("release_date")}
             placeholder="Release Date"
             type="date"
             style={{
                marginBottom:"10px 0px"
             }}
             />
               <input 
             {...register("category")}
             placeholder="Category"
             />
             <input 
             {...register("comment_count")}
             placeholder="Number of Comments"
             type="number"
             style={{
                marginBottom:"10px 0px"
             }}
             />
           
             <input 
             type="file"
             {...register("image_url")}
             />
               <CKEditor
                    editor={ClassicEditor}
                    data="" // Initial CKEditor content
                    onChange={(event, editor) => {
                        const ckeditor_value = editor.getData();
                        // Use setValue from react-hook-form to set the ckeditor_value
                        setValue("ckeditor_value",ckeditor_value)
                    }}
                />
              <input 
              type="submit"
              value="Create News"
              style={{
                marginBottom:"10px 0px",
                width:"100%"
             }}
             />
             </form>
        </div>
    );
};

export default CreateNews;