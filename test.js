const http = require('http');
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
		// 'Cookie': 'LPTSRVID=25406023544'
	}

}

const req = http.request(options, res => {
	// res.setEncoding('u');
	let data = [];
	res.on('data', chunk => {
		data.push(chunk);
	});
	res.on('end', () => {
		if (data.indexOf('gb2312')) {
			const iconv = require('iconv-lite');
			data=iconv.decode(Buffer.concat(data),'gb2312');
		}
		if (data.indexOf('Logoff') != -1) {
			console.log("图书馆验证界面登陆成功");
		} else {
			console.log('登录失败');
			console.log(data);

		}
	});
});
req.on('error', (e) => {
	console.log('error:' + e);
})
req.write(postData);
req.end();