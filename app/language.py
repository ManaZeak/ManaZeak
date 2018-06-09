# Loads the json for the language for the user
import json
import os

from django.http import JsonResponse

from app.utils import errorCheckMessage


# Loading the json file corresponding to the language of the user
def loadLanguage(request):
    if request.method == 'POST':
        user = request.user
        pathToLang = "/ManaZeak/languages/"
        if 'LANG' in request:
            language = request['LANG']
            # If the user tweaked the request
            if "/" not in language or "\\" not in language:
                jsonFile = os.path.join(pathToLang, language + ".json")
                # If the local is not found using a default one
                if not os.path.isfile(jsonFile):
                    jsonFile = os.path.join(pathToLang, "en.json")
                with open(jsonFile) as file:
                    data = json.load(file)
                data = {**data, **errorCheckMessage(True, None, loadLanguage)}
            else:
                data = errorCheckMessage(False, "suspiciousOperation", loadLanguage, user)
        else:
            data = errorCheckMessage(False, "badFormat", loadLanguage, user)
    else:
        data = errorCheckMessage(False, "badRequest", loadLanguage)
    return JsonResponse(data)
