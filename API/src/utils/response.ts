export const sendResponse = (res: any, statusCode: number, data: any) => {
    res.status(statusCode).json(data);
};
