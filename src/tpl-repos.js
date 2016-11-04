{
  const htmlRepo = ({url, title, folders, files, contributors, git_url, image_url, description, readme_url}) =>
    `<article class="gh-list-item gh-type-repo">
      <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
      <div class="gh-list-content">
        <div class="gh-list-meta">
          ${ (folders && files) ? `<p>Dossiers : ${folders} - Fiches : ${files}</p>` : '' }
          ${ contributors ? `<p>Contributeurs : ${contributors}</p>` : '' }
          </p>
          <p>
          <a href="${git_url}">Voir sur Github</a>
          </p>
        </div>
        ${ image_url ? `<img src="${image_url}">` : '' }
        ${ description ? `<p class="gh-list-excerpt">${description}</p>` : '' }
        ${ readme_url ? `<a class="gh-list-readmore"
            title="Lire la suite de la fiche Titre de la fiche"
            href="#${readme_url}">Lire la présentation complète</a>` : ''
        }
      </div>
    </article>`

  template.repos = new Template('repos')
  template.repos.data = () => {
    const ghApi = new GithubUrl(router.params)
    const html = []
    ghApi.getJsonRepo().then(jsonResponse => {
      jsonResponse.map(({name, type, html_url, url}) => {
       const readmeUrl = {owner: router.params.owner, repo: name, branch: 'master', path: 'README.md'}
        const ghApiBlob = new GithubUrl(readmeUrl)
        ghApiBlob.getMdBlob()
          .then(mdResponse => {
            const contribution = new Markdown(mdResponse)
            const metas = contribution.isMetas() ?
            {
              url: html_url.replace('https://github.com/', ''),
              git_url: html_url,
              readme_url: html_url.replace('https://github.com/', '') + '/blob/master/README.md',
              title: contribution.metas.title,
              image_url: contribution.metas.image_url,
              description: contribution.metas.description,
              contributors: contribution.metas.contributors,
              folders: contribution.metas.folders,
              files: contribution.metas.files
            } : {
              url: html_url.replace('https://github.com/', ''),
              git_url: html_url,
              title: name
            }
            html.push(htmlRepo(metas))
            template.repos.html(html.join('\n'))
            template.repos.renderAsync(template.repos._htmlTpl)
          })
      })
    })
  }
}
