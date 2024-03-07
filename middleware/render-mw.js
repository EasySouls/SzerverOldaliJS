/**
 * Render the view with the given name and the locals object
 * using the view engine
 */
export default function renderMW(viewName) {
  return (req, res) => {
    res.render(viewName, res.locals);
  };
}
