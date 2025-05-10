export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "File Management System API",
    version: "1.0.0",
    description: "API documentation for the File Management System with full project integration",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string" },
          file : { type : "file"}
        }
      },
      File: {
        type: "object",
        properties: {
          id: { type: "string" },
          filename: { type: "string" },
          path: { type: "string" },
          size: { type: "integer" },
          uploadedAt: { type: "string", format: "date-time" }
        }
      }
    }
  },

  paths: {
    "/api/v1/auth/register": {
      post: {
        summary: "Register a new user",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          400: {
            description: "Validation error or email already exists",
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        summary: "Login a user",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    user: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            },
          },
          401: {
            description: "Invalid credentials",
          },
        },
      },
    },
    "/api/v1/file/upload": {
      post: {
        summary: "Upload a new file",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "File uploaded successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/File"
                }
              }
            }
          },
          401: {
            description: "Unauthorized",
          },
          413: {
            description: "File too large",
          }
        },
      },
    },
    "/api/v1/file": {
      get: {
        summary: "List all user files",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of files",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/File" }
                }
              }
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/api/v1/file/{id}": {
      get: {
        summary: "Get file details",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "File details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/File" }
              }
            }
          },
          401: { description: "Unauthorized" },
          404: { description: "File not found" }
        }
      },
      delete: {
        summary: "Delete a file",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: { description: "File deleted successfully" },
          401: { description: "Unauthorized" },
          404: { description: "File not found" }
        }
      }
    }
  },
};
