from flask import Flask,request
import numpy as np
import urllib.request
import cv2
import tensorflow as tf

app=Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)