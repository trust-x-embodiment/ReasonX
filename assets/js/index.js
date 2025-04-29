function log(message) {
  console.log(message);
}

function populate_people_html(html_id, details, row_split_idx){
    // content
    let content_html = ``
    for(var i=0; i<details.length; i++) {
      let detail = details[i]
      content_html += `
      <div class="column is-variable is-max-desktop">
        <div class="center">
          <img class="display-image center" src="${detail[1]}">
          <div> 
            <a href="${detail[4]}" target="_blank">${detail[0]}</a> <br>
            ${detail[2]} <br>
            ${detail[3]} 
          </div>
        </div>
      </div>`
    }
    $(`#${html_id}`).html(content_html)
    // console.log($(`#${html_id}`).html())
    // $(`#${html_id}`).html($(`#${html_id}`).html() + content_html)
}

function populate_affiliatons(html_id, details){
  // content
  let content_html = ``
  for(var i=0; i<details.length; i++) {
    let detail = details[i]
    content_html += `
    <div class="column">
      <div class="center">
        <img class="${html_id}-image center" src="${detail}">
      </div>
    </div>`
  }
  $(`#${html_id}`).html(content_html)
}


function populate_accepted_presentations(html_id, details){
  // content
  let content_html = ``
  let spotlight_tag_html = ``
  let curr_detail = null

  for(var i=0; i<details.length; i++) {
    curr_detail = details[i]
    spotlight_tag_html = ``
    if(curr_detail[7] == "Spotlight"){
      spotlight_tag_html = `<span class="tag is-warning">${curr_detail[7]}</span>`
    }
    content_html += `
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img class="is-rounded" src="${curr_detail[2]}">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="${curr_detail[1]}" target="_blank"><strong>${curr_detail[0]}</strong></a>&nbsp;${spotlight_tag_html}
            <br>
            ${curr_detail[3]}, ${curr_detail[4]}
            <br>
            <small class='bold has-text-dark'><i class='fa fa-clock icon'  style="position: relative;top: 5px;"></i>&nbsp;${curr_detail[8]} | <span class='toggle-btn has-text-primary'>${curr_detail[5]}</span>
            <span class="hidden-content unbold"><br><span class='bold'>Abstract.</span> ${curr_detail[6]}</span>
            </small>
          </p>
        </div>
      </div>
    </article>`
  }
  $(`#${html_id}`).html(content_html)
}


function animate_hidden_content(hidden_content){
  if (hidden_content.is(':visible')) {
    hidden_content.fadeOut();  // If visible, fade out
  } else {
    hidden_content.fadeIn();   // If hidden, fade in
  }
}

$(document).ready(function () {
  $('#meta-desc').attr('content', `Web home for ${project_name} @ ${conference_details[0]}`);
  $('#title').html(project_name);
  $('#project-name').html(`${proj_small_caps}<br>${project_name}`);
  $('#conference-details').html(`
  <a href="${conference_details[1]}" target="_blank">
  <div class="title-images">
    <img src="${conference_details[4]}" width="130px" height="130px">
    &nbsp;&nbsp;&nbsp;
    <img src="${conference_details[3]}" width="250px">
  </div>
  <br>
  <p class="is-2"><i class="fas fa-map-marker-alt" aria-hidden="true"></i>
  ${conference_details[2]}</p>
  </a>`)
  $('#workshop-date').html(workshop_date) // Eg. Saturday, 21st July @ RSS 2025

  // Add overview images
  let overview_html = ``;
  overview_images.forEach(image => {
    overview_html += `
    <div class="column">
      <div class="center">
      <img class="overview-image center" src="${image}" style="max-height: 180px; width: auto;">
      </div>
    </div>`;
  });
  $('#overview-images-container').html(overview_html);

  // speaker content
  talk_content = Object.values(talk_speaker_details)
  populate_people_html('talk-content1', talk_content.slice(0, 3))
  populate_people_html('talk-content2', talk_content.slice(3, ))

  // organizers content
  populate_people_html('organizer-content-1', organizers_details.slice(0, 5))
  // populate_people_html('organizer-content-2', organizers_details.slice(3, ))

  // accepted presentations
  populate_accepted_presentations("ppt-list", accepted_presentations)

  // organizer affiliation content
  populate_affiliatons('organizer-affiliation-logo-content', org_affiliation_logos)


  $('body').append(`
    <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <!--a target="_blank" href="" class="large-font bottom_buttons black-font">
          <svg class="svg-inline--fa fa-file-pdf fa-w-12" aria-hidden="true" focusable="false" data-prefix="fas"
            data-icon="file-pdf" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
            <path fill="currentColor"
              d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z">
            </path>
          </svg>
        </a-->
        <br>
        <p>Last updated on: <span id="last-updated"></span> | Page template borrowed from <a target="_blank" href="https://irvlutd.github.io/FewSOL"><span
              class="small-caps black-font">FewSOL</span></a>.</p>
      </div>
    </div>
  </footer>`)

  $('.toggle-btn').on('click', function() {
    var hidden_tr_content = $(this).closest('tr').next('.hidden-content');
    var hidden_span_content = $(this).closest('span').next('.hidden-content');

    animate_hidden_content(hidden_tr_content)
    animate_hidden_content(hidden_span_content)
  });

  // Last updated
  var apiUrl = "https://api.github.com/repos/egoact/rss2025.github.io/commits?sha=main&per_page=1";
  $.getJSON(apiUrl, function (data) {
    var commitDate = new Date(data[0].commit.committer.date);
    var formattedDate = commitDate.toDateString();
    $('#last-updated').html(formattedDate);
  });
});
