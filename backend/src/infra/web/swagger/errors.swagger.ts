/**
* @swagger
*
* definitions:
*   BadRequestError:
*     type: object
*     properties:
*       error:
*         type: string
*         example: ValidationError
*       message:
*         type: string
*         example: Some message of Validation Error
*       details:
*         oneOf:
*           - type: array
*             items:
*               type: object
*           - type: object
*       stack:
*         type: string
*         example: Stack trace details
*
*   UnprocessableEntityError:
*     type: object
*     properties:
*       error:
*         type: string
*         example: UnprocessableEntityError
*       message:
*         type: string
*         example: Some message of Unprocessable Entity Error
*       stack:
*         type: string
*         example: Stack trace details
*
*   StudentNotFoundError:
*     type: object
*     required:
*       - error
*       - message
*     properties:
*       error:
*         type: string
*         example: StudentNotFoundError
*       message:
*         type: string
*         example: Student not found
*       stack:
*         type: string
*         example: Stack trace details
*
*   RAAlreadyExistsError:
*     type: object
*     required:
*       - error
*       - message
*     properties:
*       error:
*         type: string
*         example: RAAlreadyExistsError
*       message:
*         type: string
*         example: Academic record 'ABC123' already registered for another student
*       stack:
*         type: string
*         example: Stack trace details
*/
