var sectionContent = document.getElementById('SectionContent');
var aboutContent = document.getElementById('BioHolder');
var sectionTitle = document.getElementById('SectionTitle');

$(document).ready(function(){
    showDownloads();
    // showBio();
    // simBook();
});

function showBio() {
    $(aboutContent).load("/components/bio.html");
}

function simBook() {
    sectionTitle.innerText = 'My Sims';
    $.get("/components/simbook.html", function(content) {
        sectionContent.innerHTML = content;
    }).done(function(content) {
        showProfileCards();
    });
}

function showProfile() {
    $(aboutContent).load("/components/profile.html");
}

function showStory() {
    sectionTitle.innerText = 'My Story';
    var story = sectionContent;
    story.innerHTML = '';

    // for (const [index, element] of storyPosts.entries()) {
    //     console.log(index, element);
    //     var post = document.createElement('blockquote');
    //     post.classList.add('instagram-media');
    //     post.setAttribute('data-instgrm-permalink', element);
    //     post.setAttribute('data-instgrm-version', "13");
    //     story.appendChild(post);
    // }

    // let script = document.createElement('script');
    // script.src = '//www.instagram.com/embed.js';
    // script.setAttribute('async', true);
    // story.appendChild(script);
    
}

function showDownloads() {
    sectionTitle.innerText = 'My Downloads';
    var downloads = sectionContent;
    downloads.innerHTML = '';

    for (const [key, value] of Object.entries(db)) {
        let holderNode = document.createElement("div");
        holderNode.classList.add('col-md-4','col-lg-3', 'download-holder');

        let parentNode = document.createElement("a");
        parentNode.href = '#';
        parentNode.setAttribute('data-toggle', 'modal');
        parentNode.setAttribute('data-target', '#previewModal');
        parentNode.setAttribute('data-key', key);
        parentNode.classList.add('card', 'frosted-glass');

        let thumbnailHolder = document.createElement('div');
        thumbnailHolder.classList.add('thumbnail-holder', 'p-3');
        let thumbnail = document.createElement('img');
        thumbnail.classList.add('card-img-top');
        thumbnail.src = '/images/' + key + '/' + '1.png';
        thumbnailHolder.appendChild(thumbnail);
        
        let body = document.createElement('div');
        body.classList.add('card-body', 'px-1');

        let title = document.createElement('h3');
        title.innerText = value.title;

        body.appendChild(title);

        parentNode.appendChild(thumbnailHolder);
        parentNode.appendChild(body);

        holderNode.appendChild(parentNode);
        downloads.appendChild(holderNode);
    }
}


$('#previewModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var key = button.data('key') // Extract info from data-* attributes

    var object = db[key];

    var modal = $(this)
    modal.find('.modal-title').text(object.title);
    modal.find('.description').text(object.description);
    modal.find('.download').attr('href', object.downloadLink);

    if (object.requirement.title != '') {
        let alert = document.createElement('a');
        alert.target = '_blank';
        alert.href = object.requirement.link;
        alert.innerHTML = '<b>Required: </b>' + object.requirement.title;
        alert.classList.add('alert', 'alert-warning', 'd-block', 'text-decoration-none', 'shadow-sm', 'border-0');
        
        modal.find('.requirement').html(alert);
    } else {
        modal.find('.requirement').html('');
    }


    modal.find('.download').attr('href', object.downloadLink);
    var carouselItems = document.createElement('div');
    for (let i = 1; i <= object.images; i++) {
        let carouselItem = document.createElement('div');

        if(i == 1) {
            carouselItem.classList.add('active');
        }
        carouselItem.classList.add('carousel-item');

        let img = document.createElement('img');
        img.classList.add('d-block', 'w-100');
        img.src = '/images/' + key + '/' + i + '.png';

        carouselItem.appendChild(img);
        carouselItems.appendChild(carouselItem);
    }

    modal.find('#previewModalCarousel').html(carouselItems);
  })


function showProfileCards() {
    var holder = document.getElementById('MySims');
    for (const [key, value] of Object.entries(sims)) {
        holder.appendChild(buildProfileCard(value, key));
    }
}

  function buildProfileCard(sim, key) {
    let parentNode = document.createElement('div');
    let img = document.createElement('div');
    let body = document.createElement('div');
    let name = document.createElement('div');
    let infoHolder = document.createElement('div');
    let other = document.createElement('div');

    parentNode.classList.add('tile');
    name.innerHTML = sim.name;
    

    if (sim.location != '') {
        let location = document.createElement('span');
        let locationIcon = document.createElement('i');
        locationIcon.classList.add('bi', 'bi-geo-alt-fill');
        location.appendChild(locationIcon);
        location.append(sim.location);
        infoHolder.appendChild(location);
    }

    if (sim.spouse != '') {
        let relationship = document.createElement('span');
        let relationshipIcon = document.createElement('i');
        relationshipIcon.classList.add('bi', 'bi-heart-fill');
        relationship.appendChild(relationshipIcon);
        relationship.append(sim.spouse);
        infoHolder.appendChild(relationship);
    }

    body.appendChild(name);
    body.appendChild(infoHolder);
    
    img.classList.add('pic');
    let imgPath = 'Url(/images/ProfilePictures/' + key + '.png)';
    img.style.backgroundImage = imgPath;
    parentNode.appendChild(img);
    parentNode.appendChild(body);

    return parentNode;
  }