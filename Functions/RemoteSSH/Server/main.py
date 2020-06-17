import socket

localhost = "localhost" # 本地IP地址
port = 26676    # 欲绑定端口号
bufsiz = 1024   # buffer缓冲区大小
addr = (localhost,port) # 绑定Address


# socket初始化
def _init():
    Sersock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    Sersock.bind(addr)
    Sersock.listen(5)
    return Sersock


def recvCommand(Sersock):
    while True:
        CliSock, CliAddr = Sersock.accept()
        print("连接来自:", CliAddr)
        # -----------
        # 插入安全模块
        # -----------
        recv = CliSock.recv(bufsiz)
        print(recv)


# 主函数
def main():
    Sersock = _init()
    recvCommand(Sersock)

main()