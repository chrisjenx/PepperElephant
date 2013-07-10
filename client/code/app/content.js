/**
 * Loads the welcome screen
 */
exports.loadHome = function () {
//  console.log(ss.tmpl);
  var html = ss.tmpl['content-welcome'].render();
  replaceContentWithHtml(html);
}

/**
 * Loads the about screen
 */
exports.loadAbout = function () {
}

/**
 * Show some loading stuff
 */
function startLoading() {
  //TODO
}

/**
 * Hid some loading stuff
 */
function stopLoading() {
  //TODO
}

/**
 *
 * @param templateName
 * @param object
 */
function replaceContentWithObject(templateName, object){
  var html = ss.tmpl[templateName].render(object);
  replaceContentWithHtml(html);
}

/**
 * Show content into the centre content page. Handles hiding and showing
 *
 * @param newHtml
 */
function replaceContentWithHtml(newHtml) {
  var content = findContent();
  hideContent(content);
  content.html(newHtml);
  showContent(content);
}

//Alias'
exports.replaceContentWithHtml = replaceContentWithHtml;
exports.replaceContentWithObject = replaceContentWithObject;
exports.startLoading = startLoading;
exports.stopLoading = stopLoading;

/**
 * Is content hidden or visible
 * @param htmlContent
 * @returns {boolean} true if hidden currently
 */
function isContentHidden(htmlContent) {
  if (htmlContent.hasClass("hidden"))
    return true;
}

/**
 * Will find and hide/fadeout content based on its current state
 * @param htmlContent {*|jQuery|HTMLElement}
 */
function hideContent(htmlContent) {
  htmlContent.addClass("hidden");
}

/**
 * Shows content if not visible based on its current state
 * @param htmlContent {*|jQuery|HTMLElement}
 */
function showContent(htmlContent) {
  htmlContent.removeClass("hidden");
}


/**
 * Finds the main content
 * @returns {*|jQuery|HTMLElement}
 */
function findContent() {
  return $("#main_content");
}
