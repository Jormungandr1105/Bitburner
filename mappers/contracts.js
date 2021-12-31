/** @param {NS} ns **/
export async function main(ns) {
	var text = ns.read("/maps/server_list.txt");
	var servers = text.split("\n");
	var contracts = []
	for (let i=1; i<servers.length; i++) {
		let char = "_";
		let contents = ns.ls(servers[i]);
		for(let j=0;j<contents.length;j++) {
			//ns.tprint(contents[j]);
			if (contents[j].indexOf(".cct") != -1) {
				char = "!";
				break;
			}
		}
		contracts.push(char);
	}
	for (let i=1; i<servers.length; i++) {
		var prepend = "";
		if(contracts[i-1] === "!") {
			prepend = "WARN \r";
		}
		ns.tprint(prepend + servers[i] + ": " + contracts[i-1]);
	}
}