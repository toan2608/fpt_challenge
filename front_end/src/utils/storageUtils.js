


export let setLocalStorage = (key,value)=>{
    if(value && typeof value === "string"){
        localStorage.setItem(key,value);
    }else{
        localStorage.setItem(key,JSON.stringify(value));
    }
}
export let getLocalStorage = (key)=>{
    const data = localStorage.getItem(key);
    return data;
    // try{
    //     return JSON.parse(data);
    // }catch(err){
    //     return err;
    // }

}
export let setKeyLocalStorage = (key) => localStorage.key(key);
export let removeLocalStorage = (key) => localStorage.removeItem(key);