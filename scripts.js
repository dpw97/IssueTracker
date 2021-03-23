const itemsPerPage = 10;
const apiURL = `https://api.github.com/repos/walmartlabs/thorax/issues`;
const issues = document.getElementById("issueList");

let endingItem = 10;
let currentIndex = 0;
let sizeOfList = 0;
//makes API call then returns entire json payload once promise fulfilled  
const getIssueList = async () => {
    const response = await fetch(apiURL);
    const result = await response.json(); 
    return result;
}

//Creates a div for each item to be displayed and displays 10 of them
const displayIssues = async () => {
    const displayList = await getIssueList();
    sizeOfList = displayList.length  
    for(currentIndex; currentIndex < endingItem; currentIndex++) {
        //Creating necessary divs
        const singleIssue = document.createElement("div");
        singleIssue.className = "singleIssue";
        singleIssue.id = currentIndex;

        const issueTitle = document.createElement("div");
        issueTitle.className = "issueTitle";
        const issueNumber = document.createElement("div");
        issueNumber.className = "issueNumber";
        const issueState = document.createElement("div");
        issueState.className = "issueState";
        //populating divs with relevant info
        issueTitle.textContent = "Title: " + displayList[currentIndex].title;
        issueNumber.textContent = "Number: " + displayList[currentIndex].number;
        issueState.textContent = "Status: " + displayList[currentIndex].state;
        //appending divs to single node
        singleIssue.appendChild(issueTitle);
        singleIssue.appendChild(issueNumber);
        singleIssue.appendChild(issueState);
        //appending single node to parent div
        issues.appendChild(singleIssue);
        singleIssue.addEventListener('click', () => {
            //Swal library used to handle pop-ups 
            Swal.fire({
                icon: "info",
                html: "Created at: " + displayList[singleIssue.id].created_at + "<br>" + 
                      "Previous user: " + displayList[singleIssue.id].user.login + "<br>" + 
                      "Id: " + displayList[singleIssue.id].id + "<br>" +
                      "Body: " + displayList[singleIssue.id].body + "<br>"
                
            });
        });
    }
    shouldButtonBeDisabled();    
}
//Update indices, remove old results, then update output
function displayPreviousTenIssues() {
    endingItem = endingItem - itemsPerPage;
    currentIndex = endingItem - itemsPerPage;
    issues.innerHTML = "";
    displayIssues();
}

function displayNextTenIssues() {
    endingItem = endingItem + itemsPerPage;
    currentIndex = endingItem - itemsPerPage;
    issues.innerHTML = "";
    displayIssues();
}
//Checks if pressing button will display a blank page, disables the btn if possible
function shouldButtonBeDisabled() {
    if(currentIndex - itemsPerPage <= 0) {
        document.getElementById("previous").disabled = true;
    }
    else {
        document.getElementById("previous").disabled = false;
    }
    if(endingItem + itemsPerPage > sizeOfList) {
        document.getElementById("next").disabled = true;
    }
    else {
        document.getElementById("next").disabled = false;
    }
}
//run
displayIssues();