/** @param {NS} ns **/
export async function main(ns) {
	var loop = 11;
	var servers;
	var servers_data;
	while(true) {
		if(loop > 10) {
			ns.run("/mappers/root_mapper.js",1,);
			while(ns.scriptRunning("/mappers/root_mapper.js","home")) {
				await ns.sleep(500);
			}
			loop = 0;
			var text = ns.read("/maps/roots.txt");
			servers = text.split("\n");
			servers_data = []
			for(let i=1;i<servers.length; i++) {
				servers_data.push(servers[i].split(","))
			}
		}
		var lvl = ns.getHackingLevel()
		for(let i=0; i<servers_data.length; i++) {
			let server_data = servers_data[i];
			let sname = server_data[0];
			if(server_data[5] === "false" && ns.fileExists("BruteSSH.exe")) {
				ns.brutessh(sname);
				server_data[4] -= 1;
				server_data[5] = "true";
			}
			if(server_data[6] === "false" && ns.fileExists("FTPCrack.exe")) {
				ns.ftpcrack(sname);
				server_data[4] -= 1;
				server_data[6] = "true";
			}
			if(server_data[7] === "false" && ns.fileExists("relaySMTP.exe")) {
				ns.relaysmtp(sname);
				server_data[4] -= 1;
				server_data[7] = "true";
			}
			if(server_data[8] === "false" && ns.fileExists("HTTPWorm.exe")) {
				ns.httpworm(sname);
				server_data[4] -= 1;
				server_data[8] = "true";
			}
			if(server_data[9] === "false" && ns.fileExists("SQLInject.exe")) {
				ns.sqlinject(sname);
				server_data[4] -= 1;
				server_data[9] = "true";
			}
			if (server_data[4]>=server_data[3] && lvl >= server_data[2] && server_data[1] === "false") {
				ns.nuke(sname);
				ns.toast("ROOTED "+ sname,"success",10000);
				server_data[1] = "true"
			} 
		}
		loop++;
		await ns.sleep(1000);
	}
}