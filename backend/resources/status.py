from flask_restful import Resource

class Status(Resource):    
     def get(self):
         try:
            return {'data': 'Api running'}
         except: 
            return {'data': 'An Error Occurred during fetching Api'}