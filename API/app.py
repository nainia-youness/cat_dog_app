from flask import Flask,request
#from flask_restful import Api,Resource,reqparse,abort
import numpy as np
import urllib.request
import cv2
import tensorflow as tf

app=Flask(__name__)
# api=Api(app)


# video_put_args=reqparse.RequestParser()
# video_put_args.add_argument("url",type=str,help="something went wrong")#help is an error msg

def url_to_image(url):
         # download the image, convert it to a NumPy array, and then read
         # it into OpenCV format
         resp = urllib.request.urlopen(url)
         image = np.asarray(bytearray(resp.read()), dtype="uint8")
         image = cv2.imdecode(image, cv2.IMREAD_COLOR)
         # return the image
         return image

def model_load():
         loaded_model = tf.keras.models.load_model('../model/my_model.h5')
         return loaded_model


def preprocess_img(img):
         img=img/255.0
         img=cv2.resize(img, (32, 32))
         imgs=np.expand_dims(img, axis=0)
         return imgs

def predict(imgs,model):
          class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',
                 'dog', 'frog', 'horse', 'ship', 'truck']
          predict=model.predict(imgs)
          return class_names[np.argmax(predict[0])]

is_first_time=False
model=tf.keras.Model()

@app.route("/api",methods=["POST","GET"])
def login():
    global is_first_time
    global model
    url=request.get_json()["url"]
    img=url_to_image(url)
    if(is_first_time==False):
        is_first_time=True
        model=model_load()
    imgs=preprocess_img(img)    
    print(imgs.shape)
    prediction=predict(imgs,model)
    print(prediction)
    return prediction


# class  Model(Resource):
#     _counter = 0
#     _m=tf.keras.Model()
#     def __init__(self):
#         Model._counter += 1
#         self.id = Model._counter
#         self.model=Model._m



#     def post(self):
#         args=video_put_args.parse_args()
#         img=self.url_to_image(args.url)
#         if(self.id==1):
#             Model._m=self.model_load()
#         imgs=self.preprocess_img(img)
#         #prediction=imgs
#         prediction=self.predict(imgs)
#         print(prediction)
#         return prediction,201



#api.add_resource(Model,"/api")

if __name__ == '__main__':
    app.run(debug=True)