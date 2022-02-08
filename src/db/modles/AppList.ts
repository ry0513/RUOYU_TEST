import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";
import RUOYU from "../../core/ruoyu";
import Account from "./Account";

@Table({
    tableName: "AppList",
    paranoid: true,
})
export default class AppList extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, comment: "APPID" })
    appId!: number;

    @Column({ type: DataType.STRING, comment: "名称" })
    appName!: string;

    @Column({ type: DataType.STRING, comment: "Key值(md5)" })
    set appKey(val: string) {
        this.setDataValue("appKey", RUOYU.md5(val + this.getDataValue("appId")));
    }

    @ForeignKey(() => Account)
    @Column({ type: DataType.INTEGER, comment: "创建者" })
    accountId!: number;

    @Column({ type: DataType.BOOLEAN, comment: "内部" })
    inside!: boolean;
}
