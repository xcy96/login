#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void main(){
	char uname[256];
	char pwd[256];
	char command[512]={'\0'};
	printf("请输入用户名:\n");
	scanf("%s",&uname);
	printf("请输入密码：\n");
	scanf("%s",&pwd);
	strcat(command,"node ./loginLab.js -u");
	strcat(command,uname);
	strcat(command," -p");
	strcat(command,pwd);
	system(command);
	system("pause");
}
