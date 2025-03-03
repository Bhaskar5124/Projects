const callbackbutton = document.querySelector("#callbackbutton");
const promisebutton = document.querySelector("#promisebutton");
const Asyncbutton = document.querySelector("#asyncbutton");



callbackbutton.addEventListener("click", uploadcallback);

function uploadcallback(){
    const div = document.querySelector("#div");
    div.classList.add("style");
    div.innerHTML = "Callback executed after 5 seconds";
    setTimeout(() => {
        fetch("https://dummyjson.com/posts")
        .then((response)=>{
            return response.json();
        })
        .then((result) => {
            div.innerHTML = JSON.stringify(result);
        })
        .catch((err)=>{
            div.innerHTML = err;
        });
        
       
    },5000);
}



promisebutton.addEventListener("click",uploadpromise);
function uploadpromise(){
    const div = document.querySelector("#div");
    div.classList.add("style");
    div.innerHTML = "Loading API using Promise...";
    setTimeout(()=>{
        const p2 = fetch("https://dummyjson.com/posts");
        p2.then((res)=>{
            return res.json();
        }).then((da)=>{
            div.innerHTML = JSON.stringify(da);
        }).catch((err)=>{
            div.innerHTML = err;
        });
         
    },5000);
}

Asyncbutton.addEventListener("click",uploadAsync);
function uploadAsync(){
    const div = document.querySelector("#div");
    div.classList.add("style");
    div.innerHTML = "Loading API using Async-Await...";

    setTimeout(()=>{
        try{
            async function fetchdata(){
                let pdata = await fetch("https://dummyjson.com/posts");
                let fdata = await pdata.json();
                div.innerHTML = JSON.stringify(fdata);
            }
            fetchdata();
        }catch(err){
            div.innerHTML = `Error Timeout ${err}`;
        }

    },5000)

}
