from flask import jsonify
from flask_restful import Resource

from database.constants import (
    all_tags,
)

#===========================================================================
# *                TAGS  RESTful Resource
# ?  Locally computes the `tags` nested list-field of the Snippet model 
# 
# Responsible for presenting frontend with all currently searchable tags
#===========================================================================

class TagsApi(Resource):
    """Prepares all selectable tags: api/tags."""

    def get(self):
        """Retrieve a all current tags."""

        all_tags_arr = all_tags()
        return jsonify([{"label": tag, "value": tag} for tag in all_tags_arr])
