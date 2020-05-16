// utility functions to get the..
// 1.Utility functions to the DOM element from the string
function getElementFromString(string){
    let div =document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}
let addedParamsCount=0;
// hide the parameter box initially
let parametersmeterBox=document.getElementById('parameterBox');
parametersmeterBox.style.display="none";
// if the user use the params box..hide it first
let paramsRadio=document.getElementById('paramsradio')
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display="none";
    document.getElementById('parameterBox').style.display="block";
    document.getElementById('params').style.display="block";
});
// if the user clicks on jsonbox,hide the json box
let jsonRadio=document.getElementById('jsonradio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display="none";
    document.getElementById('params').style.display="none";
    document.getElementById('requestJsonBox').style.display="block";
});
// if the user click on the button
let addParam=document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string = `      <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterkey${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parametervalue${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Value">
                        </div>
                        <button type="button"  class="btn btn-primary deleteParam">-</button>
                        </div>`;      //  convert the string element into node
                let paramElement=getElementFromString(string);
                console.log(paramElement);
                params.appendChild(paramElement);
                // add an event listener to remove the parameter the on clicking the button
                let deleteParam=document.getElementsByClassName('deleteParam');
           for (item of deleteParam){
               item.addEventListener('click', (e)=>{
            //    console.log();
              e.target.paramElement.remove();
               });
            }
            addedParamsCount++;
           
    
});

// if the user click on submit button
let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('responseJsonText').value="Please wait......";

    // fetch all the values user tha entered
    let url=document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    // if the user has used params item instead of json...
    if(contentType=='params'){
        data={};
        for(i=0;i<addedparamsCount+1 ;i++){
            if(document.getElementById('parameterkey'+(i+1))!=undefined){

                let Key=document.getElementById('parameterkey'+(i+1)).value;
                let value=document.getElementById('parametervalue'+(i+1)).value;
                data[key]=value;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    }
    else{
        data =document.getElementById('requestJsonText').value;
        console.log(data);
    }
    // if the GET type get invoked fetch api
    if (requestType == 'GET') { 
        fetch(url, {
            method: 'GET',
        })
    .then(Response=>Response.text())
    .then((text)=>{
        document.getElementById('responseJsonText').value=text;
    });


    }

    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(Response=>Response.text())
        .then((text)=>{
          document.getElementById('responseJsonText').value=text;
        });
    }
});