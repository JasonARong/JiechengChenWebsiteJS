/**
 * add a blog post
 */
export function addPost(array) {

    // set up diallog popup
    let popUp = document.getElementById("popUp");
    document.getElementById("postTitle").value = "";
    document.getElementById("postSummary").value = "";
    popUp.showModal();

    // read from user input
    let title = document.getElementById("postTitle");
    let sum = document.getElementById("postSummary");
    let myTitle, mySum;
    title.addEventListener('change', () => {
        myTitle = title.value;
    });
    sum.addEventListener('change', () => {
        mySum = sum.value;
    });

    
    // add the post to document
    popUp.addEventListener('close', closePopUP);
    function closePopUP(){
        if(popUp.returnValue == "Cancel"){
            popUp.removeEventListener('close', closePopUP);
            title.removeEventListener('change', () => {
                myTitle = title.value;
            });
            sum.removeEventListener('change', () => {
                mySum = sum.value;
            });
            return;
        }
        document.getElementById("noPost").innerText= '';
        // store all post data to an array
        let myDate = new Date();
        myDate = myDate.toString();
        let dataArray = [myTitle, myDate, mySum];
        // add to this dataArray to the memory Array
        array.push(dataArray);
        // update localsrorage with the new memory Array
        localStorage.setItem('myArray', JSON.stringify(array));

        
        // create the post html element
        creatPost(dataArray);
        


        popUp.removeEventListener('close', closePopUP);
        title.removeEventListener('change', () => {
            myTitle = title.value;
        });
        sum.removeEventListener('change', () => {
            mySum = sum.value;
        });


    }    

}

/**
 * creat a blog post with the template tag
 * @param {array} dataArray contain title, date and summary
 * @returns html blog post content
 */
export function creatPost(dataArray){
    let postTemp = document.getElementById("blogPost"); //template
    let postContent = postTemp.content.cloneNode(true);
    // modify content of the template
    let titleH3 = postContent.querySelector("h3");
    let dateH4 = postContent.querySelector("h4");
    let sumP = postContent.querySelector("p");
    titleH3.innerText = DOMPurify.sanitize(dataArray[0]);
    dateH4.innerText = DOMPurify.sanitize(dataArray[1]);
    sumP.innerText = DOMPurify.sanitize(dataArray[2]);


    // get html of #document
    let postSec = postContent.querySelector("section");

    //delete button
    let deleteBtn = postSec.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
        let deletePopUp = document.getElementById("deletePopUp");
        deletePopUp.showModal();
        deletePopUp.addEventListener('close', closeDeletePopUp);
        function closeDeletePopUp(){
            if(deletePopUp.returnValue == "Cancel"){
                return;
            }
            // remove from array
            let index = array.indexOf(dataArray);
            if (index !== -1) {
                array.splice(index, 1);
            }
            localStorage.setItem('myArray', JSON.stringify(array)); //update localstorage.
            // remove onscreen html
            postSec.remove();

            if(array.length == 0){
                document.getElementById("noPost").innerText= 'No Blog Posts!';
            }
        }

        
    });

    //edit button
    let editBtn = postSec.querySelector('.edit');
    editBtn.addEventListener('click', () => {

        let title = document.getElementById("editTitle");
        let sum = document.getElementById("editSummary");
        // current value
        title.value = dataArray[0]; 
        sum.value = dataArray[2];

        let editPopUp = document.getElementById("editPopUp");
        editPopUp.showModal();

        // read from user input, after click edit
        let myTitle = title.value;
        let mySum = sum.value;
        title.addEventListener('change', () => {
            myTitle = title.value;
        });
        sum.addEventListener('change', () => {
            mySum = sum.value;
            
        });

        editPopUp.addEventListener('close', closeEditPopUp);
        function closeEditPopUp(){
            // exist if the content is not changed ot the cancel button is clicked
            if((dataArray[0] == myTitle && dataArray[2] == mySum) || editPopUp.returnValue == "Cancel"){
                editPopUp.removeEventListener('close', closeEditPopUp);
                title.removeEventListener('change', () => {
                    myTitle = title.value;
                });
                sum.removeEventListener('change', () => {
                    mySum = sum.value;
                });
                return;
            }

            let newDate = new Date();
            newDate = newDate.toString();


            let index = array.indexOf(dataArray);

            // update dataArray value
            dataArray[0]=myTitle;
            dataArray[1]=newDate;
            dataArray[2]=mySum;
            array[index]= dataArray;

            localStorage.setItem('myArray', JSON.stringify(array)); //update localstorage.

            postSec.querySelector("h3").innerText = DOMPurify.sanitize(myTitle);
            postSec.querySelector("h4").innerText = DOMPurify.sanitize(newDate);
            postSec.querySelector("p").innerText = DOMPurify.sanitize(mySum);

            editPopUp.removeEventListener('close', closeEditPopUp);
            title.removeEventListener('change', () => {
                myTitle = title.value;
            });
            sum.removeEventListener('change', () => {
                mySum = sum.value;
            });

        }

    });
    // append to the html document
    document.querySelector("main").appendChild(postSec);
}


