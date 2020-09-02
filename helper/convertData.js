// this File is responsible to transform data from markdown to html with unified
// also save that data in db after converted .
const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');
const highlight = require('rehype-highlight');

/**
 * @param {markdown string} value which contain a huge break lines
 * this func will remove all break lines
 */
function replaceLineBreak(value) {
  return value.replace(/_/g, ' ');
  // return value.replace(/(\r\n|\n|\r)/gm, ''); //
}

/**
 *
 * @param {int} value to divide by 400 words per minute
 */
function estimatedReading(value) {
  return Math.round(value / 400);
}
/**
 * @param {markdown lang} data converted to html and inject highlight styles
 */
async function reformatPost(content) {
  // const filterContent = replaceLineBreak(content);
  const processor = unified()
    // تحويل المارك دوان الى لغة مارك دوان متسلسلة
    .use(markdown)
    // Transform markdown syntax tree to html
    .use(remark2rehype)
    // Traverse html tree to inject code highlight to content
    .use(highlight)
    // Transform html tree to string then save it or send it to client
    .use(html);
  // Convert data to html tree
  const result = await processor.process(content);
  // return contents without _  ✌🏻
  return replaceLineBreak(result.contents);
}

module.exports = { reformatPost, estimatedReading };
