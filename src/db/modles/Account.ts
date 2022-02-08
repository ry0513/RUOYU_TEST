import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    AutoIncrement,
    HasMany,
    Default,
} from "sequelize-typescript";
import RUOYU from "../../core/ruoyu";
import Record from "./Record";
@Table({
    tableName: "account",
    paranoid: true,
})
export default class Account extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, comment: "id" })
    accountId!: number;

    @Column({ type: DataType.STRING, comment: "昵称" })
    nickName!: string;

    @Column({ type: DataType.STRING, comment: "密码" })
    set password(val: string) {
        this.setDataValue("password", RUOYU.md5Pass(val));
    }

    @Column({ type: DataType.STRING, comment: "邮箱" })
    email!: string;

    @Column({ type: DataType.INTEGER, comment: "手机号" })
    phone!: number;

    @Column({ type: DataType.STRING, comment: "头像" })
    avatar!: string;

    @Default(20)
    @Column({ type: DataType.INTEGER, comment: "状态" })
    status!: number;

    @Column({ type: DataType.STRING, comment: "注册ip" })
    registerIp!: string;

    @Column({ type: DataType.STRING, comment: "注册地点" })
    registerPlace!: string;

    @HasMany(() => Record)
    records!: Record[];
}
