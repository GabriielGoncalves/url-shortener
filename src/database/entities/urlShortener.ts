import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity("Urls_Shorteners")
export class UrlShortener {
  @PrimaryColumn({ type: "text", nullable: false })
  id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column({ type: "boolean", nullable: true })
  is_active?: boolean;

  @Column({ type: "text" })
  originalUrl: string;

  @Column({ type: "int", default: 0 })
  clicks_number: number;

  @ManyToOne(() => User, (user) => user.url_shortener, {
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
