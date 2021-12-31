/** @param {NS} ns **/
export async function main(ns) {
	var map = ["home"];
	for(let i=0; i<map.length; i++) {
		let scan = ns.scan(map[i]);
		for(let j=0; j<scan.length; j++) {
			let k = 0;
			for(;k<map.length;k++) {
				if(scan[j] === map[k]) {
					break;
				}
			}
			if(k === map.length) {
				map.push(scan[j]);
			}
		}
	}
	let data = "home"
	for(let i=1; i<map.length; i++) {
		data += "\n"+map[i];
	}
	ns.tprint(data);
	ns.write("/maps/server_list.txt",data,"w");
}