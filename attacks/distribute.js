/** @param {NS} ns **/
export async function main(ns) {
	var text = ns.read("/maps/server_list.txt");
	var servers = text.split("\n");
	for(let i=0; i<servers.length; i++) {
		await ns.scp("/attacks/hack.js","home",servers[i]);
		await ns.scp("/attacks/grow.js","home",servers[i]);
		await ns.scp("/attacks/weaken.js","home",servers[i]);
	}
}