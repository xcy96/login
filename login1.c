#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void main(){
	char uname[256];
	char pwd[256];
	char command[512]={'\0'};
	printf("�������û���:\n");
	scanf("%s",&uname);
	printf("���������룺\n");
	scanf("%s",&pwd);
	strcat(command,"node ./loginLab.js -u");
	strcat(command,uname);
	strcat(command," -p");
	strcat(command,pwd);
	system(command);
	system("pause");
}
