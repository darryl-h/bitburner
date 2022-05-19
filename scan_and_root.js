// This is an old script, probably don't use it. This will only scan the servers near you.

/** @param {NS} ns */
export async function main(ns) {
    ns.tprint("[VERS] - Version 0.10");
    // Get a list of servers that are near us
    let servers = ns.scan(ns.getHostname());
    let home_server_position = servers.indexOf("home");
    if (home_server_position != -1) {
        servers.splice(home_server_position, 1);
    }
    ns.tprint("DEBUG Home position: " + home_server_position);
    ns.tprint("-----[LOCAL INFO]-----");
    ns.tprint("ServerName: " + ns.getHostname());
    // print a list of servers
    ns.tprint("Nearby Servers: " + servers);
    // Do something on each server
    ns.tprint("-----[TARGETS]--------");
    for (let serverName of servers) {
        ns.tprint(" -- Server : " + serverName + " --");
        ns.tprint("[CHEK] - Checking for root access...")
        if (ns.hasRootAccess(serverName)) {
            ns.tprint("[ OK ] - Already have root");
        } else {
        // Probe and Root the machine (if possible)
            ns.tprint("[PROB] - Probing server");
            let required_ports = ns.getServerNumPortsRequired(serverName);
            // Set Open Ports to 0 for this iteration
            let openPorts = 0;
            // Try to use each tool to open another port on the target machine
            ns.tprint("[TOOL] - Looking for appropriate tool to gain access");
            if (ns.fileExists("BruteSSH.exe", "home")) {
                ns.tprint("[TOOL] - Running BruteSSH");
                ns.brutessh(serverName);
                openPorts++;
            }
            if (ns.fileExists("FTPCrack.exe", "home")) {
                ns.tprint("[TOOL] - Running FTPCrack");
                ns.ftpcrack(serverName);
                openPorts++;
            }
            if (ns.fileExists("RelaySMTP.exe", "home")) {
                ns.tprint("[TOOL] - Running RelaySMTP");
                ns.relaysmtp(serverName);
                openPorts++;
            }
            if (ns.fileExists("HTTPWorm.exe", "home")) {
                ns.tprint("[TOOL] - Running HTTPWorm");
                ns.httpworm(serverName);
                openPorts++;
            }
            if (ns.fileExists("SQLInject.exe", "home")) {
                ns.tprint("[TOOL] - Running SQLInject");
                ns.sqlinject(serverName);
                openPorts++;
            }
            // Once we have enough open ports, nuke the server to get root
            if (ns.getServerNumPortsRequired(serverName) <= openPorts) {
                ns.tprint("[ROOT] - Rooting " + serverName);
                ns.nuke(serverName);
            } else {
                ns.tprint("[FAIL] - Failed to gain root access!");
                ns.tprint("[INFO] - Open Ports: " + openPorts + " of " + required_ports);
            }
        }
        // let remote_servers = ns.scan(serverName);
        // if(remote_servers.length>0) {
        //     ns.tprint("Nearby Servers: " + remote_servers);
        // }
        // Get the remote servers to the target server
        let remote_servers = ns.scan(serverName);
        // Find the ID of the remote server from the target server remote server output
        let source_server_position = remote_servers.indexOf(ns.getHostname());
        // Remove the current server from the output from the target server
        remote_servers.splice(source_server_position, 1);
        // Remove home from the output IF it exists
        let home_server_position = servers.indexOf("home");
        if (home_server_position != -1) {
            remote_servers.splice(home_server_position, 1);
        }
        // If there is any output, let the user know
        if (remote_servers.length > 0) {
            ns.tprint("[NEAR] - Nearby Servers: " + remote_servers);
        }
        // Now we can copy our files to this server
        ns.tprint("[COPY] - copying rootkit to " + serverName);
        await ns.scp("early-hack-template.script", serverName);
        await ns.scp("scan_and_root.js", serverName);
        // ns.tprint("Remote Executing against " + serverName);
        // ns.exec("early-hack-template.script", serverName, 1, "n00dles");
    }
}