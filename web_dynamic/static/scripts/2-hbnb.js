$(function () {
  let checkedBox = [];
  let checkedString = '';

  $('input[type="checkbox"]').on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checkedBox')) {
      checkedBox.push({ id: id, name: name });
    } else {
      checkedBox = $.grep(checkedBox, (item) => {
        return item.id != id;
      });
    }

    checkedString = checkedBox.map(function (item) {
      return item.name;
    }).join(', ');
    $('div.amenities h4').text(checkedString);
  });
  
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status == 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});

