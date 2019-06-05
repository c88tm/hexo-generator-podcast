'use strict';

var nunjucks = require('nunjucks');
var env = new nunjucks.Environment();
var pathFn = require('path');
var fs = require('fs');
var xmlescape = require('xml-escape');
var striptags = require('striptags');

env.addFilter('uriencode', function(str) {
  return encodeURI(str);
});

env.addFilter('remove_script', function(str) {
  if (!str || str == "") return ""
  str = str.replace(/<script>[^<]*<\/script>/g,"");
  return str;
});

env.addFilter('strip_html', function(str) {
  if (!str || str == "") return ""
  return striptags(str);
});

env.addFilter('make_cdata', function(str) {
  if (!str || str == "") return ""
  return striptags(str,['a', 'h2', 'p']);
});

env.addFilter('xml_escape', function(str) {
  if (!str || str == "") return ""
  return xmlescape(str);
});

env.addFilter('date_to_rfc822', function(str) {
  return (new Date(str)).toUTCString();
});

env.addFilter('copyright', function(str){
  return 'Copyright © ' + new Date().getFullYear() + ' ' + str;
});

var rss2TmplSrc = pathFn.join(__dirname, '../rss2.xml');
var rss2Tmpl = nunjucks.compile(fs.readFileSync(rss2TmplSrc, 'utf8'), env);

module.exports = function(locals) {
  var config = this.config;
  var tags = locals.tags;
  var categories = locals.categories;
  var feedConfig = config.podcast;
  var template = rss2Tmpl;

  var posts = locals.posts.sort('-date');
  if (feedConfig.limit) posts = posts.limit(feedConfig.limit);

  var url = config.url;
  if (url[url.length - 1] !== '/') url += '/';

  var podcast_category = categories.findOne({name: 'podcast'});
  var podcast_posts = "";
  if (podcast_category) {
    podcast_posts = podcast_category.posts.sort('date', -1).data;
  }
  var xml = template.render({
    config: config,
    url: url,
    posts: posts,
    tags: tags,
    categories: categories,
    podcast_posts: podcast_posts,
    feed_url: config.root + feedConfig.path
  });

  return {
    path: feedConfig.path,
    data: xml
  };
};
