//Getting the API data
async function getAPI(){
    
    let response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");

    let iniRes = await response.json();

    //Play with the data
}


let buttonClicked = 1;
let lengthOfData;


//Geting different nodes
const paginationNode = document.querySelector(".pagination");
const itemContainer = document.querySelector(".item-container");

//Load the initial Page
function loadInitialPage(){
fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
.then((iniResp) => iniResp.json())
.then((finalResp) => {
    
    TrialFunction(finalResp);
})

}
loadInitialPage();

//Getting the input from search box
const searchCont = document.querySelector("div.search-container");

searchCont.addEventListener("input", (event) => {
    
    const nameNode = document.querySelector("input#name");
    const emailNode = document.querySelector("input#email");
    const roleNode = document.querySelector("input#role");
    const allInputNode = document.querySelectorAll("div.search-box input");

    let searchValue = event.target.value;

    const mainCheckBox = document.querySelector("div.top-heading input");
    mainCheckBox.checked = false;

    //Disable other two input box when user is entering in one
    allInputNode.forEach((eachNode) => {
        if(eachNode != event.target){
            eachNode.disabled = true;
        }

        //Enable all input when search box is empty;
        if(event.target.value === ""){
            eachNode.disabled = false;
        }
    })   
    
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then((iniResp) => iniResp.json())
    .then((finalResp) => {


    //Finding which input box was used (Name,email or role);
    if(event.target.id == "name"){
        //Search in Name
        myAsync(searchValue,"name");
    }

    else if(event.target.id == "email"){
        //Search by Email
        myAsync(searchValue,"email");
    }

    else if(event.target.id == "role"){
        //Search by Role
        myAsync(searchValue,"role");
    }
    
    })

})

//Function that loads the content and pagination based on the required data;

let searchCount = 0;

async function myAsync(searchValue, searchBy){

    const resp = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    const finalRes = await resp.json();

    if(searchBy == "name"){
        //Search by NAME

        let objHolder = [];

        finalRes.forEach((eachRes) => {
            if(eachRes.name.includes(`${searchValue}`)){
                objHolder.push({
                name:eachRes.name,
                email:eachRes.email,
                role:eachRes.role
                });    
                
                searchCount++;
            }
        })


        //Clear all the pagination buttons and data
        paginationNode.innerHTML = "";
        
        const iniBut = parseInt((searchCount) / 10) + 1; 
        printButtons(iniBut);

        itemContainer.innerHTML = "";

        TrialFunction(objHolder);

        searchCount = 0;
    }

    else if(searchBy == "email"){
       
        let objHolder = [];

        finalRes.forEach((eachRes) => {
            if(eachRes.email.includes(`${searchValue}`)){
                objHolder.push({
                name:eachRes.name,
                email:eachRes.email,
                role:eachRes.role
                });    
                
                searchCount++;
            }
        })

        console.log(objHolder);

        //Clear all the pagination buttons and data
        paginationNode.innerHTML = "";
        
        // console.log(document.querySelector("div.pagination-contianer"));
        const iniBut = parseInt((searchCount) / 10) + 1; 
        printButtons(iniBut);

        itemContainer.innerHTML = "";

        TrialFunction(objHolder);

        searchCount = 0;
    }

    else if(searchBy == "role"){
        let objHolder = [];

        finalRes.forEach((eachRes) => {
            if(eachRes.role.includes(`${searchValue}`)){
                objHolder.push({
                name:eachRes.name,
                email:eachRes.email,
                role:eachRes.role
                });    
                
                searchCount++;
            }
        })

        //Clear all the pagination buttons and data
        paginationNode.innerHTML = "";
        
        // console.log(document.querySelector("div.pagination-contianer"));
        const iniBut = parseInt((searchCount) / 10) + 1; 
        printButtons(iniBut);

        itemContainer.innerHTML = "";

        TrialFunction(objHolder);

        searchCount = 0;
    }

    else if(searchValue == ""){
        TrialFunction(finalRes);
    }

}


