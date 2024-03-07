/**
 * Render the view with the given name and the locals object
 * using the view engine
 */
module.exports = function renderMW(viewName) {
  return (req, res) => {
    res.locals.pageTitle = getPageTitleFromViewName(viewName);
    res.render(viewName, res.locals);
  };
};

function getPageTitleFromViewName(viewName) {
  switch (viewName) {
    case 'index':
      return 'Blaze | Posts';
    case 'follows':
      return 'Blaze | Follows';
    case 'dashboard':
      return 'Blaze | Dashboard';
  }
  return 'Blaze';
}
