$(document).ready(function(){
    loadDownloads();
  });

function loadDownloads() {
    for (const [key, value] of Object.entries(db)) {
        let holderNode = document.createElement("div");
        holderNode.classList.add('col-md-3', 'download-holder');

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
        var downloads = document.getElementById('downloads');
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
