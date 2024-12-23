import { 
    CreateDateColumn, 
    PrimaryGeneratedColumn,
    UpdateDateColumn 
} from "typeorm";

export default class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}