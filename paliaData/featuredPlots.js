function setupFeaturedPlots(reset = false)
{
    var showPlots = localStorage.getItem('HideFeaturedPlots') == null || !(/true/).test(localStorage.getItem('HideFeaturedPlots')) || reset;
    document.getElementById('FeaturedPlots').innerHTML = "";

    fetch("./paliaData/plots.txt").then(function(response) {
        response.text().then(function(text) {
          let plots = text.split(/\r?\n/);
          if (plots.length > 0) {
            if (showPlots) {
                displayFeaturedPlots(plots);
            }
            document.getElementById('ShowVoteHelp').classList.remove('d-none');
          }
        });
    });   

    $('#FeaturedPlotsAlert').on('close.bs.alert', function (event) {
        event.preventDefault();
        document.getElementById('FeaturedPlots').innerHTML = "";
        event.currentTarget.parentElement.classList.add('d-none');
        localStorage.setItem('HideFeaturedPlots', true);
    });

    function displayFeaturedPlots(plots) {
        let actionButton = document.getElementById('ActionButton');
        actionButton.classList.remove('d-none');

        let container = document.getElementById('FeaturedPlots');
        plots.forEach(plot => {
            let badge = document.createElement('button');
            badge.classList.add('badge','btn','btn-light','featured-plot');
            badge.setAttribute('data-clipboard-text',plot);
            badge.innerText = plot;

            container.append(badge);
        });
        
        copyFeatureName();
    }

    function copyFeatureName() {
        let feature = new ClipboardJS('.featured-plot');
        feature.on('success', function(e) {
            e.clearSelection();

            e.trigger.innerText = 'copied!';
            e.trigger.classList.add('font-italic');
            e.trigger.classList.add('text-info');
            setTimeout(function() {
                e.trigger.innerText = e.text;
                e.trigger.classList.remove('font-italic');
                e.trigger.classList.remove('text-info');
            }, 3000);
        });
    }
};