
function getHtml (person) {
  var noImageArray = [41, 42]
  var majorField = person.MajorField ? person.MajorField.replace(/#/gi, ',') : ''
  return (
  '<div class="col-sm-4">' +
    '<div class="team-member">' +
      '<img class="mx-auto rounded-circle" src="img/team/' + (
        noImageArray.indexOf(person.index) > -1 ? 'noimage.jpg' : person.index + '.' + (person.index === 16 ? 'png' : 'jpg')
      ) + '" alt="">' +
      '<h4>' + person.EngName + '</h4>' +
      '<p title="' + majorField + '" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; color: #a256d7!important;" class="text-muted">' + majorField + '</p>' +
      '<p style="word-break: break-all; text-align: left;">' + (person.Introduction ? person.Introduction.replace(/#/gi, ',') : '') + '</p>' +
    '</div>' +
  '</div>'
  )
}

function shuffle (array) {
  var currentIndex = array.length
  var temporaryValue
  var randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

$(function () {
  $.ajax({
    url: 'team.csv',
    dataType: 'text'
  }).done(function (data) {
    var allRows = data.split(/\r?\n|\r/)
    var keys = allRows[0].split(',')
    var team = []
    for (var i = 1; i < allRows.length; i++) {
      var person = {index: i}
      var values = allRows[i].split(',')
      keys.map(function (key, i) {
        person[key] = values[i]
      })
      if(person.EngName){
        team.push(person)
      }

    }
    team = shuffle(team)

    for (var i = 0; i < team.length / 3 + (team.length % 3 > 0 ? 1 : 0); i++) {
      var html = '<div class="row">'
      if (team[i * 3]) {
        html += getHtml(team[i * 3])
      }
      if (team[i * 3 + 1]) {
        html += getHtml(team[i * 3 + 1])
      }
      if (team[i * 3 + 2]) {
        html += getHtml(team[i * 3 + 2])
      }
      html += '</div>'
      $('#teamDiv').append(html)
    }
  })
})
