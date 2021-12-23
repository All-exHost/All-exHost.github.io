import os

path = os.getcwd() + "\\game icon formater"
files = os.listdir(path)

with open(path + "\\json.txt", "w+") as text:
    for file in files:
        if ".png" in file or ".PNG" in file:
            edit = file[: file.find(".png")].lower()
            if "-" in file:
                edit = edit.replace("-", " ")
            text.write('"' + edit + '",')

            os.rename(path + "\\" + file, path + "\\edited\\" + edit + ".png")
