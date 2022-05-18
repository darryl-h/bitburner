/** @param {NS} ns */
export async function main(ns) {

    // create a list of ALL servers, and start with home
    let global_server_list = ['home']
    // Iterate through each node on the network
    for (let each_network_branch = 0; each_network_branch < global_server_list.length; each_network_branch++) {
        let this_scan = ns.scan(global_server_list[each_network_branch]);
        // add each unique item to a list
        for (let server_list = 0; server_list < this_scan.length; server_list++) {
            if (global_server_list.indexOf(this_scan[server_list]) === -1) {
                global_server_list.push(this_scan[server_list]);
            }
        }
    }
    ns.tprint("ServerList: " + global_server_list);
    // Remove home from the list
    let home_server_position = global_server_list.indexOf("home");
    if (home_server_position != -1) {
        global_server_list.splice(home_server_position, 1);
    }
    for (let serverName of global_server_list) {
        ns.tprint(" -- Server : " + serverName + " --");
        //ns.tprint("[CHEK] - Checking for root access...")
        if (ns.hasRootAccess(serverName)) {
            ns.tprint("[REDY] - Already have root");
        } else {
        // Probe and Root the machine (if possible)
            //ns.tprint("[PROB] - Probing server");
            let required_ports = ns.getServerNumPortsRequired(serverName);
            // Set Open Ports to 0 for this iteration
            let openPorts = 0;
            // Try to use each tool to open another port on the target machine
            //ns.tprint("[TOOL] - Looking for appropriate tool to gain access");
            if (ns.fileExists("BruteSSH.exe", "home")) {
                //ns.tprint("[TOOL] - Running BruteSSH");
                ns.brutessh(serverName);
                openPorts++;
            }
            if (ns.fileExists("FTPCrack.exe", "home")) {
                //ns.tprint("[TOOL] - Running FTPCrack");
                ns.ftpcrack(serverName);
                openPorts++;
            }
            if (ns.fileExists("RelaySMTP.exe", "home")) {
                //ns.tprint("[TOOL] - Running RelaySMTP");
                ns.relaysmtp(serverName);
                openPorts++;
            }
            if (ns.fileExists("HTTPWorm.exe", "home")) {
                //ns.tprint("[TOOL] - Running HTTPWorm");
                ns.httpworm(serverName);
                openPorts++;
            }
            if (ns.fileExists("SQLInject.exe", "home")) {
                //ns.tprint("[TOOL] - Running SQLInject");
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
        // Now we can copy our files to this server
        ns.tprint("[COPY] - copying payloads to " + serverName);
        await ns.scp("early-hack-template.script", serverName);
    }
}