var data;
var plushieData = [];
var userData = [];

(function() {
    

    if(localStorage.getItem('plushieData')!=undefined) {
        userData = JSON.parse(localStorage.getItem('plushieData'));
        updateTemplate();
    } else {
        userData[0] = [];
        userData[1] = [];
        updateTemplate();
    }
    new ClipboardJS('#CopyTemplate');
    getTradeData();
 })();



function getTradeData()
{ 
    fetch("./paliaData/plushies.txt").then(function(response) {
        response.text().then(function(text) {
          let plushies = text.split(/\n\s*\n/);
          plushies.forEach(handleCategory);
          displayCategories();
        });
    });   
};

function handleCategory(category) {
    addCategory(category.split('\n'));
}

function addCategory(lines) {
    // If category doesnt exist add the category.
    if (plushieData.filter(x=>x.Category==lines[0].trim().replaceAll('#','')) < 1) {
        plushieData.push({
            'Category':lines[0].trim().replaceAll('#',''),
            'SubCategories': []
        });
    }

    var plushieCategory = plushieData.filter(x=>x.Category==lines[0].trim().replaceAll('#',''))[0];
    let subCategoryObject = {
        'SubCategory': lines[1].trim().replaceAll('#',''),
        'Plushies': []
    };

    lines.slice(2).forEach(plushie => {
        let plushObject = {
            'Name': plushie.split('|')[0],
            'Rarity':plushie.split('|')[1],
            'Image': plushie.split('|')[2]
        };
        subCategoryObject['Plushies'].push(plushObject);
    });

    plushieCategory['SubCategories'].push(subCategoryObject);
}

function displayCategories() {
    var inventoryContainer = document.getElementById('InventoryContainer');
    inventoryContainer.innerHTML = "";
    plushieData.forEach(element => {
        var categoryContainer = document.createElement('div');
        var categoryTitle = document.createElement('h3');
        categoryTitle.innerText = element.Category;
        var category = element.Category;

        var subCategoryContainer = document.createElement('div');
        subCategoryContainer.classList.add('subCategoryContainer');
        element.SubCategories.forEach(element => {
            let card = document.createElement('div');
            card.classList.add('card','shadow-sm','border-0','rounded-0');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let subCategoryTitle = document.createElement('h6');
            subCategoryTitle.classList.add('font-weight-bold');
            subCategoryTitle.innerText = element.SubCategory;
            var subCategory = element.SubCategory;
            cardBody.append(subCategoryTitle);

            let plushieContainer = document.createElement('div');
            plushieContainer.classList.add('plushieContainer');
            element.Plushies.forEach(element => {
                let plushieCard = document.createElement('div');
                let rarity = element.Rarity=="" ? 'unknown' : element.Rarity;
                plushieCard.classList.add(rarity);
                
                let classToAdd = checkUserItemStatus(category, subCategory, element.Name);
                plushieCard.classList.add('card','border-0','rounded-0', classToAdd);

                let plushieCardBody = document.createElement('div');
                plushieCardBody.classList.add('card-body','d-flex','justify-content-between','align-items-center');
                plushieCardBody.innerHTML = element.Name;

                let image = document.createElement('div');
                image.classList.add('image');
                image.style.backgroundImage = getImageFilename(element.Image);
                plushieCardBody.prepend(image);
                plushieCard.append(plushieCardBody);
                plushieContainer.append(plushieCard);
                
                let buttonHolder = document.createElement('div');
                buttonHolder.classList.add('d-flex');
                let needButton = document.createElement('button');
                needButton.classList.add('btn','btn-sm','btn-outline-danger','mr-1');
                needButton.plushie = element.Name;
                needButton.category = category;
                needButton.subCategory = subCategory;
                needButton.action = 'need';
                needButton.addEventListener('click',findItem);
                needButton.innerText = 'Need';

                let haveButton = document.createElement('button');
                haveButton.classList.add('btn','btn-sm','btn-outline-success','mr-1');
                haveButton.innerText = 'Have';
                haveButton.plushie = element.Name;
                haveButton.category = category;
                haveButton.subCategory = subCategory;
                haveButton.action = 'have';
                haveButton.addEventListener('click',findItem);
                buttonHolder.append(needButton);
                buttonHolder.append(haveButton);

                let clearButton = document.createElement('button');
                clearButton.classList.add('btn','btn-sm','btn-outline-primary');
                clearButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                clearButton.plushie = element.Name;
                clearButton.category = category;
                clearButton.subCategory = subCategory;
                clearButton.addEventListener('click',findItem);
                clearButton.action = 'clear';
                buttonHolder.append(clearButton);

                plushieCardBody.append(buttonHolder);
            });
            cardBody.append(plushieContainer);

            card.append(cardBody);
            subCategoryContainer.append(card);
        });

        categoryContainer.append(categoryTitle);
        categoryContainer.append(subCategoryContainer);
        inventoryContainer.append(categoryContainer);
    });
}

