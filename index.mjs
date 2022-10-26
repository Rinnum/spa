import {createClient} from 'redis';
import http from 'http'

const port = 5000;

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

http.createServer(async (req, res) => {
	if (req.url !== '/') {
		return
	}
	let visit = await client.get('visit')
	visit = +(visit ?? '0') + 1
	await client.set('visit', visit)
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write(visit.toString());
	res.end();
}).listen(port);
