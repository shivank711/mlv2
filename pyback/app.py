from flask import Flask, redirect, url_for, request, render_template, json, Response
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
from sklearn.preprocessing import Imputer
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
from scipy import stats
import numpy as np
from urllib import unquote
import urllib 

UPLOAD_FOLDER = '/home/das/Documents/mlv1/pyback/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv', 'xlsx'])

df = pd.DataFrame()


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MONGO_URI'] = "mongodb://localhost:27017/myDatabase"

mongo = PyMongo(app)
CORS(app)

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
            
            df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename)) 
            return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename, mimetype = 'text/csv')

#find missing values in the uploaded data and descriptive analytics
#give file name in the request url, will return describe of all the neumeric columns
@app.route('/descriptive/<filename>', methods = ['GET'])
def descriptive(filename):
    if request.method =="GET":
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        description = df.describe()
        data = description.to_json()        
        return data

#find missing values in the filename 
@app.route('/missing/<filename>', methods = ['GET'])
def missing(filename):
    if request.method =="GET":
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        missing = {}
        for _ in df.columns:
            #missing.append("{} : {}".format(_, df[_].isnull().sum()))
            missing[_] = df[_].isnull().sum()
        return jsonify(missing)
#find data type of the columns in the dataframe

@app.route('/dtype/<filename>', methods = ['GET'])
def dtype(filename):
    if request.method == 'GET':
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        dff = df.dtypes
        arr = dff.to_json()
        return arr  

#find correlation 
@app.route('/corr/<filename>', methods =['GET'])
def correlation(filename):
    if request.method == 'GET':
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        corr = df.corr()
        corr = corr.to_json()        
    return corr

#missing value imputation takes filename col name and method in the url

@app.route('/imputemiss/<filename>/<col>/<method>', methods = ['GET'])
def imputemissing(filename,col,method):
    if request.method == 'GET':
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        if method == 'mean':
            mean_value = df[col].mean()
            df[col] = df[col].fillna(mean_value)
            return df[col].to_json()
        if method == 'median':
            median_value = df[col].median()
            df[col] = df[col].fillna(median_value)
            return df[col].to_json()    
        if method == 'rm':
            df = df.dropna(axis=0, how = 'any', thresh=None, subset=None, inplace=False)
            return df.to_json()


#normalize columns using min max (0,1)        

@app.route('/normalize/<filename>/<col>', methods = ['GET'])
def normalize(filename, col):
    if request.method == 'GET':
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        min_max_scaler = preprocessing.MinMaxScaler()
        x = df[[col]].values.astype(float)
        x_scaled = min_max_scaler.fit_transform(x)
        df[col] = pd.DataFrame(x_scaled)    
        return df[col].to_json()

##remove outlier in numeric data

@app.route('/outlier/<filename>/<col>', methods = ['GET'])
def outlier(filename, col):
    if request.method == 'GET':
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # q = df[col].quantile(0.99)
        # df = df[df[col]<q]
        df = df[(np.abs(stats.zscore(df[col])) < 3)]
        return df.to_json()

#variable selection
@app.route('/variableselection/<variables>', methods = ['GET'])
def getvars(variables):
    if request.method == 'GET':
        string = urllib.unquote(variables)



#ml algorithms








if __name__ == '__main__':
	app.run(port = 5004, debug = True)