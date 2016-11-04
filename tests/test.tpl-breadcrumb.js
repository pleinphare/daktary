describe('#BREADCRUMB', () => {
  it('should return a collection', () => {
    const ghInfos = {owner: 'foo', repo: 'bar', branch: 'master', path: '/irl/url'}
    expect(ghInfosToBreadcrumbItems(ghInfos)).to.be.an('array')
    expect(ghInfosToBreadcrumbItems(ghInfos)[0]).to.be.an('object')
  })
  it('should have his first element with *link* and *label* properties', () => {
    const ghInfos = {owner: 'foo', repo: 'bar', branch: 'master', path: '/irl/url'}
    expect(ghInfosToBreadcrumbItems(ghInfos)[0]).to.have.property('link')
    expect(ghInfosToBreadcrumbItems(ghInfos)[0]).to.have.property('label')
  })
  it('should return a valid link for *owner*, *repo*', () => {
    const ghInfos = {owner: 'foo', repo: 'bar'}
    expect(ghInfosToBreadcrumbItems(ghInfos)[0].label).to.be('foo')
  })
})
