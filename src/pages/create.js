import { useForm } from "react-hook-form";



const CreateNews = () => {
    const {register, handleSubmit}=useForm();
    const imageHostKey="faaaee3275f3c09ab74770dc7af1cb21";
    const onSubmit=(data)=>{
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