import Account from "../modles/Account";
export const getUser = (
    where: { accountId?: number; email?: string },
    attributes: string[] = []
) => {
    return Account.findOne({
        attributes: ["accountId", "nickName", "email", "phone", "avatar", "status", ...attributes],
        where,
    });
};
