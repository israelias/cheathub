from flask_debugtoolbar import DebugToolbarExtension

toolbar = DebugToolbarExtension()


def initialize_toolbar(app):
    app.config["DEBUG_TB_PANELS"] = (
        "flask_debugtoolbar.panels.versions.VersionDebugPanel",
        "flask_debugtoolbar.panels.timer.TimerDebugPanel",
        "flask_debugtoolbar.panels.headers.HeaderDebugPanel",
        "flask_debugtoolbar.panels.request_vars.RequestVarsDebugPanel",
        "flask_debugtoolbar.panels.config_vars.ConfigVarsDebugPanel",
        "flask_debugtoolbar.panels.template.TemplateDebugPanel",
        "flask_debugtoolbar.panels.logger.LoggingPanel",
        "flask_debugtoolbar.panels.route_list.RouteListDebugPanel",
        "flask_debugtoolbar.panels.profiler.ProfilerDebugPanel",
        "flask_debugtoolbar.panels.g.GDebugPanel",
        "flask_mongoengine.panels.MongoDebugPanel",
    )
    app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
    toolbar.init_app(app)
