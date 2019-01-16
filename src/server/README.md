<h1>Models</h1>
<p>Models describe how the API interfaces with the database; for each resource (users, lists, etc…) there exists a set of functions that can be use to query or mutate that data in the database.</p>
<br />
<h1>Queries</h1>
<p>Queries holds the resolver functions that describe how to fetch data, which items, fields, and how to paginate them.</p>
<br />
<h1>Mutations</h1>
<p>Mutations holds the resolver functions that describe how to create new data, delete, or update existing data.</p>
<br />
<h1>Types</h1>
<p>Types refer to GraphQL schema types, the fields you can query by and the relations between them. When the server is started, the schema is created by merging the types together.</p>
<br />
<h1>Routes</h1>
<p>Routes contains the route handlers and the middleware for the more conventional RESTful webhooks.</p>