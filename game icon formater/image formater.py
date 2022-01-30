import os, json, time


def timestamp(increment):
    # unique number to avoid clashes in icons naming
    result = ""
    time.sleep(0.15)
    x = time.localtime()
    structure = (
        x.tm_year,
        x.tm_mon,
        x.tm_mday,
        x.tm_hour,
        x.tm_min,
        x.tm_sec,
        str(round(time.time() * 1000) + increment)[-1:],
    )

    for i in structure:
        result += f"{i}"

    return result[2:]  # remove century


def Run(iconType):
    path = os.getcwd()
    files = os.listdir(path)
    jsonPath = (
        path[: len(path) - len("game icon formater")] + "\\game icon data\\icons.json"
    )

    counter = 1
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
                    time.sleep(0.1)
                    stamp = timestamp(counter)
                    edit += f" ({stamp})"

                    try:
                        os.rename(
                            path + "\\" + file, path + "\\ready\\" + edit + ".png"
                        )
                    except Exception as e:
                        print(str(e))
                    text.write(f"{edit}\n")
                    data[iconType]["iconName"].append(edit)

                    jsonFile.seek(0)
                    jsonFile.truncate()
                    json.dump(data, jsonFile)
                    counter += 1
                print("Added icon successfully.")

        os.startfile(path + "\\json.txt")


Run(input("Enter the image type(3d/cover/ps5/homebrew/system/qz): ").lower())
