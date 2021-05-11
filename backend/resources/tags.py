from flask import jsonify
from flask_restful import Resource

from database.constants import (
    all_tags,
)


class TagsApi(Resource):
    """Prepares all selectable tags: api/tags."""

    def get(self):
        """Retrieve a all current tags."""

        all_tags_arr = all_tags()
        return jsonify([{"label": tag, "value": tag} for tag in all_tags_arr])
