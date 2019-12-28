exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/$/)) {
    page.matchPath = "/*"
    createPage(page)
  }
}
