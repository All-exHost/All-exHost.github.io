import os

path = os.getcwd() + "\\formater"
files = os.listdir(path)

for file in files:
    if ".png" in file or ".PNG" in file:
        edit = file[: file.find(".png")].title()
        if "-" in file:
            edit = edit.replace("-", " ")

        os.rename(path + "\\" + file, path + "\\edited\\" + edit + ".png")
