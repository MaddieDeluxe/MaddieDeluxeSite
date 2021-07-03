$(document).ready(function(){
    loadDownloads();
  });

function loadDownloads() {
    for (const [key, value] of Object.entries(db)) {
        let parentNode = document.createElement("div");
        parentNode.classList.add('card', 'tile');

        let thumbnail = document.createElement('img');
        thumbnail.src = '/images/' + key + '/' + '1.png';

        let body = document.createElement('div');
        body.classList.add('text-left', 'px-4', 'py-2', 'd-flex', 'flex-column');
        let title = document.createElement('h2');
        title.innerText = value.title;

        let description = document.createElement('p');
        description.innerText = value.description;

        let buttonHolder = document.createElement('div');
        buttonHolder.classList.add('button-holder');

        
        let previewButton = document.createElement('a');
        previewButton.classList.add('btn', 'btn-info');
        previewButton.innerText = 'Preview';
        previewButton.setAttribute('data-toggle', 'modal');
        previewButton.setAttribute('data-target', '#previewModal');
        previewButton.setAttribute('data-key', key);
        previewButton.setAttribute('data-title', value.title);
        previewButton.setAttribute('data-description', value.description);
        previewButton.setAttribute('data-download', value.downloadLink);
        previewButton.setAttribute('data-img', value.images);

        buttonHolder.appendChild(previewButton);

        let downloadButton = document.createElement('a');
        downloadButton.classList.add('btn', 'btn-success', 'ml-1');
        downloadButton.innerText = 'Download';
        downloadButton.href = value.downloadLink;
        buttonHolder.appendChild(downloadButton);

        body.appendChild(title);
        body.appendChild(description);
        body.appendChild(buttonHolder);


        parentNode.appendChild(thumbnail);
        parentNode.appendChild(body);

        var downloads = document.getElementById('downloads');
        downloads.appendChild(parentNode);
    }
}


$('#previewModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var key = button.data('key') // Extract info from data-* attributes
    var title = button.data('title') // Extract info from data-* attributes
    var description = button.data('description') // Extract info from data-* attributes
    var download = button.data('download') // Extract info from data-* attributes
    var img = button.data('img') // Extract info from data-* attributes

    var modal = $(this)
    modal.find('.modal-title').text(title)
    modal.find('.description').text(description)
    modal.find('.download').attr('href', download);

    var carouselItems = document.createElement('div');
    for (let i = 1; i <= img; i++) {
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
