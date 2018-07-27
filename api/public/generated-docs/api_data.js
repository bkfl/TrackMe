define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "D__Users_Brenton_OneDrive___Deakin_University_2018_T2_SIT209___Software_Engineering_2_Developing_Internet_of_things_Applications_code_TrackMe_api_public_generated_docs_main_js",
    "groupTitle": "D__Users_Brenton_OneDrive___Deakin_University_2018_T2_SIT209___Software_Engineering_2_Developing_Internet_of_things_Applications_code_TrackMe_api_public_generated_docs_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/devices",
    "title": "Request array of all devices",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        \"_id\": \"dsohsdohsdofhsofhosfhsofh\",\n        \"name\": \"Mary's iPhone\",\n        \"user\": \"mary\",\n        \"sensorData\": [\n            {\n                \"ts\": \"1529542230\",\n                \"temp\": 12,\n                \"loc\": {\n                    \"lat\": -37.84674,\n                    \"lon\": 145.115113\n                }\n            },\n            {\n                \"ts\": \"1529572230\",\n                \"temp\": 17,\n                \"loc\": {\n                    \"lat\": -37.850026,\n                    \"lon\": 145.117683\n                }\n            }\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>API error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiDevices"
  },
  {
    "type": "get",
    "url": "/api/devices/:deviceId/device-history",
    "title": "Request array of sensor data for single device",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": ":deviceId",
            "description": "<p>Device id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        \"ts\": \"1529542230\",\n        \"temp\": 12,\n        \"loc\": {\n          \"lat\": -37.84674,\n          \"lon\": 145.115113\n         }\n    },\n    {\n        \"ts\": \"1529572230\",\n        \"temp\": 17,\n        \"loc\": {\n            \"lat\": -37.850026,\n            \"lon\": 145.117683\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>API error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiDevicesDeviceidDeviceHistory"
  },
  {
    "type": "get",
    "url": "/api/users/:user/devices",
    "title": "Request array of devices for single user",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":user",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        \"_id\": \"dsohsdohsdofhsofhosfhsofh\",\n        \"name\": \"Mary's iPhone\",\n        \"user\": \"mary\",\n        \"sensorData\": [\n            {\n                \"ts\": \"1529542230\",\n                \"temp\": 12,\n                \"loc\": {\n                    \"lat\": -37.84674,\n                    \"lon\": 145.115113\n                }\n            },\n            {\n                \"ts\": \"1529572230\",\n                \"temp\": 17,\n                \"loc\": {\n                    \"lat\": -37.850026,\n                    \"lon\": 145.117683\n                }\n            }\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>API error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiUsersUserDevices"
  },
  {
    "type": "post",
    "url": "/api/devices",
    "title": "Add a new device",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Device name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Device owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "sensorData",
            "description": "<p>Array of device sensor data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"Successfully added device and data\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>API error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "PostApiDevices"
  },
  {
    "type": "post",
    "url": "/api/authenticate",
    "title": "Authenticate user credentials",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's name / login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: 'Authenticated successfully',\n    isAdmin: (true | false)\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success: false,\n    message: 'Incorrect username or password',\n    isAdmin: false\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>API error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "User",
    "name": "PostApiAuthenticate"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Create new user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's name / login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Is the user an administrator?</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: 'Created new user'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    success: false,\n    message: 'User already exists'\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>API error message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "User",
    "name": "PostApiRegister"
  }
] });
