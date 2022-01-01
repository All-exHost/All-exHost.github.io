import os, json


def Run(iconType):
    path = os.getcwd()
    files = os.listdir(path)

    jsonPath = (
        path[: len(path) - len("game icon formater")] + "\\game icon data\\icons.json"
    )

    with open(path + "\\json.txt", "w+") as text:
        for file in files:
            if ".png" in file or ".PNG" in file:
                edit = file[: file.find(".png")].lower()
                if "-" in file:
                    edit = edit.replace("-", " ")
                if "'" in file:
                    edit = edit.replace("'", "")
                if "~" in file:
                    edit = edit.replace("~", "")
                if "_" in file:
                    edit = edit.replace("_", "")

                with open(jsonPath, "r+") as jsonFile:
                    data = json.load(jsonFile)
                    targetArray = data[iconType]["iconName"]
                    matchArray = [name for name in targetArray if edit in name]

                    if len(matchArray) > 0:
                        edit += " (" + str(len(matchArray) + 1) + ")"

                    try:
                        os.rename(
                            path + "\\" + file, path + "\\ready\\" + edit + ".png"
                        )
                    except FileExistsError:
                        numExist = int(edit[edit.find("(") + 1 : edit.find(")")])
                        edit = edit[: edit.find("(")] + "(" + str(numExist + 1) + ")"
                        os.rename(
                            path + "\\" + file, path + "\\ready\\" + edit + ".png"
                        )

                    text.write('"' + edit + '",\n')
                    data[iconType]["iconName"].append(edit)

                    jsonFile.seek(0)
                    jsonFile.truncate()
                    json.dump(data, jsonFile)
                print("Added icon successfully.")

        os.startfile(path + "\\json.txt")


Run(input("Enter the image type(3d/cover/ps5): ").lower())
tmp = input("quit...")