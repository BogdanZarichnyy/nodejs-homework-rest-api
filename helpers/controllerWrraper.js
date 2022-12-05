const controllerWrapper = (controller) => {
    const wrraper = async (req, res, next) => {
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    };

    return wrraper;
}

module.exports = controllerWrapper;