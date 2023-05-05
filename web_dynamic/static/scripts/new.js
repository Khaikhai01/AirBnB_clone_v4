$(function (e) {
  let checked = [];
  let checkedStr = '';
  let checkedIds = [];
  let clicked = false;

  $('input[type="checkbox"]').on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      checked.push({ id: id, name: name });
    } else {
      checked = $.grep(checked, (item) => {
        return item.id != id;
      });
    }

    checkedStr = checked.map(function (item) {
      return item.name;
    }).join(', ');

    checkedIds = checked.map(function (item) {
      return item.id;
    });
 
    $('div.amenities h4').text(checkedStr);
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
  
  function placesRender(dat) {
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(dat),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },  
      success: function (data) {
        $.each(data, (index, place) => {
            const html = ` 
              <article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                   <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                   ${place.description}
                </div>
              </article>
            `;
            $('section.places').append(html);
        });
      }
    });  
  }

  $('button').on('click', () => {
    placesRender({'amenities': checkedIds});
  });

  placesRender({});
});