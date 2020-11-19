from flask import Flask
from flask_restful import Api,Resource,reqparse,abort

app=Flask(__name__)
api=Api(app)


video_put_args=reqparse.RequestParser()
video_put_args.add_argument("url",type=str,help="something went wrong")#help is an error msg


class  Model(Resource):
    def post(self):
        args=video_put_args.parse_args()
        return args,201
    def get(self):
        args=video_put_args.parse_args()
        return args,201


api.add_resource(Model,"/api")

# @app.route('/api',methods=['GET','POST'])
# def hello_world():
#     return {
#         'name':'Hello World'
#     }

if __name__ == '__main__':
    app.run(debug=True)