# Contributing Guide

**THIS IS STILL A WORK IN PROGRESS**

<!-- omit from toc -->
## Contents
- [Branch Rules](#branch-rules)
- [Contribution Rules](#contribution-rules)
- [Ensuring You Are Credited](#ensuring-you-are-credited)
- [Setting Up Your Dev Environment](#setting-up-your-dev-environment)
  - [Overview](#overview)
  - [Install `git`](#install-git)
  - [Clone the Repo](#clone-the-repo)
  - [Install Visual Studio Code](#install-visual-studio-code)
    - [Install the Markdown All In One Extension](#install-the-markdown-all-in-one-extension)
- [Requirements](#requirements)
- [Available Commands](#available-commands)
- [Writing Code](#writing-code)
- [Template Project Structure](#template-project-structure)
- [Vue Bridge](#vue-bridge)
- [Phaser Scene Handling](#phaser-scene-handling)
  - [Vue Component Example](#vue-component-example)
- [Handling Assets](#handling-assets)
- [Deploying to Production](#deploying-to-production)
- [Customizing the Template](#customizing-the-template)
  - [Vite](#vite)


## Branch Rules

- `main` is a protected branch. You should only ever PR from `dev` into `main` so they don't diverge.
- `dev` can be pushed into directly, but you should be branching from `dev` to create a feature branch for large changes.
- Feature branches will be automatically deleted once a PR is successfully completed. This is done to stop old branches from going stale. Please don't re-use the same branch for multiple features.

## Contribution Rules

- Use feature branches based on `dev`. That way `dev` is always kept ahead of `main`, and we can PR easily from `dev` to `main` once a feature set is complete.
- You get the bonk bat if you rebase commits. This can cause a mess for other people if they've based work on commits you rebased.
- `git push --force` is a cardinal sin.
- Try to make sure that GitHub issues are linked to your commits / PRs, so features can be tracked more easily.
- Use [markdown](https://www.markdownguide.org/basic-syntax/) for all documentation.

## Ensuring You Are Credited

To ensure you are credited for your work, please ensure that your name is in the `contributors` section of the [package.json](../package.json). I have added everyone with contribution access at the time of writing, but I have not added emails to those who do not have a public email on their GitHub profile. Please check this and add your emil if you wish.

## Setting Up Your Dev Environment

In order to start developing this project, you'll need to set up a development environment to build the project. [This section](#setting-up-your-dev-environment) will guide you through that process.

### Overview

<!-- no toc -->
1. [Install `git`](#install-git)
2. [Clone the Repo](#clone-the-repo)
3. [Install `rustup`](#install-rustup)
   - [Install `wasm-pack`](#install-wasm-pack)
4. [Install `python`](#install-python)
5. [Install Visual Studio Code](#install-visual-studio-code)
   - [Install Markdown all in one extension](#install-markdown-all-in-one)
   - [Install the rust-analyser extension](#install-rust-analyzer)

### Install `git`

`git` can be installed using [scoop](https://scoop.sh/) (`scoop install main/git`), [winget](https://git-scm.com/download/win) (`winget install --id Git.Git -e --source winget`), or directly from the [download page](https://git-scm.com/download/win).

You can also use tools like [GitHub Desktop](https://desktop.github.com) for version control.

### Clone the Repo

1. Using a command line of your choice (the correct choice is of course [PowerShell] in [Windows Terminal]) navigate to the directory you'd like to clone the repo to.
2. Type `git clone git@github.com:NathanielJS1541/pebble_protectors.git`.
3. Navigate to the repo, e.g. `cd pebble_protectors`.
4. If you're planning to start contributing, it may be wise to `git checkout dev` and then `git branch [feature_name]`.

If you're using GitHub Desktop, see instead [the GitHub Desktop documentation](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-a-repository-from-github-to-github-desktop).

### Install Visual Studio Code

Visual Studio Code is a free IDE that has extensions to support rust, along with many other languages. Since it is accessible to everyone, all documentation in this repo will assume it is what you are using.

Run the [installer](https://code.visualstudio.com/) and follow the steps. You can also install it using `scoop`, but I wouldn't recommend that as the built-in updater will make scoop a *little* unhappy.

To start working with this project, you'll also need a couple of extensions installed in VS Code. I'd recommend using the [profiles](https://code.visualstudio.com/docs/editor/profiles) to keep your tools for different workloads separate.

#### Install the Markdown All In One Extension

The [Markdown All In One extension](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) is useful as it provides support for editing MarkDown files within VS Code. It also ensures that `.md` files within the project look like they have been standardised.

In order to keep tables of contents the same in all MarkDown files, please go to the Markdown All In One extension settings and change the `ToC: Levels` setting from `1..6` to `2..6`:  
![Markdown All In One ToC setting](./images/VS_Code_Markdown_All_In_One_ToC_Setting.png)

This prevents the table of contents from including the document heading.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run dev`.

The local development server runs on `http://localhost:8080` by default. Please see the Vite documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. Vite will automatically recompile your code and then reload the browser.

## Template Project Structure

We have provided a default project structure to get you started. This is as follows:

- `index.html` - A basic HTML page to contain the game.
- `src` - Contains the Vue source code.
- `src/main.ts` - The main **Vue** entry point. This bootstraps the Vue application.
- `src/vite-env.d.ts` - Global TypeScript declarations, provide types information.
- `src/App.vue` - The main Vue component.
- `src/game/PhaserGame.vue` - The Vue component that initializes the Phaser Game and serve like a bridge between Vue and Phaser.
- `src/game/EventBus.ts` - A simple event bus to communicate between Vue and Phaser.
- `src/game` - Contains the game source code.
- `src/game/main.ts` - The main **game** entry point. This contains the game configuration and start the game.
- `src/game/scenes/` - The Phaser Scenes are in this folder.
- `public/style.css` - Some simple CSS rules to help with page layout.
- `public/assets` - Contains the static assets used by the game.

## Vue Bridge

The `PhaserGame.vue` component is the bridge between Vue and Phaser. It initializes the Phaser game and passes events between the two.

To communicate between Vue and Phaser, you can use the **EventBus.ts** file. This is a simple event bus that allows you to emit and listen for events from both Vue and Phaser.

```js
// In Vue
import { EventBus } from './EventBus';

// Emit an event
EventBus.emit('event-name', data);

// In Phaser
// Listen for an event
EventBus.on('event-name', (data) => {
    // Do something with the data
});
```

In addition to this, the `PhaserGame` component exposes the Phaser game instance along with the most recently active Phaser Scene. You can pick these up from Vue via `(defineExpose({ scene, game }))`.

Once exposed, you can access them like any regular state reference.

## Phaser Scene Handling

In Phaser, the Scene is the lifeblood of your game. It is where you sprites, game logic and all of the Phaser systems live. You can also have multiple scenes running at the same time. This template provides a way to obtain the current active scene from Vue.

You can get the current Phaser Scene from the component event `"current-active-scene"`. In order to do this, you need to emit the event `"current-scene-ready"` from the Phaser Scene class. This event should be emitted when the scene is ready to be used. You can see this done in all of the Scenes in our template.

**Important**: When you add a new Scene to your game, make sure you expose to Vue by emitting the `"current-scene-ready"` event via the `EventBus`, like this:


```js
class MyScene extends Phaser.Scene
{
    constructor ()
    {
        super('MyScene');
    }

    create ()
    {
        // Your Game Objects and logic here

        // At the end of create method:
        EventBus.emit('current-scene-ready', this);
    }
}
```

You don't have to emit this event if you don't need to access the specific scene from Vue. Also, you don't have to emit it at the end of `create`, you can emit it at any point. For example, should your Scene be waiting for a network request or API call to complete, it could emit the event once that data is ready.

### Vue Component Example

Here's an example of how to access Phaser data for use in a Vue Component:

```typescript
// In a parent component
<script setup lang="ts">
import { ref, toRaw } from 'vue';

const phaserRef = ref();
const game = toRaw(phaserRef.value.game) as Phaser.Game;
const scene = toRaw(phaserRef.value.scene) as Phaser.Scene;

const onCurrentActiveScene = (scene) => {
    
    // This is invoked

}

</script>
<template>
  <PhaserGame ref="phaserRef" @current-active-scene="onCurrentActiveScene" />
</template>
```

In the code above, you can get a reference to the current Phaser Game instance and the current Scene by calling `ref()`.

From this state reference, the game instance is available via `toRaw(phaserRef.value.game)` and the most recently active Scene via `toRaw(phaserRef.value.scene)`

The `onCurrentActiveScene` callback will also be invoked whenever the the Phaser Scene changes, as long as you emit the event via the EventBus, as outlined above.

## Handling Assets

Vite supports loading assets via JavaScript module `import` statements.

This template provides support for both embedding assets and also loading them from a static folder. To embed an asset, you can import it at the top of the JavaScript file you are using it in:

```js
import logoImg from './assets/logo.png'
```

To load static files such as audio files, videos, etc place them into the `public/assets` folder. Then you can use this path in the Loader calls within Phaser:

```js
preload ()
{
    //  This is an example of an imported bundled image.
    //  Remember to import it at the top of this file
    this.load.image('logo', logoImg);

    //  This is an example of loading a static image
    //  from the public/assets folder:
    this.load.image('background', 'assets/bg.png');
}
```

When you issue the `npm run build` command, all static assets are automatically copied to the `dist/assets` folder.

## Deploying to Production

After you run the `npm run build` command, your code will be built into a single bundle and saved to the `dist` folder, along with any other assets your project imported, or stored in the public assets folder.

In order to deploy your game, you will need to upload *all* of the contents of the `dist` folder to a public facing web server.

## Customizing the Template

### Vite

If you want to customize your build, such as adding plugin (i.e. for loading CSS or fonts), you can modify the `vite/config.*.mjs` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json`. Please see the [Vite documentation](https://vitejs.dev/) for more information.