/** @param {NS} ns **/
export async function main(ns) {
	var text = ns.read("/maps/server_list.txt");
	var servers = text.split("\n");
	var data = "";
	for (let i=0; i<servers.length; i++) {
		let server_info = ns.getServer(servers[i]);
		if (i!=0) {
			data += "\n";
		}
		data += servers[i]; // Name --> [0]
		data += "," + server_info.hasAdminRights; // Root --> [1]
		data += "," + server_info.requiredHackingSkill; // HackerLvl --> [2]
		data += "," + server_info.numOpenPortsRequired; // portsReq --> [3]
		data += "," + server_info.openPortCount; // portsOpen --> [4]
		data += "," + server_info.sshPortOpen; // SSH --> [5]
		data += "," + server_info.ftpPortOpen; // FTP --> [6]
		data += "," + server_info.smtpPortOpen; // SMTP --> [7]
		data += "," + server_info.httpPortOpen; // HTTP --> [8]
		data += "," + server_info.sqlPortOpen; // SQL --> [9]
	}
	ns.write("/maps/roots.txt",data,"w");
}