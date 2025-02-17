

// // interview.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Candidate } from './candidate.entity';
// import { Interviewer } from './interviewer.entity';

// @Entity('interviews')  // This is the table in the database
// export class Interview {
//   @PrimaryGeneratedColumn()  // This will be the unique ID for each interview
//   id: number;

//   @Column()  // Date of the interview
//   date: Date;

//   @Column()  // Status of the interview (e.g., Scheduled, Completed)
//   status: string;

//   @ManyToOne(() => Candidate, (candidate) => candidate.interviews)
//   @JoinColumn({ name: 'candidate_id' })
//   candidate: Candidate;

//   @ManyToOne(() => Interviewer, (interviewer) => interviewer.interviews)
//   @JoinColumn({ name: 'interviewer_id' })
//   interviewer: Interviewer;
// }


