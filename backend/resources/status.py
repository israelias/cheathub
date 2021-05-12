from flask_restful import Resource

#===========================================================================
# *                Status  RESTful Resource
# ?  Indicator that backend is running.
# 
# Useful for deployment
#===========================================================================
class Status(Resource):
    """Home endpoint to loosely convey the backend is running `/`"""

    def get(self):
        try:
            return {"data": "Api running"}
        except:
            return {"data": "An Error Occurred during fetching Api"}
