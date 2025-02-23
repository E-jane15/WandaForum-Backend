import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('interviewers')
export class Interviewer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
    interviews: any;

  // Add more columns as needed
}
