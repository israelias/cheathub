from flask_debugtoolbar import DebugToolbarExtension

toolbar = DebugToolbarExtension()


def initialize_debugtoolbar(app):
    toolbar.init_app(app)
    config = app.config
    panels = list(config['DEBUG_TB_PANELS'])
    panels.append('flask_mongoengine.panels.MongoDebugPanel')
    config['DEBUG_TB_PANELS'] = panels
