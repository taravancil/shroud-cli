# shroud-cli

[![standard code
style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

`shroud-cli` is command line interface for managing passwords (and other secrets). It encrypts/decrypts secrets and manages keys with [shroud](https://github.com/taravancil/shroud) and is inspired by [passgo](https://github.com/ejcx/passgo).

## Getting Started

If you don't already have Node on your system, [install it](https://nodejs.org/en/). Only tested with Node v6+.

Then install `shroud-cli` globally:

```
$ npm install -g shroud-cli
```

### Initializing `shroud`

1. Get yourself a strong master password. May I recommend a [diceware passphrase](http://world.std.com/~reinhold/diceware.html)?
2. Memorize your master password. And don't forget it. **If you lose access to your master password you will not be able to recover your passwords**.
3. Initialize `shroud` with your master password:

```
$ shroud-cli init
Enter a strong master password: asupergreatdicewarepassphrase
Confirm your master password: asupergreatdicewarepassphrase
Generating your keys...
Success!
```
## Usage

```
$ shroud-cli <add | show | ls | rm> [options]
```

| Command | Description |
| ------- | ----------- |
| add [name] | Encrypt and add a secret for [name] to your vault |
| show [name] | Decrypt and show the secret for [name] |
| {ls, list} | List the names of all the secrets in your vault |
| {rm, remove} [name] | Remove a secret from your vault |
| help | Show detailed usage information | 
