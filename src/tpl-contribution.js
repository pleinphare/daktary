{
  const html = ({link, label, content, prose_url, git_url}) => `
    <a name="top"></a>
    <aside class="contribution-tools">
      <a href="${git_url}" title="Voir sur Github" class="github-link tooltip"></a>
      <a href="${prose_url}" title="Editer sur prose.io" class="proseio-link tooltip"></a>
      <a href="#multibao/documentation/blob/master/README.md" title="Aide" class="help-link tooltip"></a>
      <a href="#top" class="page-top">Haut de page</a>
    </aside>
    <div id="parentRepo" class="breadcrumbs">
      À retrouver dans le dépôt : <a href="${link}">${label}</a>
    </div>
    <article id="contribution">
      ${content}
    </article>
  `
  template.contribution = new Template('contribution')
  template.contribution.data = () => {
    const ghApi = new GithubUrl(router.params)
    ghApi.getHtmlBlob().then(htmlResponse => {
      const {owner, repo, branch, path} = router.params
      const data = {
        git_url: ghApi.getGhUrl(),
        prose_url: ghApi.getProseUrl(),
        content: htmlResponse,
        link: `#${owner}/${repo}/tree/${branch}/` +
          `${path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')}`,
        label: `${owner} - ${repo}`
      }
      template.contribution.html(html(data))
      template.contribution.renderAsync()
    })
  }
}
