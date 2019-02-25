const http = require('http');
const https = require('https');
// const querystring = require('querystring');
const usrname = '';
const pwd = '';
const postData = 'PtUser=' + usrname + '&PtPwd=' + pwd + '&PtButton=%B5%C7%C2%BC';
const options = {
	port: 80,
	hostname: '172.24.39.253',
	method: 'POST',
	path: '/portal/logon.cgi',
	headers: {
		'Host': '172.24.39.253',
		'Connection': 'keep-alive',
		'Cache-Control': 'max-age=0',
		'Upgrade-Insecure-Requests': 1,
		'Origin': 'http://172.24.39.253',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(postData),
		'User-Agent': "Mozilla / 5.0(Windows NT 6.3; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 72.0 .3626 .109 Safari / 537.36",
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'Referer': 'http://172.24.39.253/portal/logon.htm',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'zh-CN,zh;q=0.9',
		// 'Cookie': 'LPTSRVID=25406020510'
	}

}
const postData2 = 'DDDDD=' + usrname + '&upass=' + pwd + '&v46s=1&v6ip=&f4serip=172.30.201.2&0MKKey=';
const options2 = {
	hostname: 'lgn.bjut.edu.cn',
	port: 443,
	path: '/',
	method: 'POST',
	headers: {
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'zh-CN,zh;q=0.9',
		'Cache-Control': 'max-age=0',
		'Connection': 'keep-alive',
		'Content-Length': Buffer.byteLength(postData2),
		'Content-Type': 'application/x-www-form-urlencoded',
		'Host': 'lgn.bjut.edu.cn',
		'Origin': 'https://lgn.bjut.edu.cn',
		'Referer': 'https://lgn.bjut.edu.cn/',
		'Upgrade-Insecure-Requests': '1',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
	}
}
function loginLab() {
	return new Promise((resolve, reject) => {
		const req = http.request(options, res => {
			res.setEncoding('utf8');
			let data = '';
			res.on('data', chunk => {
				data += chunk;
			});
			res.on('end', () => {
				if (data.indexOf('Logoff') != -1) {
					console.log("图书馆验证界面登陆成功");
					console.log(data);
					resolve(1);
				} else {
					console.log('登录失败');
					resolve(0);
				}
			});
		});
		req.on('error', (e) => {
			console.log('error:' + e);
		})
		req.write(postData);
		req.end();
	});
}

function loginLgn(res) {
	return new Promise((resolve, reject) => {
		if (res == 1) {
			const req = https.request(options2, res => {
				res.setEncoding('utf8');
				let data = '';
				res.on('data', chunk => {
					data += chunk;
				});
				res.on('end', () => {
					if (data.indexOf('successfully') != -1) {
						console.log('lgn界面登录成功');
						resolve(1);
					} else {
						reject();
						console.log('error');
					}
				});
			});
			req.on('error', (e) => {
				console.log('error:' + e.message);
			});
			req.write(postData2);
			req.end();
		} else {
			console.log('登录失败，请检查用户名和密码');
			reject();
		}
	});
}

loginLab()
	.then(loginLgn)
	.then(res => {
		console.log('可以上网了');
	})
	.catch(reason => {
		console.log('error');
	});