function updateTemplate() {
    var totalTemplateString = "";
    var haveTemplateString = `## Up For Trade\n`;
    var needTemplateString = `## Looking For\n`;

    userData[0].forEach(element => {
        needTemplateString += `**${element.Category}**\n`
        element.SubCategories.forEach(element => {
            let subCategory = element.SubCategory==''? "" : `(${element.SubCategory})`;
            element.Plushies.forEach(element => {
                needTemplateString += `- ${element} ${subCategory}\n`
            });
        });
    });

    userData[1].forEach(element => {
        haveTemplateString += `**${element.Category}**\n`
        element.SubCategories.forEach(element => {
            let subCategory = element.SubCategory==''? "" : `(${element.SubCategory})`;
            element.Plushies.forEach(element => {
                haveTemplateString += `- ${element} ${subCategory}\n`
            });
        });
    });

    totalTemplateString = needTemplateString + '\n' + haveTemplateString;
    localStorage.setItem('plushieData', JSON.stringify(userData));
    document.getElementById('TradeTemplate').value = totalTemplateString;
}

function findItem(event) {
    let category = event.currentTarget.category;
    let subCategory = event.currentTarget.subCategory;
    let plushie = event.currentTarget.plushie;
    let type = event.currentTarget.action;

    switch (event.currentTarget.action) {
        case "have":
            event.currentTarget.parentElement.parentElement.parentElement.classList.add("have");
            event.currentTarget.parentElement.parentElement.parentElement.classList.remove("need");
            break;
        case "need":
            event.currentTarget.parentElement.parentElement.parentElement.classList.add("need");
            event.currentTarget.parentElement.parentElement.parentElement.classList.remove("have");
            break;
        default:
            event.currentTarget.parentElement.parentElement.parentElement.classList.remove("need");
            event.currentTarget.parentElement.parentElement.parentElement.classList.remove("have");
            removeSection(0,category,subCategory,plushie);
            removeSection(1,category,subCategory,plushie);
            updateTemplate();
            return;
    }

    var userSectionInt = 1;
    
    if(type == 'need') {
        userSectionInt = 0;
    }

    var userSection = userData[userSectionInt];
    var userSectionToRemove = Math.abs(userSectionInt-1);

    var userSection = type == 'need' ? userData[0] : userData[1];
    // If category doesnt exist add the category.
    if (userSection.filter(x=>x.Category==category) < 1) {
        userSection.push({
            'Category':category,
            'SubCategories': []
        });
    }

    var plushieCategory = userSection.filter(x=>x.Category==category)[0];
    if (plushieCategory.SubCategories.filter(x => x.SubCategory == subCategory) < 1) {
        plushieCategory.SubCategories.push({
            'SubCategory': subCategory,
            'Plushies': []
        });
    }

    var subCat = plushieCategory.SubCategories.filter(x => x.SubCategory == subCategory)[0];
    if(!subCat.Plushies.includes(plushie)) {
        subCat.Plushies.push(plushie);
    }

    removeSection(userSectionToRemove,category,subCategory,plushie);
    updateTemplate();
}

function removeSection(index,category,subCategory,plushie) {
    if (userData[index].filter(x=>x.Category==category).length > 0) {
        var userCategory = userData[index].filter(x=>x.Category==category)[0];

        if (userCategory.SubCategories.filter(x=>x.SubCategory==subCategory).length > 0) {
            var userSubCategory = userCategory.SubCategories.filter(x=>x.SubCategory==subCategory)[0];
            userSubCategory.Plushies = userSubCategory.Plushies.filter(x => x != plushie);

            if (userSubCategory.Plushies.length < 1) {
                userCategory.SubCategories = userCategory.SubCategories.filter(x => x.SubCategory != subCategory);
            }

            if (userCategory.SubCategories.length < 1) {
                userData[index] = userData[index].filter(x=>x.Category!=category);
            }
        }
    }
}

function clearTemplate() {
    localStorage.clear();
    userData[0] = [];
    userData[1] = [];
    updateTemplate();
    displayCategories();
}

function checkUserItemStatus(category, subCategory, plushie) {
    if (userData[0].filter(x=>x.Category==category).length > 0) {
        var userCategory = userData[0].filter(x=>x.Category==category)[0];

        if (userCategory.SubCategories.filter(x=>x.SubCategory==subCategory).length > 0) {
            var userSubCategory = userCategory.SubCategories.filter(x=>x.SubCategory==subCategory)[0];

            if (userSubCategory.Plushies.filter(x => x == plushie).length == 1) {
                return "need";
            }
        }
    }

    if (userData[1].filter(x=>x.Category==category).length > 0) {
        var userCategory = userData[1].filter(x=>x.Category==category)[0];

        if (userCategory.SubCategories.filter(x=>x.SubCategory==subCategory).length > 0) {
            var userSubCategory = userCategory.SubCategories.filter(x=>x.SubCategory==subCategory)[0];

            if (userSubCategory.Plushies.filter(x => x == plushie).length == 1) {
                return "have";
            }
        }
    }

    return "none";
}

function getImageFilename(filename) {
    return `url(${filename})`;
}