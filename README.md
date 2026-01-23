- [Basic Gameplay](#basic-gameplay)
  - [Target Audience](#target-audience)
  - [Game Overview](#game-overview)
  - [Game Concepts](#game-concepts)
    - [Scripts vs Programs (Important)](#scripts-vs-programs-important)
    - [A note on JavaScript vs Bitburner functions](#a-note-on-javascript-vs-bitburner-functions)
  - [Terminal Commands](#terminal-commands)
    - [Help](#help)
    - [Basic Commands](#basic-commands)
      - [Learning whats around you](#learning-whats-around-you)
      - [Inspecting a server](#inspecting-a-server)
- [Manual Hacking](#manual-hacking)
  - [Manual hacking commands (before scripting)](#manual-hacking-commands-before-scripting)
  - [Opening ports on target machines](#opening-ports-on-target-machines)
- [Scripting 101](#scripting-101)
  - [Files \& editor (so you can start scripting)](#files--editor-so-you-can-start-scripting)
  - [Running scripts (the “process” model)](#running-scripts-the-process-model)
  - [Your first script](#your-first-script)
    - [HelloWorld](#helloworld)
    - [Scan Server](#scan-server)
    - [Scan Server (While Loop)](#scan-server-while-loop)
    - [Rudamentry Hacking Script 1](#rudamentry-hacking-script-1)
      - [Upgrade the script: “HGW” (Hack/Grow/Weaken)](#upgrade-the-script-hgw-hackgrowweaken)
    - [Rudamentry Hacking Script 2](#rudamentry-hacking-script-2)
    - [Memory Management](#memory-management)
  - [Where to go from here (skill-building roadmap)](#where-to-go-from-here-skill-building-roadmap)
  - [Common beginner mistakes](#common-beginner-mistakes)
  - [Cheat Sheet](#cheat-sheet)
    - [Navigation](#navigation)
    - [Inspect](#inspect)
    - [Rooting](#rooting)
    - [Files](#files)
    - [Scripts](#scripts)
- [Scripting 201](#scripting-201)
  - [Intermediate Goal](#intermediate-goal)
    - [Running scripts on another server](#running-scripts-on-another-server)
      - [Mini exercise: “Hello from over there”](#mini-exercise-hello-from-over-there)
    - [Why “do everything” scripts don’t scale](#why-do-everything-scripts-dont-scale)
    - [Introduce single-purpose worker scripts](#introduce-single-purpose-worker-scripts)
      - [Worker scripts](#worker-scripts)
      - [Mini exercise: use workers manually](#mini-exercise-use-workers-manually)
    - [Introduce the idea of a “controller”](#introduce-the-idea-of-a-controller)
    - [A very simple controller (single worker)](#a-very-simple-controller-single-worker)
    - [Expanding to multiple workers (still simple)](#expanding-to-multiple-workers-still-simple)
    - [Recap](#recap)
      - [Intermediate Takeaway](#intermediate-takeaway)
- [Scripting 301](#scripting-301)
  - [Pool all RAM across all servers (find free capacity)](#pool-all-ram-across-all-servers-find-free-capacity)
    - [Add a “RAM dashboard” script](#add-a-ram-dashboard-script)
  - [“Rootkit deploy tool” (auto-root + copy scripts everywhere)](#rootkit-deploy-tool-auto-root--copy-scripts-everywhere)
    - [Better efficiency logic (best use of resources)](#better-efficiency-logic-best-use-of-resources)
      - [Pick the best target automatically](#pick-the-best-target-automatically)
      - [Allocate threads where they matter](#allocate-threads-where-they-matter)
      - [Don’t “HGW randomly” — do “prep then farm”](#dont-hgw-randomly--do-prep-then-farm)
  - [Extra “advanced but still approachable” ideas](#extra-advanced-but-still-approachable-ideas)
    - [A “single command” runner](#a-single-command-runner)
    - [A “server inventory” view](#a-server-inventory-view)
    - [Safety: prevent duplicate controllers](#safety-prevent-duplicate-controllers)
    - [Introduce purchased servers (later)](#introduce-purchased-servers-later)

# Basic Gameplay

You can play the game online here: https://bitburner-official.github.io/


## Target Audience

This guide assumes:
- You are new to Bitburner
- You have a *general* sense of coding or scripting
- You are **not** a JavaScript expert

The goal is not to give you “optimal” scripts, but to help you understand:
- How the game works
- Why scripts behave the way they do
- How to progress from manual hacking to automation

## Game Overview
At a high level:
* You are connected to a server (starts at home).
* Servers have:
  * Money (you want it)
  * Security (higher = slower + harder)
  * RAM (lets you run more scripts later)
  * Root access (needed to run scripts on them)
* The core hacking loop is:
  * weaken → lower security
  * grow → increase money available
  * hack → steal money
* Early game: you do most things manually in the Terminal.
* Then you automate with scripts (Netscript JS): ns.hack(), ns.grow(), ns.weaken()

## Game Concepts
### Scripts vs Programs (Important)

- **Scripts** (`.js`) are written by you using JavaScript.
- **Programs** (`.exe`) are tools you buy or create (BruteSSH, FTPCrack, NUKE, etc).

You do NOT buy scripts.
You write scripts.

Programs are used to gain access to servers.
Scripts are used to automate hacking.

### A note on JavaScript vs Bitburner functions

Bitburner scripts are written in JavaScript.

- Functions that start with `ns.` come from the game (Bitburner / Netscript).
- Functions like `Math.floor()` come from JavaScript itself.

You don’t need to know much JavaScript to start — we’ll introduce concepts as we use them.

You can learn more about JavaScript here: https://javascript.info/  
You can learn more about NetScript/BitBurner here https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.ns.md

## Terminal Commands

### Help
```
Type 'help name' to learn more about the command 
 
    alias [-g] [name="value"]        Create or display Terminal aliases
    analyze                          Get information about the current machine 
    backdoor                         Install a backdoor on the current machine 
    buy [-l/-a/program]              Purchase a program through the Dark Web
    cat [file]                       Display a .msg, .lit, or .txt file
    cd [dir]                         Change to a new directory
    changelog                        Display changelog
    check [script] [args...]         Print a script's logs to Terminal
    clear                            Clear all text on the terminal 
    cls                              See 'clear' command 
    connect [hostname]               Connects to a remote server
    cp [src] [dest]                  Copy a file
    download [script/text file]      Downloads scripts or text files to your computer
    expr [math expression]           Evaluate a mathematical expression
    free                             Check the machine's memory (RAM) usage
    grep [opts]... pattern [file]... Search for PATTERN (string/regular expression) in each FILE and print results to terminal
         [-O] [target file]
    grow                             Spoof money in a servers bank account, increasing the amount available.
    hack                             Hack the current machine
    help [command]                   Display this help text, or the help text for a command
    history [-c]                     Display the terminal history
    home                             Connect to home computer
    hostname                         Displays the hostname of the machine
    kill [script/pid] [args...]      Stops the specified script on the current server 
    killall                          Stops all running scripts on the current machine
    ls [dir] [--grep pattern]        Displays all files on the machine
    lscpu                            Displays the number of CPU cores on the machine
    mem [script] [-t n]              Displays the amount of RAM required to run the script
    mv [src] [dest]                  Move/rename a text or script file
    nano [files...]                  Text editor - Open up and edit one or more scripts or text files
    ps                               Display all scripts that are currently running
    rm [OPTIONS]... [FILE]...        Delete a file from the server
    run [script] [-t n] [--tail]     Execute a program or script
        [--ram-override n] [args...]
    scan                             Prints all immediately-available network connections
    scan-analyze [d] [-a]            Prints info for all servers up to d nodes away
    scp [files...] [server]          Copies a file to a destination server
    sudov                            Shows whether you have root access on this computer
    tail [script/pid] [args...]      Displays dynamic logs for the specified script
    top                              Displays all running scripts and their RAM usage
    unalias [alias name]             Deletes the specified alias
    vim [files...]                   Text editor - Open up and edit one or more scripts or text files in vim mode
    weaken                           Reduce the security of the current machine
    wget [url] [target file]         Retrieves code/text from a web server
```
* `help <command>` will give you more help for that command

### Basic Commands
* `clear` - Clear the terminal
* `home` - Instantly connects back to your home machine
  ```
  [home /]> home
  Connected to home
  ```
* `hostname` - Shows which machine you are currently connected to
  ```
  [home /]> hostname
  home
  ```

#### Learning whats around you
* Scan  
  `scan` shows servers 1 hop away from your current host.

  Example Output:
  ```
  Hostname        IP       Root Access
  n00dles         90.7.6.3 N
  foodnstuff      70.4.6.8 N
  sigma-cosmetics 41.9.9.6 N
  joesguns        89.6.9.7 N
  hong-fang-tea   35.4.3.5 N
  harakiri-sushi  49.6.5.6 N
  iron-gym        91.5.4.0 N
  ```

* scan-analyze <depth>  
   The `scan-analyze` command shows the network topology and key hacking requirements for each server. `scan-analyze <depth>` shows a tree view out to N hops. Great for “how do I reach X?” It is one of the most important discovery tools in the game.

  Example Output:
  ```
  home /]> scan-analyze 
  ┗ home
    ┃   Root Access: YES, Required hacking skill: 1
    ┃   Number of open ports required to NUKE: 5
    ┃   RAM: 8.00GB
    ┣ n00dles
    ┃     Root Access: NO, Required hacking skill: 1
    ┃     Number of open ports required to NUKE: 0
    ┃     RAM: 4.00GB
    ┣ foodnstuff
    ┃     Root Access: NO, Required hacking skill: 1
    ┃     Number of open ports required to NUKE: 0
    ┃     RAM: 16.00GB
    ┣ sigma-cosmetics
    ┃     Root Access: NO, Required hacking skill: 5
    ┃     Number of open ports required to NUKE: 0
    ┃     RAM: 16.00GB
    ┣ joesguns
    ┃     Root Access: NO, Required hacking skill: 10
    ┃     Number of open ports required to NUKE: 0
    ┃     RAM: 16.00GB
    ┣ hong-fang-tea
    ┃     Root Access: NO, Required hacking skill: 30
    ┃     Number of open ports required to NUKE: 0
    ┃     RAM: 16.00GB
    ┣ harakiri-sushi
    ┃     Root Access: NO, Required hacking skill: 40
    ┃     Number of open ports required to NUKE: 0
    ┃     RAM: 16.00GB
    ┗ iron-gym
          Root Access: NO, Required hacking skill: 100
          Number of open ports required to NUKE: 1
          RAM: 32.00GB
  ```
  * Root Access: If no, you must: a) meet the hacking level, b) open enough ports and c) run `nuke.exe`
  * Required hacking skill: Your hacking level must be ≥ this number, if not, you will not be able to `hack`, `grow`, `weaken` or `nuke` the server.
  * Number of open ports required to NUKE: This indicates the number of programs (`BruteSSH.exe` , `FTPCrack.exe`, `relaySMTP.exe` , `HTTPWorm.exe` , `SQLInject.exe` etc) programs you need to run against it
  * RAM: More RAM, more scripts can run
* connect <hostname>  
`connect <hostname>` connects you to a server 1 hop from your current location on the network

  ```
  [home /]> connect n00dles
  Connected to n00dles
  ```

#### Inspecting a server

* analyze  
  `analyze` shows key stats for the current server (or sometimes accepts a hostname depending on your version/config).
  Typical things you’re looking for:

  * Required hacking level
  * Number of ports required
  * Current security / minimum security
  * Current money / max money
  * RAM

  Example Output:
  ```
  [n00dles /]> analyze
  Analyzing system...
  [||||||||||||||||||||||||||||||||||||||||||||||||||]
  n00dles: 
  Organization name: Noodle Bar
  Root Access: NO
  Can run scripts on this host: NO
  RAM: 4.00GB
  Backdoor: NO
  Required hacking skill for hack() and backdoor: 1
  Server security level: 1.000
  Chance to hack: 0.00%
  Time to hack: 49.264 seconds
  Total money available on server: $70.000k
  Required number of open ports for NUKE: 0
  SSH port: Closed
  FTP port: Closed
  SMTP port: Closed
  HTTP port: Closed
  SQL port: Closed
  [n00dles /]>
  ```
  * Rule of thumb early:
    * If you can hack it and it has money, it’s worth using.
    * n00dles is the classic “starter punching bag.”

# Manual Hacking

To run scripts on a server, you usually need:

* Enough hacking level
* Enough open ports (done by running cracking programs)
* Then run NUKE.exe

## Manual hacking commands (before scripting)

Bitburner lets you manually run the “big three” in the terminal:

* `hack <server>` - Steals money, increases security a bit.
* `grow <server>` - Increases available money, increases security.
* `weaken <server>` - Lowers security (usually by a small amount per thread in scripting; terminal is single action).

A simple manual loop:

> weaken n00dles  
(wait)  
> grow n00dles  
(wait)  
> hack n00dles  
(wait)  
(repeat)  

Practical loop (easy mode):

* If money is low → grow
* If security is high → weaken
* Otherwise → hack

## Opening ports on target machines

Eventually, you will need to open ports on a target machine before you can control it. You will need to buy and use programs like:

* BruteSSH.exe
* FTPCrack.exe
* relaySMTP.exe
* HTTPWorm.exe
* SQLInject.exe

Early game: many servers need 0 ports, so you can often nuke them as soon as you can reach them.

# Scripting 101

## Files & editor (so you can start scripting)
* `ls` - Lists files on the current server.
  ```
  > ls
  NUKE.exe
  BruteSSH.exe
  ...
  ```
* `cat <file>` - Prints a file (text/scripts).
* `nano <filename>` - Opens the in-game editor. This is how you write your first script.
  ```
  > nano starter-hack.js
  (open editor)
  ```
## Running scripts (the “process” model)
A script running is a process with a PID.

* `run <script> [-t threads] [args...]` - Runs a script on the current machine.
  ```
  > run starter-hack.js
  Running script with pid 7
  ```
  Threads multiply hack/grow/weaken effects but also multiply RAM usage.
* `ps` - Shows running scripts on the current host.
  ```
  > ps
  PID  Script             Threads  Args
  7    starter-hack.js    1        n00dles
  ```
* `kill <pid>` and `killall` - Stops scripts.
  ```
  > kill 7
  > killall
  ```
* `tail <script or pid>` - Opens the log window (helpful while learning).
  ```
  > tail starter-hack.js
  ```

## Your first script
At it's core, the scripts you will write use Javascript. 

### HelloWorld
First, lets create the file we will run (You should do this from `home`)  
`vim helloworld.js`  
Now, lets add the content  

```javascript
/** @param {NS} ns */
export async function main(ns) {
ns.tprint("Hello World!")
}
```  
Go back to the terminal  
Run the script  
```
[home /]> ./helloworld.js 
Running script with 1 thread, pid 3 and args: [].
helloworld.js: Hello World!
```
### Scan Server
Cool, now lets learn more about a target!

`vim scan.js`

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = "n00dles";

  const moneyNow = ns.getServerMoneyAvailable(target);
  const moneyMax = ns.getServerMaxMoney(target);

  const secNow = ns.getServerSecurityLevel(target);
  const secMin = ns.getServerMinSecurityLevel(target);

  ns.tprint("=== SERVER STATUS ===");
  ns.tprint(`Target: ${target}`);
  ns.tprint(`Money: $${Math.floor(moneyNow)} / $${Math.floor(moneyMax)}`);
  ns.tprint(`Security: ${secNow.toFixed(2)} (min ${secMin.toFixed(2)})`);
}
```
* Why `Math.floor()`?
  Money values are floating-point numbers internally (e.g. 45321.8429).  
  We round down for readability and to avoid showing money that doesn’t really exist.  
  
  Security is shown with decimals because small changes matter.

```
[home /]> ./scan.js
Running script with 1 thread, pid 4 and args: [].
scan.js: === SERVER STATUS ===
scan.js: Target: n00dles
scan.js: Money: $1750000 / $1750000
scan.js: Security: 1.12 (min 1.00)
[home /]> 
```
### Scan Server (While Loop)
Very cool, but we don't really want to keep running this over and over, so let's add a while loop, the while loop looks like this:
```javascript
while(true) {
  do stuff
  // wait for 2 seconds
  await ns.sleep(2000);
}
```

The resulting script should look something like this (notice we are printing to the logs (`print`) and not the terminal (`tprint`)!:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = "n00dles";

  while (true) {
    const moneyNow = ns.getServerMoneyAvailable(target);
    const moneyMax = ns.getServerMaxMoney(target);

    const secNow = ns.getServerSecurityLevel(target);
    const secMin = ns.getServerMinSecurityLevel(target);

    ns.clearLog();
    ns.print(`Target: ${target}`);
    ns.print(`Money: $${Math.floor(moneyNow)} / $${Math.floor(moneyMax)}`);
    ns.print(`Security: ${secNow.toFixed(2)} (min ${secMin.toFixed(2)})`);

    await ns.sleep(2000);
  }
}
```
### Rudamentry Hacking Script 1

This script only hacks, it ignores security and money.

Create: starter-hack.js

In terminal:
`> nano starter-hack.js`

Paste this:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0] ?? "n00dles";

  while (true) {
    await ns.hack(target);  // steal money :contentReference[oaicite:1]{index=1}
  }
}
```

Why this works:

ns.hack(host) is the core hacking call

It’s async and uses await (these hacking actions take time)

Run it
`> run starter-hack.js n00dles`
Running script with pid 1
`> ps`
`> tail 1`

What you’ll notice: security climbs and income eventually gets worse. That’s expected—this is why you add grow/weaken.

#### Upgrade the script: “HGW” (Hack/Grow/Weaken)

Replace your file with this “baby brain” loop:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0] ?? "n00dles";

  while (true) {
    // If security is above minimum, reduce it
    if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) + 5) {
      await ns.weaken(target); // lowers security :contentReference[oaicite:4]{index=4}
      continue;
    }

    // If money is below 75% of max, grow it
    if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.75) {
      await ns.grow(target);   // increases money :contentReference[oaicite:5]{index=5}
      continue;
    }

    // Otherwise, hack
    await ns.hack(target);     // steal money :contentReference[oaicite:6]{index=6}
  }
}
```

Notes:
This uses the “obvious” checks:
* money now vs max
* security now vs min

It’s not “optimal batching” (that comes later), but it prints money and levels you up and teaches the loop.

### Rudamentry Hacking Script 2
VERY cool, now, lets make some decisions based on the results of the scan, we'll call the script `hack_noodles.js`

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = "n00dles";

  const moneyTargetPercent = 0.75;
  const securityPadding = 5;

  while (true) {
    const moneyNow = ns.getServerMoneyAvailable(target);
    const moneyMax = ns.getServerMaxMoney(target);

    const secNow = ns.getServerSecurityLevel(target);
    const secMin = ns.getServerMinSecurityLevel(target);

    if (secNow > secMin + securityPadding) {
      ns.print("Decision: WEAKEN");
      await ns.weaken(target);
    } else if (moneyNow < moneyMax * moneyTargetPercent) {
      ns.print("Decision: GROW");
      await ns.grow(target);
    } else {
      ns.print("Decision: HACK");
      await ns.hack(target);
    }
  }
}
```
### Memory Management

OK! now that our script is running and doing stuff, lets learn more about what's happening!

here, we can see that the script needs 2.4GB of RAM to run, since we have 8GB on the system (to start) we can run 3 iterations of the script, but hitting the same target like this may not be suppper helpful, but MAYBE if you had scripts that each did a particular thing (like, one weakens, one grows, one hacks) then you could do a type of distributed attack, especially from different servers!

`mem hack_noodles.js`

```
[home /]> mem hack_noodles.js 
This script requires 2.40GB of RAM to run for 1 thread(s)
  1.60GB | baseCost (misc)
  0.15GB | weaken (fn)
  0.15GB | grow (fn)
  0.10GB | getServerMoneyAvailable (fn)
  0.10GB | getServerMaxMoney (fn)
  0.10GB | getServerSecurityLevel (fn)
  0.10GB | getServerMinSecurityLevel (fn)
  0.10GB | hack (fn)
[home /]> 
```

Now, if you want to see the decisions being made, you can use the `tail` command (IE: `tail hack_noodles.js`) and you can also `tail` a `PID` if you have multiple copies of the script running

## Where to go from here (skill-building roadmap)

Once the HGW loop makes sense, your next upgrades are:

Logging + visibility

Add `ns.print()` and run with tail so you can see what it’s doing.

Eventually learn `ns.tprint()` / `ns.tprintRaw()` for terminal output (nice for status scripts).

Threads

Use run `script.js -t 10 target`

Learn to compute max threads: `Math.floor((maxRam-usedRam)/scriptRam)`

Using other servers’ RAM

scp your script to a rooted server and run it there.

Then learn `ns.exec()` to run scripts remotely (big step).

Better target selection

Choose targets by “max money / hack time / success chance”

Use analysis functions like hackAnalyze etc. (later)

## Common beginner mistakes

- Running many hack scripts without coordination (security explodes, income drops)
- Forgetting that each script instance has its own PID and log
- Thinking scripts are bought instead of written
- Ignoring RAM usage until scripts fail to start

## Cheat Sheet
### Navigation
`home`, `scan`, `scan-analyze 2`, `connect X`, `hostname`
### Inspect
`analyze`
### Rooting
run port crackers (when you have them), then `NUKE.exe`
### Files
`ls`, `nano file.js`, `cat file.js`
### Scripts
`run file.js [-t N] [args...]`
`ps`, `tail <pid>`, `kill <pid>`, `killall`

# Scripting 201
Up to this point, you’ve written scripts that:

* run on one server
* make decisions locally
* use only the RAM of that server

This works, but it doesn’t scale.

Lets figure out how to use multiple servers together, without jumping straight into advanced scheduling or batching.

The key shift at this level is:

Stop thinking “one script does everything.”
Start thinking “many simple scripts, coordinated on purpose.”

## Intermediate Goal

By the end of this section, we should understand how to:

* run scripts on other servers
* separate decision-making from work
* avoid scripts fighting each other
* think in terms of roles, not just files

No math-heavy batching yet, No perfect timing, Just coordination.

### Running scripts on another server

So far, we used:  

`run script.js`

That always runs the script on the server you’re connected to.

New function  
`ns.exec(script, host, threads, args...)`

This runs a script on another server if:
* you have root access
* the script exists on that server
* it has enough RAM

#### Mini exercise: “Hello from over there”

Create `remote_hello.js`:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  ns.tprint(`Hello from ${ns.getHostname()}`);
}
```

Copy it:  
`scp remote_hello.js foodnstuff`

Run it remotely:
```
run remote_hello.js
exec remote_hello.js foodnstuff 1
```

Expected result:

* One message says Hello from home
* One message says Hello from foodnstuff

We now understand that scripts know where they’re running.

### Why “do everything” scripts don’t scale
Right now, the old scripts:

* decides what to do
* runs hack/grow/weaken
* repeats forever

If you run this script on multiple servers, each one:

* makes its own decisions
* changes money/security independently
* interferes with the others

This is why income often gets worse when you “just run more scripts.”

### Introduce single-purpose worker scripts

The fix is to make scripts that:
* do one thing
* do it once
* then exit

#### Worker scripts
`weaken.js`
```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0];
  await ns.weaken(target);
}
```

`grow.js`
```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0];
  await ns.grow(target);
}
```

`hack.js`
```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0];
  await ns.hack(target);
}
```

These scripts:

* don’t loop
* don’t decide
* don’t interfere

They are _tools_, not brains.

#### Mini exercise: use workers manually
From `home`:
```
scp hack.js grow.js weaken.js foodnstuff
exec weaken.js foodnstuff 1 n00dles
```

Watch:

* security drop
* script exit
* RAM free itself

We now understand short-lived scripts and remote execution.

### Introduce the idea of a “controller”

Now that we have:

* scripts that do work
* scripts that can run anywhere

We need one place that decides what should happen.

This script:

* never hacks directly
* never grows directly
* only tells workers what to do

This is the controller pattern.

### A very simple controller (single worker)

Create `controller_basic.js`:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const target = "n00dles";
  const worker = "foodnstuff";

  while (true) {
    const moneyNow = ns.getServerMoneyAvailable(target);
    const moneyMax = ns.getServerMaxMoney(target);

    const secNow = ns.getServerSecurityLevel(target);
    const secMin = ns.getServerMinSecurityLevel(target);

    if (secNow > secMin + 5) {
      ns.exec("weaken.js", worker, 1, target);
    } else if (moneyNow < moneyMax * 0.75) {
      ns.exec("grow.js", worker, 1, target);
    } else {
      ns.exec("hack.js", worker, 1, target);
    }

    await ns.sleep(2000);
  }
}
```

We will run it from `home`.

We now understand:

* decisions happen in one place
* workers act on command
* scripts no longer fight each other

### Expanding to multiple workers (still simple)

Now add more worker servers:

```
const workers = ["foodnstuff", "sigma-cosmetics"];
```

Then loop over them:
```javascript
for (const w of workers) {
  ns.exec("weaken.js", w, 1, target);
}
```

We now understand that only one controller per target and if two controllers target the same server, you’re back to chaos.

### Recap

We've learned:
* separation of concerns
* distributed work
* centralized control
* why RAM pooling matters later
* why batching exists (even though you’re not doing it yet)

What we are intentionally not doing yet, we are not:
* calculating exact thread counts
* aligning action finish times
* batching
* optimizing hack percentages

Those require everything we've just learned.

#### Intermediate Takeaway

*** Intermediate automation is not about speed — it’s about coordination. ***

Once coordination clicks, efficiency becomes possible.

We are ready to move on when:

* We instinctively separate “decision” and “work”
* We care where RAM lives
* We want to answer “where should this script run?”

# Scripting 301
This section contains spoilers! The goal of these is to give you goals to progress to

## Pool all RAM across all servers (find free capacity)

Goal

At any moment, you want to know:

* total RAM across all rooted servers
* used vs free RAM
* which servers have enough space to run another worker script

### Add a “RAM dashboard” script

Create `ram_report.js`:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const start = "home";
  const seen = new Set([start]);
  const queue = [start];

  const rows = [];

  while (queue.length) {
    const host = queue.shift();
    for (const next of ns.scan(host)) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }

    if (!ns.hasRootAccess(host)) continue;

    const max = ns.getServerMaxRam(host);
    const used = ns.getServerUsedRam(host);
    const free = max - used;

    rows.push({ host, max, used, free });
  }

  rows.sort((a, b) => b.free - a.free);

  let totalMax = 0, totalUsed = 0;

  ns.tprint("HOST                MAX     USED    FREE");
  ns.tprint("------------------------------------------------");
  for (const r of rows) {
    totalMax += r.max;
    totalUsed += r.used;
    ns.tprint(
      `${r.host.padEnd(18)} ${r.max.toFixed(2).padStart(6)}  ${r.used.toFixed(2).padStart(6)}  ${r.free.toFixed(2).padStart(6)}`
    );
  }
  ns.tprint("------------------------------------------------");
  ns.tprint(`TOTAL               ${totalMax.toFixed(2)}  ${totalUsed.toFixed(2)}  ${(totalMax-totalUsed).toFixed(2)}`);
}
```

Usage:  
`run ram_report.js`  

We can now make our controller smart: “find the server with the most free RAM and run workers there.”

## “Rootkit deploy tool” (auto-root + copy scripts everywhere)

There are two deployment problems:

* Gaining root (depends on hacking level + number of cracking programs you own)
* Copying scripts to servers you control (easy once you have root)

So your deploy tool should:

* discover all servers
* attempt to gain root where possible
* copy your standard scripts (hack.js, grow.js, weaken.js, controllers, etc.)

A practical “deploy everything” script

Create `deploy_all.js`:

```javascript
/** @param {NS} ns **/
export async function main(ns) {
  const start = "home";
  const seen = new Set([start]);
  const queue = [start];

  // scripts you want everywhere
  const payload = ["hack.js", "grow.js", "weaken.js", "controller.js", "ram_report.js"];

  // available port openers (depends on programs you own)
  const openers = [
    { file: "BruteSSH.exe", fn: (host) => ns.brutessh(host) },
    { file: "FTPCrack.exe", fn: (host) => ns.ftpcrack(host) },
    { file: "relaySMTP.exe", fn: (host) => ns.relaysmtp(host) },
    { file: "HTTPWorm.exe", fn: (host) => ns.httpworm(host) },
    { file: "SQLInject.exe", fn: (host) => ns.sqlinject(host) },
  ];

  const have = openers.filter(o => ns.fileExists(o.file, "home"));

  while (queue.length) {
    const host = queue.shift();
    for (const next of ns.scan(host)) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }

  for (const host of [...seen]) {
    if (host === "home") continue;

    // Try to root if we don't have it
    if (!ns.hasRootAccess(host)) {
      const reqPorts = ns.getServerNumPortsRequired(host);
      const reqHack = ns.getServerRequiredHackingLevel(host);

      if (ns.getHackingLevel() < reqHack) {
        ns.tprint(`[SKIP] ${host}: need hack ${reqHack}`);
        continue;
      }
      if (have.length < reqPorts) {
        ns.tprint(`[SKIP] ${host}: need ${reqPorts} port openers, you have ${have.length}`);
        continue;
      }

      // open required ports, then nuke
      try {
        for (let i = 0; i < reqPorts; i++) have[i].fn(host);
        ns.nuke(host);
        ns.tprint(`[ROOT] ${host}`);
      } catch (e) {
        ns.tprint(`[FAIL] ${host}: ${String(e)}`);
        continue;
      }
    }

    // Once rooted, copy scripts
    try {
      await ns.scp(payload, host);
      ns.tprint(`[COPY] ${host}: ${payload.length} files`);
    } catch (e) {
      ns.tprint(`[FAIL] SCP to ${host}: ${String(e)}`);
    }
  }
}
```

Usage:  
`run deploy_all.js`

Why this is awesome for players: it turns “ugh admin chores” into one command. Also makes your repo feel like a real toolkit.

### Better efficiency logic (best use of resources)

This is where “advanced” actually begins.

There are three big upgrades:

#### Pick the best target automatically

Instead of hardcoding n00dles, evaluate targets.

A simple scoring heuristic:

* ignore servers with maxMoney = 0
* prefer high money
* prefer fast hack time
* prefer good success chance

Example score:  
`score = (maxMoney * hackChance) / hackTime`

Then pick highest score you can currently hack.

#### Allocate threads where they matter

Once you can measure free RAM (Section 1), you can:

* compute threads per worker per host
* avoid wasting 0.3GB leftovers everywhere
* distribute work without spamming the same server with random scripts

#### Don’t “HGW randomly” — do “prep then farm”

A common efficiency pattern:
* Prep phase: bring security to min, money to max
* Farm phase: repeat hack/grow/weaken in a controlled ratio

Even without true batching, this stabilizes income a lot.

## Extra “advanced but still approachable” ideas
### A “single command” runner

Make start.js that does:

* deploy_all
* choose best target
* start controllers on best available worker servers

This gives the player a “game loop button.”

### A “server inventory” view

Make servers_report.js listing:

* rooted?
* required hack level
* required ports
* max money
* min security
* RAM
Sorted by “can I own this soon?”  

This becomes your roadmap.

### Safety: prevent duplicate controllers

Teach a rule in code:

* controller checks if another controller is already running (ns.ps(host))
* if yes, don’t launch a second one

That prevents beginners from accidentally tanking their own efficiency.

### Introduce purchased servers (later)

Once they start buying servers, your deploy tool becomes even more valuable, because you treat purchased servers like workers.
