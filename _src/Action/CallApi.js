import axios from "axios";
export const CallBookAll =async (fill)=>{
    let data =[]
   await axios.get('http://10.0.2.2:5000/api/v1/book/all',{
      params: {
         fillbook:fill
       },
    })
    .then(function (response) {
      response.data.data.map((e)=>{
        data.push(e)
        
     })
    
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function (response) {
     
  })

return data
   
        
  
}
export const CallBook =async (fill)=>{
  let data =[]
 await axios.get('http://10.0.2.2:5000/api/v1/book/',{
    params: {
       fillbook:fill
     },
  })
  .then(function (response) {
    response.data.data.map((e)=>{
      data.push(e)
   })
  
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function (response) {
   
})

return data
 
      

}
export const CallAuthor = async(fill)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/author/',{
     params: {
        fillauthor:fill
      },
   })
   .then(function (response) {
     response.data.data.map((e)=>{
       data.push(e)
    })
    console.log(data,'server');
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const  CallSaveBook = async(idUser,idBook)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/book/savebook',{
     params: {
        idUser:idUser,
        idBook:idBook
      },
   })
   .then(function (response) {
     response.data.data.map((e)=>{
       data.push(e)
    })
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const Delete = async(idUser,idBook)=>{
  await axios.get('http://10.0.2.2:5000/api/v1/book/Delete',{
     params: {
        idUser:idUser,
        idBook:idBook
      },
   })
   .catch(function (error) {
     console.log(error);
   })
}

export const  CallChapter = async(idBook)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/book/Chapter',{
     params: {
        idBook:idBook
      },
   })
   .then(function (response) {
     response.data.data.map((e)=>{
       data.push(e)
    })
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const  Login = async(email,password)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/user/login',{
     params: {
      email: email,
      password: password
      },
   })
   .then(function (response) {
    data = response.data
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const  Register = async(email,password,name,image)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/user/register',{
     params: {
      email: email,
      password: password,
      name:name,
      image:image
      },
   })
   .then(function (response) {
    data = response.data.mes
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const  setHistory = async(idUser,idBook,location,chapter,value)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/book/setht',{
     params: {
      idUser,idBook,location,chapter,value
      },
   })
   .then(function (response) {
    data = response.data.err
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const  getHistory = async(idUser,idBook)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/book/getht',{
     params: {
      idUser,idBook
      },
   })
   .then(function (response) {
    data = response.data.data
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

export const  Comment = async(idUser,idBook,comment,rate)=>{
  let data =[]
  await axios.get('http://10.0.2.2:5000/api/v1/user/comment',{
     params: {
      idUser,idBook,comment,rate
      },
   })
   .then(function (response) {
    data = response.data.mes
   })
   .catch(function (error) {
     console.log(error);
   })
   .finally(function (response) {
    
 })

return data
}

