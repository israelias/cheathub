from flask_restful import Resource


# ===========================================================================
# *                Status  RESTful Resource
# ?  Indicator that backend is running.
#
# Useful for deployment
# ===========================================================================
class Status(Resource):
    """Home endpoint to loosely convey the backend is running `/`"""

    def get(self):
        """
        The get function returns a string that says &quot;Api running&quot;

        Args:
            self: Access variables that belongs to the class

        Returns:
            A dictionary with a key of data and value of &quot;api running&quot;
        """
        try:
            return {"data": "Api running"}
        except:
            return {"data": "An Error Occurred during fetching Api"}
