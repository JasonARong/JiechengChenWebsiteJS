/**
 * Creat html element using template
 * @param html html markup
 * @returns created html element
 */
function createHTMLElement(html){
    let template = document.querySelector('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}
/**
 * remove all the previously made Bialog elements
 */
function removeDialogs(){
    let myDialogs = document.getElementsByTagName('dialog');
    let myDialogsList = Array.prototype.slice.call(myDialogs);
    for (let i = 0;i < myDialogsList.length; i++)
    {
        myDialogsList[i].remove();
    }
}

/**
 * Custom Alert function implemented by dialog tag
 */
export function customAlert() {
    document.getElementsByTagName("output")[1].value = "";
    removeDialogs();
    // create dialog
    let customA = createHTMLElement(`
        <dialog id="popUpA">
            <p>Alert pressed!</p>
            <form method="dialog">
            <button>OK</button>
        </dialog>  
    `);
    // show dialog
    document.body.appendChild(customA);
    let popUp = document.getElementById("popUpA");
    popUp.showModal();
}

/**
 * Custom comfirm function implemented by dialog tag
 */
export function customComfirm() {
    document.getElementsByTagName("output")[1].value = "";
    removeDialogs();
    // create dialog
    let customC = createHTMLElement(`
        <dialog id="popUpC">
            <form method="dialog">
                <p>Do you comfirm this?</p>
                <div>
                    <button value="False">Cancel</button>
                    <button value="True">Confirm</button>
                </div>
            </form>
        </dialog>  
    `);
    // show dialog
    document.body.appendChild(customC);
    let popUp = document.getElementById("popUpC");
    popUp.showModal();
    // update output
    popUp.addEventListener('close', () => {
        document.getElementsByTagName("output")[1].value = `Confirm result: ${popUp.returnValue}`;    
    });
    
}

/**
 * Custom prompt function implemented by dialog tag
 */
export function customPrompt() {
    document.getElementsByTagName("output")[1].value = "";
    removeDialogs();
    // create dialog
    let customP = createHTMLElement(`
        <dialog id="popUpP">
            <form method="dialog">
                <label for="inputName">What is your name?</label><br>
                <input type="text" id="inputName" name="inputName"><br>
                <div>
                    <button value="cancel">Cancel</button>
                    <button id="okButton" value="none">OK</button>
                </div>
            </form>
        </dialog>  
    `);
    // show dialog
    document.body.appendChild(customP);
    let popUp = document.getElementById("popUpP");
    popUp.showModal();

    let input = document.getElementById("inputName");
    let okButton = document.getElementById("okButton");
    input.addEventListener('change', () => {
        okButton.value = input.value;
    });

    // update output
    popUp.addEventListener('close', () => {
        if(popUp.returnValue == "cancel"){
            document.getElementsByTagName("output")[1].value = "User pressed cancel.";
        }
        else if (popUp.returnValue != "none"){
            popUp.returnValue = DOMPurify.sanitize(popUp.returnValue); //prevent Cross Site Scripting
            document.getElementsByTagName("output")[1].innerText = `Prompt result: ${popUp.returnValue}`;     
        }
        else{
            document.getElementsByTagName("output")[1].value = "User didn’t enter anything";
        }
    });

}



