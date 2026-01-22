# Game Overview
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

# Terminal Command Help
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

# Basic Commands
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

# 1. Learning whats around you
* Scan 
Shows servers 1 hop away from your current host.

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
Shows a tree view out to N hops. Great for “how do I reach X?”

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

* connect <hostname>
Connects you to a server 1 hop from your current location on the network

```
[home /]> connect n00dles
Connected to n00dles
```

# 2. Inspecting a server

* analyze
Shows key stats for the current server (or sometimes accepts a hostname depending on your version/config).
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


