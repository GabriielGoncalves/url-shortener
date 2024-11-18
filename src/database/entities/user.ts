import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from ".";
import { UrlShortener } from "./urlShortener";

@Entity("Users")
export class User extends BaseEntity {
  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @OneToMany(() => UrlShortener, (url) => url.user)
  url_shortener: UrlShortener;
}
