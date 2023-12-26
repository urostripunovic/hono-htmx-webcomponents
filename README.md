- Create a fullstack framework that uses htmx and Web Components for some interactivity
- Compare the DX between two template engine, i.e html vs jsx
- Use Web Components/Alpine or both together although I can already feel that the DX of JSX+Alpine won't be good
- Learn and understand the appeal of template engines (what frontend frameworks are built/inspired on)
- Understand the server better and learn VanillaJS rather than a framework
- Learn and understand config-ing... (I hate it here)
```
npm install
npm run start
```

```
open http://localhost:3000/jsxRender for JSX render
open http://localhost:3000/template for Template Engine rendering
```

- [x] See if static html files can be severed along with [Web Components](https://www.webcomponents.org/)
    - Be careful when serving static files, using a wildcard can lead to all the files being accessible. **DO NOT PLACE SENSETIVE FILES HERE**
- [x] See if working with a renderer can use web as well as render children
- [x] Try and see if ts files can be compiled to js while ```npm run dev``` is on
    - [x] Get vite to build the bundle file with all of the web components as wither ts or js files as well as watch them
    - [x] Run one command line to run both build and server together. ofc there's a [npm package](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)
    - [x] Add tailwind support for web components so that I can use the shadowDom without having to worry about document lvl css
        - Easiest way to use tailwindcss inside a Web Component is to not attach a shadow dom so the component is no longer isolated i.e not reusable but coupled. You also loose the ability to use slots but to solve this one can instead then query the children and render them that way instead. 
        - Another solution is to allow for an `@import` inside the `<style>`-tag but that is an anti pattern that loads the css after the component has mounted so it takes longer to render the component. 
        - The thirdish solution is to insert a `<link>`-tag which can be solve in to ways, either load in the css from a cdn which then renders the with out the css for a brief moment or you can instead build your own tailwindcss file using the following command `npx tailwindcss build [path]/styles.css -o output.css` which provides you a pretty chunky css file which doesn't have all the css one wants as well... So in my opinion if I'm working on a internal personal projects that use tailwind I would just not include the shadow dom. 
- [x] Understanding web components
    - Working with shadow dom templates allows for slots to be used which simplifies the dev experience by a whole lot but it's encapsulated and I can't use tailwind css. If I don't have a shadowdom then I can pass children can cause some design issue but I can use tailwind css. The problem is not that I can't place my tags however I like since the children are in an array I would need to re-arrange them. I can use the `insertBefore()` function which then requires me to get look in to `childNodes` array but there has to be a more efficient way 'cos if I do decide to add another child the array will change maybe querySelectors? `insertAdjacentElement()` seems promising but doesn't work with Nodes. If I want to use it would need to style the creating element in the following way `divEl.classList.add('p-1', 'border-solid', 'border-2', 'border-cyan-800');` which is kinda cumbersome and doesn't provide a good DX. I found out the best solution to be something like this when inserting the Web Components template `this.insertBefore(template.content.cloneNode(true), document.querySelector("#cool-div-tag2"));`, I would be required to name the tags in a smart way and pass it in as a prop or something. 
    - There are lifecycle methods but they are pretty straight forward so no worries there. connectedCallBack is the onMount, disconnectedCallback is the onDestroy and attributeChangedCallback is the willUpdate. If you want to observer props then a static observer is in order that has an array of values to be observed. Web components requires a fair bit of js knowledge to get working well and to be honest this is where I'm lacking. The attributeChangedCallback is called before the connectedCallback function so if I want to pass props to the Web Component I would need to process the props inside the attributeChangedCallback function and not the constructor since the props aren't accessible there.
    - The shadow dom has no access to the light dom so querySelectors can only be found inside the shadow root, this makes the DX a bit better in the sense that there is no need to be smart with the id naming as to avoid changing the wrong element.
    - You can also lazy load your web components using this [repo](https://github.com/bholmesdev/vite-conf-islands-arch/tree/main). It works a little different though in the sense that customElements can be defined inside another Web Component but they cannot be injected into the dom that way. You should however create your Web Component as usual but then take that class name and finish it of with a classic identifier like "-component", the code will be in this repo as well.
    
- [x] Understanding TypeScript
    - When declaring a ts file in a root path all of that files contents can accessed globally, so declaring a variable with the same name will throw the following error `Cannot redeclare block-scoped variable 'template'`. To solve this problem and let variables be 'private' one can use [namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html). I don't need to change any imports or anything, which is pretty nice. I do want to use tRPC, just try it out and it seems that this is the way to go. After some more testing import modules do not have this issue it's only an issue when you want to declare a local variable inside the file, seeing as most web components declare the template outside the class I could just either use namespaces or declare them inside the component.
- [x] Understanding how to render dynamic html from the server
    - My initial idea of rendering dynamic html doesn't work 'cos I had no idea what a template engine was I had to dig thourgh a hole lot of information just to understand that `{{}}` inside a html file isn't native to html... I could create my own template engine (hardpass) or I could create a dependency to my project by using a battled tested template engine. I'm looking into the following template engines [Mustache.js](https://mustache.github.io/mustache.5.html) which works with cloud workers, something I don't use or plan on using lol. [Nunjucks.js](https://mozilla.github.io/nunjucks/) which is a powerful tool that looks really similar to how [django templates their html](https://docs.djangoproject.com/en/5.0/topics/templates/) and then there's also [ETA](https://eta.js.org/) which is really similar to [EJS](https://ejs.co/) but better according to reddit, and tbh I don't like the DX of EJS and ETA. There is [handlebars](https://handlebarsjs.com/) but everyone under the sun says it's a pain in the ass to work with. And by browsing reddit I've seen to have found my match, [SquirrellyJS](https://squirrelly.js.org/) which seems to be as powerful as EJS and as light as Mustache.js
- [x] Implement my own template engine middleware.
    - The documentation for [SquirrellyJS](https://squirrelly.js.org/) is a catastrophe, I'll create some pull requests with better error handling when trying to load in partials. You know what the error handling is generally bad lol. The best course of action would be to to create some intellisense and code snippets for this template engine. It's very powerful and perform well against the battle tested ones. The implementation for the template engine middleware wasn't that hard. The hardest part was trying to fetch the damned file from my directory, I had to dig trough the source code of SquirrellyJS so that I could debug my solution. It works now...
    - Some cheat sheets, they have to normal, ifs and loops and the such. But the strongest part of this is the `{{@extendsFile('path/to/layout')}}` command with this the engine will only reload the contents that differ and load the stuff that I've already passed down. Then we have the `{{@block('foo')}}` command that can add new variables as well as reference them using the `{{#foo}}` command in the extended files. If I want to read the documentation of this I could just read [Nunjucks's](https://mozilla.github.io/nunjucks/templating.html), they are pretty similar. I noticed one thing though and that is that SquirrellyJS doesn't provide support for rendering the parent blocks content, you can only change it. I might use Nunjucks seeing as it's great but I don't think I would need those features honestly. But nonetheless I know how to implement my own template engine middleware! I found out as well that if I want to use the extendsFile helper the output file or locations of files aren't in the directory but their own template directory meaning I would need to specify the src in the script tags even further. Nope I just forgot a / lol...
- [x] See how Lit Element provides tailwind css. 
    - Didn't need to copy Lit, all I need is to build the tailwind css file every time I add a tailwind class, it builds pretty fast still but I don't think this is actually the most optimal solution especially if one wants to use the shadowdom. I want the css and component to mount together but, I tried using css modules but it doesn't seem to work for some reason. The best solution is to honestly not use the shadow dom when working with Web components so they won't be reusable in the sense that if I were to reuse a component I must use tailwind unless I'm shipping a bunch of tailwind code as well.
    - I tried again after integrating vite into my dev experience. Same conclusion as before using a link tag will take a while before the css loads in... I'll see how the dev experience is affected when working with css in this way.
- [ ] Implement the Todo app, use [tRPC](https://trpc.io/) or just [htmx](https://htmx.org/) for the client component
    - [ ] In JSX render 
        - [ ] Put JSX todo in a different route
    - [ ] HTML static files
        - [ ] Put HTML todo in a different route
    - [ ] Check out AlpineJs.
- [x] Add Vite dev server support for HMR when developing
    - I didn't like the fact that I needed to manually refresh the page whenever I made some changes. I already have vite for building my web components there shouldn't be any issues of trying to integrate it towards my project as well.
    - Wasn't that hard to implement, the `compress()` middleware broke the page but other than that hono has support for vite and if I want to reload the page after a change to my static files then I needed to install a vite plug in called vite restart.
- [ ] Create a lazy loaded component of a simple navbar that takes you between, jsx render and template render.
- [ ] Deploy the application
    - Prod prep done with script tags

### If I have time and energy!
- [ ] SonikJS, Honos version of what I want to do but with jsx and island solutions like Astro I think.
    - [x] Whiteboard dev has an example uploaded to [youtube](https://www.youtube.com/watch?v=Ptqaqls2SYo) 
- [ ] Create some pull requests for [SquirrellyJS](https://squirrelly.js.org/)?.
- [ ] Create intellisense and auto complete for SquirrellyJS?