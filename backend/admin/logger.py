import logging
from pymongo import monitoring


log = logging.getLogger()
log.setLevel(logging.DEBUG)
logging.basicConfig(level=logging.DEBUG)


class CommandLogger(monitoring.CommandListener):
    def started(self, event):
        logging.info(
            "Command {0.command_name} with request id "
            "{0.request_id} started on server "
            "{0.connection_id}".format(event)
        )

    def succeeded(self, event):
        logging.info(
            "Command {0.command_name} with request id "
            "{0.request_id} on server {0.connection_id} "
            "succeeded in {0.duration_micros} "
            "microseconds".format(event)
        )

    def failed(self, event):
        logging.info(
            "Command {0.command_name} with request id "
            "{0.request_id} on server {0.connection_id} "
            "failed in {0.duration_micros} "
            "microseconds".format(event)
        )


class ServerLogger(monitoring.ServerListener):
    def opened(self, event):
        logging.info(
            "Server {0.server_address} added to topology "
            "{0.topology_id}".format(event)
        )

    def description_changed(self, event):
        previous_server_type = event.previous_description.server_type
        new_server_type = event.new_description.server_type
        if new_server_type != previous_server_type:
            # server_type_name was added in PyMongo 3.4
            logging.info(
                "Server {0.server_address} changed type from "
                "{0.previous_description.server_type_name} to "
                "{0.new_description.server_type_name}".format(event)
            )

    def closed(self, event):
        logging.warning(
            "Server {0.server_address} removed from topology "
            "{0.topology_id}".format(event)
        )


class HeartbeatLogger(monitoring.ServerHeartbeatListener):
    def started(self, event):
        logging.info("Heartbeat sent to server " "{0.connection_id}".format(event))

    def succeeded(self, event):
        # The reply.document attribute was added in PyMongo 3.4.
        logging.info(
            "Heartbeat to server {0.connection_id} "
            "succeeded with reply "
            "{0.reply.document}".format(event)
        )

    def failed(self, event):
        logging.warning(
            "Heartbeat to server {0.connection_id} "
            "failed with error {0.reply}".format(event)
        )


class TopologyLogger(monitoring.TopologyListener):
    def opened(self, event):
        logging.info("Topology with id {0.topology_id} " "opened".format(event))

    def description_changed(self, event):
        logging.info(
            "Topology description updated for "
            "topology id {0.topology_id}".format(event)
        )
        previous_topology_type = event.previous_description.topology_type
        new_topology_type = event.new_description.topology_type
        if new_topology_type != previous_topology_type:
            # topology_type_name was added in PyMongo 3.4
            logging.info(
                "Topology {0.topology_id} changed type from "
                "{0.previous_description.topology_type_name} to "
                "{0.new_description.topology_type_name}".format(event)
            )
        # The has_writable_server and has_readable_server methods
        # were added in PyMongo 3.4.
        if not event.new_description.has_writable_server():
            logging.warning("No writable servers available.")
        if not event.new_description.has_readable_server():
            logging.warning("No readable servers available.")

    def closed(self, event):
        logging.info("Topology with id {0.topology_id} " "closed".format(event))


class ConnectionPoolLogger(monitoring.ConnectionPoolListener):
    def pool_created(self, event):
        logging.info("[pool {0.address}] pool created".format(event))

    def pool_cleared(self, event):
        logging.info("[pool {0.address}] pool cleared".format(event))

    def pool_closed(self, event):
        logging.info("[pool {0.address}] pool closed".format(event))

    def connection_created(self, event):
        logging.info(
            "[pool {0.address}][conn #{0.connection_id}] "
            "connection created".format(event)
        )

    def connection_ready(self, event):
        logging.info(
            "[pool {0.address}][conn #{0.connection_id}] "
            "connection setup succeeded".format(event)
        )

    def connection_closed(self, event):
        logging.info(
            "[pool {0.address}][conn #{0.connection_id}] "
            "connection closed, reason: "
            "{0.reason}".format(event)
        )

    def connection_check_out_started(self, event):
        logging.info("[pool {0.address}] connection check out " "started".format(event))

    def connection_check_out_failed(self, event):
        logging.info(
            "[pool {0.address}] connection check out "
            "failed, reason: {0.reason}".format(event)
        )

    def connection_checked_out(self, event):
        logging.info(
            "[pool {0.address}][conn #{0.connection_id}] "
            "connection checked out of pool".format(event)
        )

    def connection_checked_in(self, event):
        logging.info(
            "[pool {0.address}][conn #{0.connection_id}] "
            "connection checked into pool".format(event)
        )


def initialize_logger():
    monitoring.register(CommandLogger())
    monitoring.register(ServerLogger())
    monitoring.register(HeartbeatLogger())
    monitoring.register(TopologyLogger())
    monitoring.register(ConnectionPoolLogger())
