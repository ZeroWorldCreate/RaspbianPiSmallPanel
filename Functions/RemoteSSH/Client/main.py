import socket

host = "127.0.0.1"
port = 26676
bufsize = 1024
addr = (host,port)

CliSock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
CliSock.connect(addr)
