import { Request, Response } from "express";
export const needLogin = (
    minStatus: number,
    req: Request,
    res: Response,
    trueCallBack?: () => void,
    falseCallBack?: () => void
): boolean => {
    if (req.session.account) {
        if (req.session.account.status >= minStatus) {
            trueCallBack && trueCallBack();
            return true;
        }
        res.locals = {
            minStatus,
            status: req.session.account.status,
        };
        res.render("error/403");
        return false;
    } else {
        falseCallBack ? falseCallBack() : res.redirect(`/login?path=${req.originalUrl}`);
        return false;
    }
};
