
//Define URL to call as global variable
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


//This function calls the YoutUbe API
function getDataFromApi(searchTerm, callback) {
  const settings = {
      key: 'AIzaSyCYRcsLLqI9MSOAEk8UE4zdfCwaQmD1hF4',
      q: searchTerm,
      part: 'snippet',
    };
  $.getJSON(YOUTUBE_SEARCH_URL, settings, callback);
}

//Create template to display results and iterate through them
/*const template = {
    item: function(item) {
        return '<div class="result">' +
                    '<div class="thumbnail">' +
                        '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" target="_blank">' +
                            '<img src="' + item.snippet.thumbnails.default.url + '" alt="' + item.snippet.title + '">' +
                        '</a>' +
                    '</div>' +
                    '<div class="title">' +
                        '<p>' + item.snippet.title + '</p>' +
                    '</div>' +
                '</div>';
    }
};*/


const template = {
    item: function(item) {
        return '<div class="result">' +
                    '<div class="thumbnail">' +
                        '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" target="_blank">' +
                            '<img src="' + item.snippet.thumbnails.default.url + '" alt="' + item.snippet.title + item.snippet.title + '">' +
                        '</a>' +
                    '</div>' +
                    '<div class="title">' +
                        '<p>' + item.snippet.title + '</p>' +
                    '</div>' +
                '</div>';
    }
};

//Listen for event and launch search
function searchSubmit() {
  $('.js-search-form').submit(event=> {
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('.js-query').val().trim();
    console.log(searchTarget);
    getDataFromApi(searchTarget,displayYouTubeSearchData);
  });
}

//render results
function displayYouTubeSearchData(data) {
  console.log(data.items);
  var results = ' ';
  if (data.items) {
    data.items.forEach(function(item) {
      results += template.item(item);
    });
  }
  else {
    results += '<p>No results</p>';
  }
  $('.js-search-results').html(results);
}

$(searchSubmit);
