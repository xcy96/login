# login (北工大图书馆网关登录)
运行环境Node.js
首先连接Tushuguan的WIFI，然后进入cmd输入
```
git clone https://github.com/xcy96/login.git && cd login
```
编辑文件loginLab.js,填写自己的用户名密码，保存之后输入
```
node loginLab
```
启动脚本，有成功字样表示登录成功

2019/2/26

增加命令行参数启动
```
node loginLab.js -u用户名 -p密码
```