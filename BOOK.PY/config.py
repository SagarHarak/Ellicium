from azure.cosmos import CosmosClient
import os

endpoint = os.getenv("CosmosDbAccount")
key = os.getenv("CosmosDbKey")
database_name = os.getenv("CosmosDbDatabaseName")
container_name = os.getenv("CosmosDbContainerName")

client = CosmosClient(endpoint, key)
database = client.get_database_client(database_name)
container = database.get_container_client(container_name)


def execute_query(query):
    data = list(container.query_items(query, enable_cross_partition_query=True))
    return data
