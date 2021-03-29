export const formatJSONResponse = (response, code = 200) => {
    return {
        statusCode: code,
        body: JSON.stringify(response)
    };
};
//# sourceMappingURL=apiGateway.js.map