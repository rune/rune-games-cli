# Rune Games CLI

Test your games inside a mock Rune app.

## Install

```sh
yarn global add rune-games-cli
# or
npm install -g rune-games-cli
```

## Use

```sh
rune start <game URL or path>
```

You should see something like

```sh
╭────────────────────────────────────────────────────────────────────────────╮
│                                                                            │
│    App is available at http://localhost:3000, http://192.168.0.101:3000    │
│    Game: my-games/my-game-1                                                │
│                                                                            │
│    Press `q` to exit                                    Rune CLI v1.0.0    │
│                                                                            │
╰────────────────────────────────────────────────────────────────────────────╯
```

When you open this URL you should see your game running inside a mock Rune app.
Press the 'gear' icon to open the settings. There you can e.g. change the game
challenge number.

<img src="https://user-images.githubusercontent.com/7106681/166223264-81029004-c985-49e6-b486-1d134686354e.png" height="500" /> <img src="https://user-images.githubusercontent.com/7106681/166223386-1d04ba1d-bde7-40c8-a94b-b4d12b13249b.png" height="500" />

---

## Dev usage

Install dependencies

```sh
yarn
```

Run CLI locally using `ts-node`

```sh
yarn cli ...
```

Build

```sh
yarn build
```

Run the built CLI

```sh
node dist
```
