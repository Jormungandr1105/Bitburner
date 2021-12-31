/** @param {NS} ns **/
export async function main(ns) {
	var target = ns.args[0];
	var loop = 11;
	var servers = [];
	while(true) {
		if(loop > 10) { // REFRESH DATA
			var text = ns.read("/maps/roots.txt");
			var all_servers = text.split("\n");
			for(let i=1; i< all_servers.length; i++) {
				let data = all_servers[i].split(",");
				if(data[1]==="true" && servers.indexOf(data[0])===-1) {
					servers.push(data[0]);
				}
			}
			loop = 0;
		}
		// CHECK ON SERVERS
		for(let i=0; i<servers.length; i++) {
			let sname = servers[i];
			let maxram = ns.getServerMaxRam(sname);
			let curram = maxram - ns.getServerUsedRam(sname);
			if (curram >= 1.75) {
				let num_threads = Math.floor(curram/1.75);
				if(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target) < .85) {
					ns.exec("/attacks/grow.js",sname,num_threads,target,0);
				} else if (ns.getServerSecurityLevel(target)/ns.getServerMinSecurityLevel(target) > 2.5) {
					ns.exec("/attacks/weaken.js",sname,num_threads,target,0);
				} else {
					ns.exec("/attacks/hack.js",sname,num_threads,target,0);
				}
			}
		}
		loop++;
		await ns.sleep(2000);
	}
}