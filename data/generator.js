var data;
var currentCardIndex = 0;
var topicData = [];

(function() {
    getChameleonFile();
 })();



function flipCard() {
    generateBoard(topicData[currentCardIndex].title, topicData[currentCardIndex].terms);
    let currentTopic = document.getElementById('Topic'+ currentCardIndex);
    
    currentTopic.classList.add('active');

    if (currentCardIndex < topicData.length) {
        currentCardIndex++;
    } else {
        currentCardIndex = 0;
    }
};

function getChameleonFile()
{ 
    fetch("./data/chameleon.txt").then(function(response) {
        response.text().then(function(text) {
          let topicArray = text.split(/\n\s*\n/);
          topicArray.forEach(handleTopic);
          displayTopics();
        });
    });   
};

function displayTopics() {
    shuffle(topicData);
    document.getElementById('TotalTopics').innerHTML = topicData.length;
    let index = 0;
    topicData.forEach(function(topic) {
        let topicList = document.getElementById('topicList');
        let newItem = document.createElement('div');
        newItem.classList.add('list-group-item');
        newItem.id = 'Topic'+ index++;
        newItem.innerHTML = topic.title;

        topicList.appendChild(newItem);
    });
}


function generateBoard(title, terms) {
    document.getElementById('BoardHolder').classList.remove('d-none');
    let dataString = terms;
    let titleDiv = document.getElementById('TopicTitle');
    titleDiv.innerHTML = title;
    let termsArray = dataString.split(',');
    shuffle(termsArray);
    
    clearTermsTable();
    for (let i = 1; i < 5; i++) {
        handleTableData(i, i)
    }

    termsArray.forEach(handleTerm);
}

function handleTopic(topic) {
    addTopic(topic.split('\n')[0],topic.split('\n')[1]);
}

function handleTerm(term, index, arr) {
    let t = document.createElement('div');
    t.innerHTML = term;

    handleTableData((index % 4 + 1), term);
}

function handleTableData(index, term) {
    let row = document.getElementById('Row'+index);
    let td = document.createElement('td');
    td.innerHTML = term;
    row.appendChild(td);
}

function clearTermsTable() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('Row'+i).innerHTML = '';
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function addTopic(title, terms) {
    let object = {
        'title': title.trim(),
        'terms': terms.trim()
    };

    if (object.terms.split(',').length != 16) {
        let span = document.createElement('span');
        span.innerHTML = object.title + ' :ERROR  ' + object.terms.split(',').length + ' terms found.';
        span.classList.add('text-danger');
        document.getElementById('ErrorList').appendChild(span);
    }
    topicData.push(object);
}