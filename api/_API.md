# Baby PHR API Documentation

Base URL: `/api`

---

## Babies

### List all babies

**GET** `/api/babies`

- **Response:**  
  `200 OK`
  ```json
  {
    "status": "ok",
    "data": [
      { "id": 1, "name": "Emma", "birthdate": "2024-01-15", "gender": "F" },
      { "id": 2, "name": "Liam", "birthdate": "2023-06-22", "gender": "M" }
    ]
  }
  ```

---

### Get a baby by ID

**GET** `/api/babies/:id`

- **Response:**  
  `200 OK`
  ```json
  {
    "status": "ok",
    "data": { "id": 1, "name": "Emma", "birthdate": "2024-01-15", "gender": "F" }
  }
  ```
- **Errors:**  
  `404 Not Found`
  ```json
  { "status": "error", "message": "Baby not found" }
  ```

---

### Create a new baby

**POST** `/api/babies`

- **Request Body:**
  ```json
  {
    "name": "Sophia",
    "birthdate": "2024-03-10",
    "gender": "F"
  }
  ```
- **Response:**  
  `201 Created`
  ```json
  {
    "status": "ok",
    "data": { "id": 3, "name": "Sophia", "birthdate": "2024-03-10", "gender": "F" }
  }
  ```
- **Errors:**  
  `400 Bad Request`
  ```json
  { "status": "error", "message": "Missing required fields" }
  ```

---

### Update a baby

**PUT** `/api/babies/:id`

- **Request Body:**
  ```json
  {
    "name": "Emma Updated",
    "birthdate": "2024-01-20",
    "gender": "F"
  }
  ```
- **Response:**  
  `200 OK`
  ```json
  {
    "status": "ok",
    "data": { "id": 1, "name": "Emma Updated", "birthdate": "2024-01-20", "gender": "F" }
  }
  ```
- **Errors:**  
  `400 Bad Request` or `404 Not Found`

---

### Delete a baby

**DELETE** `/api/babies/:id`

- **Response:**  
  `204 No Content`
- **Errors:**  
  `404 Not Found`
  ```json
  { "status": "error", "message": "Baby not found" }
  ```

---

## Error Format

All errors return:
```json
{ "status": "error", "message": "..." }
```

---

## Good Practices

- All endpoints use RESTful conventions.
- All responses are JSON.
- Use appropriate HTTP status codes.
- Validate input and return clear error messages.
- Document required and optional fields.
- Keep documentation up to date with code changes.

---
