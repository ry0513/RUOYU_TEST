import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";
import Account from "./Account";

@Table({
    tableName: "record",
})
export default class Record extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, comment: "记录ID" })
    recordId!: number;

    @ForeignKey(() => Account)
    @Column({ type: DataType.INTEGER, comment: "账号ID" })
    accountId!: number;

    @Column({ type: DataType.STRING, comment: "ip" })
    ip!: string;

    @Column({ type: DataType.STRING, comment: "地点" })
    place!: string;

    @Column({ type: DataType.TEXT, comment: "UA" })
    ua!: string;

    @Column({ type: DataType.STRING, comment: "浏览器" })
    browser!: string;

    @Column({ type: DataType.STRING, comment: "系统" })
    os!: string;

    @Column({ type: DataType.STRING, comment: "设备型号" })
    device!: string;

    @Column({ type: DataType.BOOLEAN, comment: "状态" })
    success!: boolean;
}
