jsonp( 'https://api.github.com/repos/multibao/contributions/contents/contributions/{contribution}?{callback}', function(response) {
  var content = response.data.content.replace(/\s/g, '')

  document.querySelector('#multibao').innerHTML = content
})

function jsonp( url, callback ) {
  const id = ('jsonp' + Math.random() * new Date() ).replace('.', ''),
      contribution = document.querySelector('#multibao').title,
      script = document.createElement('script')

  url = url.replace('{contribution}', contribution + '.md')
  url = url.replace('{callback}', 'callback=' + id)
  script.src = url

  document.body.appendChild(script);
  window[id] = function(data) {
    if (callback) {
      callback( data )
    }
  }
}
