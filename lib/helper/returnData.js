"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//def == default data
const data = (params) => {
    let { description, data, isError } = params;
    let defDesc = 'success';
    let defIsError = false;
    let defData = {};
    return {
        data: data ? data : defData,
        description: description ? description : defDesc,
        isError: isError ? isError : defIsError
    };
};
exports.default = data;
//# sourceMappingURL=returnData.js.map