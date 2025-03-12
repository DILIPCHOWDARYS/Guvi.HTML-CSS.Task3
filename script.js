const apiurl = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
let users = [];
let currentpage = 1;
let recordsperpage = 10; 
const tbody = document.getElementById("usertable");
const pageInfo = document.getElementById("paginfo");


const fetchusers = async () => {
    try {
        const response = await fetch(apiurl);
        users = await response.json();
        displaydata();
    } catch (error) {
        console.error("Error in getting data from API", error);
    }
};


const displaydata = () => {
    const start = (currentpage - 1) * recordsperpage;
    const end = start + recordsperpage;
    const paginatedusers = users.slice(start, end);

    tbody.innerHTML = ""; 
    paginatedusers.forEach(user => {
        const row = `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    updatePageInfo();
};


const updatePageInfo = () => {
    const totalpages = Math.ceil(users.length / recordsperpage);
    pageInfo.textContent = `Page ${currentpage} of ${totalpages}`;

  
    document.querySelector(".pagination button:nth-child(1)").disabled = (currentpage === 1);
    document.querySelector(".pagination button:nth-child(2)").disabled = (currentpage === 1);
    document.querySelector(".pagination button:nth-child(4)").disabled = (currentpage === totalpages);
    document.querySelector(".pagination button:nth-child(5)").disabled = (currentpage === totalpages);
};

const firstpage = () => {
    currentpage = 1;
    displaydata();
};

const lastpage = () => {
    currentpage = Math.ceil(users.length / recordsperpage);
    displaydata();
};

const previouspage = () => {
    if (currentpage > 1) {
        currentpage--;
        displaydata();
    }
};
const nextpage = () => {
    const totalpages = Math.ceil(users.length / recordsperpage);
    if (currentpage < totalpages) {
        currentpage++;
        displaydata();
    }
};


fetchusers();
