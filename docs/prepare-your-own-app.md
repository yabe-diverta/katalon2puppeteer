---
layout: default
title: Prepare your own app
nav_order: 3
---

# Clone front-end into your workspace

Before starting this tutorial,  
you have to provide a real-world example application at first.

Please folk the [public example (using nuxt)](https://github.com/devJang/nuxt-realworld).  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/97a97eed78fc45ee49c5d5bac0925721.png)](https://diverta.gyazo.com/97a97eed78fc45ee49c5d5bac0925721)

Once folked the repo,  
copy the path.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/e8c4c66742dfa225eefbf10c50fd8656.png)](https://diverta.gyazo.com/e8c4c66742dfa225eefbf10c50fd8656)

Open your terminal window, clone it.  
```sh
git clone COPIED_VALUE
```

Then, initialize it.
```sh
cd nuxt-realworld
yarn install  # <- here would take a few minutes.
npx npm-add-script -k serve -v "nuxt-ts build && nuxt start" # <- add static serve command to avoid initial loading screen.
npm run serve
```

After waiting for a while,  
you notice some messages are displayed in your console.  
```sh

   ╭────────────────────────────────────────╮
   │                                        │
   │   Nuxt @ v2.14.12                      │
   │                                        │
   │   ▸ Environment: production            │
   │   ▸ Rendering:   server-side           │
   │   ▸ Target:      server                │
   │                                        │
   │   Memory usage: 29.1 MB (RSS: 82 MB)   │
   │                                        │
   │   Listening: http://localhost:3000/    │
   │                                        │
   ╰────────────────────────────────────────╯

```

open your application by Chrome.  
`open http://localhost:3000`

Anyhow now you have your own application.  
Let's move on to the next to do testing.