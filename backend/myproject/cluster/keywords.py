import pytesseract
from PIL import Image
import json

from .models import VideoCluster


# Model for key words extraction and note generation
# r"D:\ts\tesseract.exe"

def text_extract(sessionId, video, uid):
    pytesseract.pytesseract.tesseract_cmd = r"D:\ts\tesseract.exe"

    results = VideoCluster.objects.filter(sessionid=sessionId)

    list_im = ''

    for i in results:
        # print(i.imageslist)
        list_im = json.loads(i.imageslist)

    print(list_im)
    le = len(list_im)
    print(len(list_im))
    print('Im here')

    value = '**********************************************************************Here is your Summary for Key Frames Extraction**********************************************************************************************\n\n\n'
    value_html = ''
    for x in list_im:
        img = Image.open(
            'media/session_' + sessionId + '/save/' + uid + '/session_' + sessionId + '/' + video + '/' + x)
        text = pytesseract.image_to_string(img)

        # ya Nail:
        text = text.replace('ya Nail:', '')

        # pa ail:
        text = text.replace('pa ail:', '')

        text1 = text

        text1 = text1.replace('=', ':')
        text1 = text1.replace('>', '<br/>')

        text_html = '<br/><h2 align="center" style="color:#000066;">' + text1 + '</h3><br/>'

        if text is not None:
            text = '----------------------------------------------------------------------------------------------- Frame No: ' + str(
                x) + ' ----------------------------------------------------------------------------------------- \n' + '\t\t\t' + text
            value = value + text + '\n\n\n'
            value_html = value_html + text_html

    # open text file
    text_file = open("media/videos/session_" + sessionId + "/data_" + str(uid) + ".txt", "w")
    # write string to file
    text_file.write(value)
    # close file
    text_file.close()

    # HTML FILE
    file = open("media/videos/session_" + sessionId + "/data1_" + str(uid) + ".html", "wt")
    file.write("""<!DOCTYPE HTML PUBLIC " -//W3C//DTD HTML 4.01 Transition//EN" 
    "http://www.w3.org/TR/htm14/loose.dtd">
    <html>
      <head>
        <title>""" + sessionId + """ : Key Frames Summerization</title>
      </head>
      <body>
      <div style="margin-left:10%;margin-right:10%;text-align: justify;">
        <h1 align="center" style="color:blue;"> <img src="https://knowmore.s3.us-east-2.amazonaws.com/Knowmore_Final/images/ll1.JPG" width="50" height="60"/> Below displays your  Session ID: """ + sessionId + """ Key Frames Summarization.</h1><h4 align="center"> <br/>You can keep a offline copy for later reference.</h4>
        
        
        <h3 align="center"><br/>""" + '...................................................................................................................' + value_html + """ </h3>
        
        </div>
      </body>
    </html>""")
    file.close()

    print('printing value')
    print(value)
    return value
