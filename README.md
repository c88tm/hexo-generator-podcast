
# hexo-generator-podcast

## version 1.0.0

forked from [owen8877](https://github.com/owen8877/hexo-generator-podcast)'s version 2.0.0

## install

Add this repo in your dependencies, it should look like this:

```json
//...

  "dependencies": {
    "hexo": "^3.7.0",

    //...

    "hexo-generator-podcast": "c88tm/hexo-generator-podcast#master"
  }

//...
```

## _config.yml

```yaml
# Site
title: Title of your site/podcast
subtitle: Subtitle of your site/podcast
description: Description of Your site/podcast
author: author # used for author and copyright column
url: https://link/to/your/site
default_thumb: "/link/to/image" # full path will be https://link/to/your/site/link/to/image

# Podcast
podcast:
  type: rss2
  path: podcast.xml
  limit: 20
  url: https://link/to/your/podcast
  language: zh-TW
  owner_name: owner_name
  owner_email: owner@example.com
  category: Comedy
  explicit: clean
  block: plz_not
```

## scaffold example

add this in the scaffolds folder as podcast.md and run `hexo new podcast title`

```yaml
---
title: TITLE
date: {{ date }}
category: podcast
media: path/to/episode/media # full link will be https://link/to/your/podcast/path/to/episode/media
image: path/to/episode/image # full link will be https://link/to/your/podcast/path/to/episode/image
length: 1234567 # in bytes
mediatype: audio/mp3
duration: HH:MM:SS # MM:SS or just in sec is also fine.
---

Some summary used for subtitle

<!-- more -->

More details and show notes.

```

## Other

Please use rss2.
And very very much thx to [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) and [Spec:-iTunes-Podcast-RSS](https://github.com/simplepie/simplepie-ng/wiki/Spec:-iTunes-Podcast-RSS#link).