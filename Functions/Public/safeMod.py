# ================================
# 文件名称：安全模块
# 文件介绍：安全验证集
# 编写人： Mr.LM
# 创建时间：2020年5月16日20:53:41
# ================================


import hashlib


# PrivateMoudle     内部函数集
class PrivateMoudle():
    def readFile(self, filename):
        raise NotImplementedError


# PublicMoudle
class PublicMoudle():
    pass


# RemoteSSH
class RemoteSSH():
    def login(self,user,passwd):
        hash_passwd = hashlib.sha256()
        hash_passwd.update(str(passwd).encode("utf-8"))
        print(hash_passwd.hexdigest())