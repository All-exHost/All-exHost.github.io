import os

path = os.getcwd() + "\\game icon formater"
files = os.listdir(path)

looking4 = "cod.png"
for file in files:
    if looking4 in file:
        edit = file[: file.find(looking4) - 1] + ".png"
        print(edit)

        os.rename(path + "\\" + file, path + "\\edited\\" + edit)
