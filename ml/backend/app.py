from flask import Flask, redirect, url_for, request, render_template, json
from flask_cors import CORS, cross_origin
from flask_jsonpify import jsonify
import os
from flask import flash, redirect
from werkzeug.utils import secure_filename
from flask import send_from_directory
from flask import make_response
import io
import csv
from flask_pymongo import PyMongo
import pandas as pd
UPLOAD_FOLDER = '/home/shivank/pyang/pyback/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MONGO_URI'] = "mongodb://localhost:27017/myDatabase"

mongo = PyMongo(app)
CORS(app)

# @app.route('/success/<name>')
# def success(name):
#    return 'welcome %s' % name

# @app.route('/login',methods = ['POST', 'GET'])
# def login():
#    if request.method == 'POST':
#       user = request.form['nm']
#       return redirect(url_for('success',name = user))
#    else:
#       user = request.args.get('nm')
#       return redirect(url_for('success',name = user))
# @app.route('/')
# def student():
# 	return render_template('student.html')
@app.route('/hello')
def diss():
	return jsonify({'test':'application'})

@app.route('/')
def disp():
	    return jsonify({'this':'hello'})

@app.route('/result', methods = ["POST", "GET"])
def result():
	if request.method == 'POST':
		result = request.form
		return render_template('result.html', result = result) 
	
# if __name__ == '__main__':
#    app.run(debug = True)
def transform(text_file_contents):
    return text_file_contents.replace("=", ",")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    print("in the uploaded_file")
    f = request.files[filename]
    print(f)
    return jsonify({'text' : 'thaisdash'})
    # if not f:
    #     return "No file"

    # stream = io.StringIO(f.stream.read().decode("UTF8"), newline=None)
    # csv_input = csv.reader(stream)
    # #print("file contents: ", file_contents)
    # #print(type(file_contents))
    # print(csv_input)
    # for row in csv_input:
    #     print(row)

    # stream.seek(0)
    # result = transform(stream.read())
    # response = make_response(result)
    # response.headers["Content-Disposition"] = "attachment; filename=filename"
    # response.headers["Access-Control-Allow-Origin"]=  '*'
    # return response

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(UPLOAD_FOLDER)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            mongo.save_file(filename, request.files["file"])
            # f = request.files['file']
            # if not f:
            #     return "No file"
            # stream = io.StringIO(f.stream.read().decode("UTF8"), newline=None)
            # csv_input = csv.reader(stream)
            # for row in csv_input:
            #     print("row")
            #     print(row)
            # stream.seek(0)
            # result = transform(stream.read())
            # response = make_response(result)
            # response.headers["Content-Disposition"] = "attachment; filename=filename"
            # response.headers["Access-Control-Allow-Origin"]=  '*'
            df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print(df.shape) 
            return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename, mimetype = 'text/csv')

            #print(result)    
            #return jsonify({'text' : 'file uploaded successfully'})
            # return result           


            # return redirect(url_for('uploaded_file',
            #                         filename=filename))
            # return jsonify({'text':'file uploaded successfully'})
            # return mongo.send_file(filename)
            # return jsonify({'text':'file uploaded successfully'})
            

if __name__ == '__main__':
	app.run(port = 5004, debug = True)