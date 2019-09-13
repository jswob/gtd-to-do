export default function() {
  this.urlPrefix = "http://localhost:8080";

  this.post("/users", (schema, request) => {
    const data = JSON.parse(request.requestBody);
    return schema.users.create(data);
  });
}
