const productvalidation=(values)=>{
    let errors={}
    if(!values.pname){
        errors.pname="Product Name is required"
    }
    if(!values.price){
        errors.price="Price is required"
    } 
    if(!values.cat){
        errors.cat="Category is required"
    } 
    if(!values.descr){
        errors.descr="Description is required"
    }   
    return errors;
}

export default productvalidation;