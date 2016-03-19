#http://api.hotwire.com/v1/search/car?apikey=zrsjs9d7ac66q7ghy7vh8wy7&dest=LAX&startdate=03/20/2016&enddate=03/23/2016&pickuptime=10:00&dropofftime=13:30&format=json
import requests
import datetime
import traceback
import json
from flask import Flask,request, send_from_directory
app = Flask(__name__,static_url_path='')

@app.route("/")
def home():
    return app.send_static_file('index.html')


@app.route("/requests")
def getAndSendData():
    location= request.args.get('location')
    startdate=datetime.datetime.strptime(request.args.get('startdate')+"" ,'%Y-%m-%d').strftime('%m/%d/%Y')
    enddate=datetime.datetime.strptime(request.args.get('enddate') +"", '%Y-%m-%d').strftime('%m/%d/%Y')
    try:
        data=requests.get("http://api.hotwire.com/v1/search/car?apikey=zrsjs9d7ac66q7ghy7vh8wy7&dest="+location+"&startdate="+startdate+"&enddate="+enddate+"&pickuptime="+request.args.get('pickup')+"&dropofftime="+request.args.get('dropoff')+"&format=json")
    except:
        traceback.format_exc()
    return str(data.text)

if __name__ == "__main__":
    app.run("0.0.0.0")