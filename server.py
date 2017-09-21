#!/usr/bin/python
from flask import Flask, request, render_template, send_file
from PIL import Image
import base64
app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def image_storage():
    if request.method == 'POST':
        print(len('data:image/png;base64,'))
        data = base64.b64decode(request.data[22:])
        app.stored_image = open("saved.png", "wb")
        app.stored_image.write(data)
        app.stored_image.close()
        # print(dir(app.stored_image))
        return 'received'
    elif request.method == 'GET':
        return send_file('saved.png', mimetype='image/png')
        # return render_template('index.html')
        # return '<html><body><img src ="{}"></img></body></html>'.format(open("saved.png", 'r'))


if __name__ == '__main__':
    app.run(debug=True)