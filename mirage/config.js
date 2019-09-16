export default function() {
  this.urlPrefix = "http://localhost:8080";

  this.post("/users", (schema, request) => {
    const user = JSON.parse(request.requestBody).user;
    return {
      user: user
    };
  });

  this.post("/auth/login", () => {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lQHNvbWUuc29tZSIsIm5hbWUiOiJTb21lMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.C5n7FR6MbqsoVFQ90ScdcH0hNHjc0VjmuzGsPfx2_IY"
    };
  });
}