//Trial Function
function TrialFunction(finalResp){

    let count = 0;
    lengthOfData = finalResp.length;

    finalResp.forEach((eachResp) => {

        if(count < 10){
        itemContainer.innerHTML +=`
            <div class="item">
                <input type="checkbox">
                <div> ${eachResp.name} </div>
                <div> ${eachResp.email}</div>
                <div> ${eachResp.role}</div>
                <button class="btn btn-primary delete"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        }

        count++;

    })

    
    const mainCheckBox = document.querySelector("div.top-heading input");
    const allCheckBox = document.querySelectorAll("div.item input");
    const deleteButton = document.querySelector("div.delete-selected button");
    const itemDeleteButton = document.querySelectorAll("div.item button");
    checkNdelete(mainCheckBox,allCheckBox,deleteButton, itemDeleteButton);
    

    //Finding the initial numer of buttons
    const iniBut = parseInt((finalResp.length) / 10) + 1;
    printButtons(iniBut);    

    //Disable the left button 
    document.querySelector("div.arrow-left button").disabled = true;


    //Disable the right button if size of result is less than 10
    const lenOfRes = finalResp.length;
    if(lenOfRes < 10){
        document.querySelector("div.arrow-right button").disabled = true;
    }


    // //Pagination functionality
    const paginationButtons = document.querySelectorAll("div.pagination-container button");

    paginationButtons.forEach((eachBut) => {

        eachBut.addEventListener("click", (event) => {
            //Last page data number -
            let lastDataLen = lengthOfData % 10;

            //Left right button functionality
            const arrowLeftBut = document.querySelector("div.arrow-left button");
            const arrowRightBut = document.querySelector("div.arrow-right button");

            mainCheckBox.checked = false;

            if(event.target === arrowLeftBut){
                buttonClicked = buttonClicked - 1;
            }

            else if(event.target === arrowRightBut){
                buttonClicked = buttonClicked + 1;
            }

            else{
                buttonClicked = parseInt(event.target.innerText);
            }

            //Marking the button which is clicked
            if(buttonClicked > 1){
                arrowLeftBut.disabled = false;
            }

            else{
                arrowLeftBut.disabled = true;
            }

            if(buttonClicked < iniBut){
                arrowRightBut.disabled = false;
            }

            else{
                arrowRightBut.disabled = true;
            }

            paginationButtons.forEach((eachBut) => eachBut.classList.remove("btn-danger"));
            paginationButtons[buttonClicked].classList.add("btn-danger");

            //On click of respective button, show the data
            if(buttonClicked != iniBut){
                let count = 10;

                //Clear the initial data
                itemContainer.innerHTML = "";

                while(count > 0){
                    
                    itemContainer.innerHTML +=`
                    <div class="item">
                    <input type="checkbox">
                    <div> ${finalResp[10*buttonClicked - count].name} </div>
                    <div> ${finalResp[10*buttonClicked - count].email}</div>
                    <div> ${finalResp[10*buttonClicked - count].role}</div>
                    <button class="btn btn-primary delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    `;

                    count--;
                }
            }

            else{

                
                //Clear the initial data
                itemContainer.innerHTML = "";
                
                let count = 0;

                while(lastDataLen > 0){

                    itemContainer.innerHTML +=`
                    <div class="item">
                    <input type="checkbox">
                    <div> ${finalResp[10*(buttonClicked-1) + count].name} </div>
                    <div> ${finalResp[10*(buttonClicked-1) + count].email}</div>
                    <div> ${finalResp[10*(buttonClicked-1) + count].role}</div>
                    <button class="btn btn-primary delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    `;

                    count++;
                    lastDataLen--;
                }
            }
            
            let newAllCheckBox = document.querySelectorAll("div.item input");
            let newitemDeleteButton = document.querySelectorAll("div.item button");
            checkNdelete(mainCheckBox, newAllCheckBox, deleteButton, newitemDeleteButton);

        })
    })
    
}


const leftContainer = document.querySelector("div.arrow-left");
const rightContainer = document.querySelector("div.arrow-right");


//Function to print the required number of buttons
function printButtons(iniBut){

    leftContainer.innerHTML = "";
    leftContainer.innerHTML += `
    <button class="btn btn-primary">Previous</button>
    `;

    rightContainer.innerHTML = "";
    rightContainer.innerHTML += `
    <button class="btn btn-primary">Next</i></button>
    `;

    paginationNode.innerHTML = "";

    for(let i=1; i<= iniBut; i++){
        if(i == 1){
            paginationNode.innerHTML +=`
            <button class="btn btn-danger">${i}</button>
            `;
        }

        else{
            paginationNode.innerHTML +=`
            <button class="btn">${i}</button>
            `;
        }
        
            
    }
}


//Function for checkbox and delete
function checkNdelete(mainCheckBox, allCheckBox, deleteButton, itemDeleteButton){
    mainCheckBox.addEventListener("click", () => {
        if(mainCheckBox.checked == true){
        allCheckBox.forEach((eachCheckBox) => {
            eachCheckBox.checked = true;
            eachCheckBox.parentNode.style.backgroundColor = "grey";
        });
        }

        else{
        allCheckBox.forEach((eachCheckBox) => {
            eachCheckBox.checked = false;
            eachCheckBox.parentNode.style.backgroundColor = "white";
        });
        
        }
    })

    allCheckBox.forEach((eachCheckBox) => {
        eachCheckBox.addEventListener("click", () =>{
            if(eachCheckBox.checked == true){
                eachCheckBox.parentNode.style.backgroundColor = "grey";
            }

            else{
                eachCheckBox.parentNode.style.backgroundColor = "white";
            }
        })
    })

    deleteButton.addEventListener("click", () => {
        allCheckBox.forEach((eachCheckBox) => {
            if(eachCheckBox.checked == true){
                eachCheckBox.parentNode.remove();
            }
        })
    })

    itemDeleteButton.forEach((eachButton) => {
        eachButton.addEventListener("click", () => {
            eachButton.parentNode.remove();
        })
    })


}