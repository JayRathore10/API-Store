export const errorMiddleware = async(err , req  , res , next)=>{
  try{
    let error = {...err};

    error.messsage = err.message ;

    console.error(error);

    // Mongoose bad objectId
    if(err.name == "CastError"){
      const message = "Resource not found" ;
      error = new Error(message);
      error.statusCode  = 404;
    }

    // Mongoose duplicate key 
    if(err.code === 11000){
      const message = "Duplicate field value entered" ;
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation error 
    if(err.name === "ValidationError"){
      const message = Object.values(err.error).map((val)=> val.message).join(",");

      error = new Error(message);
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success : false  , 
      error : error.message || "Server Error"
    });

  }catch(error){
    return res.status(500).json({
      success : false , 
      error : "Server Error" 
    });
  }
}